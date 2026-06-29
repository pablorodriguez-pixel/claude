#!/usr/bin/env python3
"""
Founderz WordPress Blog Agent
──────────────────────────────
Flujo principal:
  1. Lee tareas en estado "to do" de ClickUp → lista TEST BLOG IA
  2. Para cada tarea, obtiene el contenido de NeuronWriter (query_id en la descripción)
  3. Formatea el HTML con el estilo Founderz
  4. Publica en WordPress (founderz.com) como borrador o publicado
  5. Actualiza la tarea en ClickUp a "complete" con la URL del post

Uso:
  python agent.py [--dry-run] [--task-id <clickup_task_id>] [--query-id <nw_query_id>]

Variables de entorno requeridas (.env):
  WP_JWT_TOKEN          – token JWT de WordPress (ya incluido en config.py)
  NEURONWRITER_API_KEY  – API key de NeuronWriter
  CLICKUP_API_TOKEN     – token personal de ClickUp
"""

import argparse
import logging
import sys
from pathlib import Path

# Permite ejecutar desde cualquier directorio
sys.path.insert(0, str(Path(__file__).parent))

from config import load_config
from wordpress_client import WordPressClient, WPPost
from neuronwriter_client import NeuronWriterClient
from clickup_manager import ClickUpManager, BlogTask
from content_formatter import format_for_wordpress, build_seo_slug

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger("blog-agent")


# ──────────────────────────────────────────── #
# Categoría por defecto en WordPress Founderz  #
# ──────────────────────────────────────────── #
WP_DEFAULT_CATEGORY = "IA para negocios"


def run(
    dry_run: bool = False,
    single_task_id: str | None = None,
    single_query_id: str | None = None,
) -> None:
    cfg = load_config()

    # ── Clientes ──────────────────────────────────────────
    wp = WordPressClient(cfg.wp_base_url, cfg.wp_jwt_token)
    nw = NeuronWriterClient(cfg.neuronwriter_api_key)
    cu = ClickUpManager(cfg.clickup_api_token, cfg.clickup_list_id)

    # ── Modo single: publicar una query concreta sin ClickUp ──
    if single_query_id and not single_task_id:
        log.info("Modo single-query: %s", single_query_id)
        _process_query(wp, nw, single_query_id, dry_run=dry_run)
        return

    # ── Obtener tareas pendientes de ClickUp ──────────────
    if single_task_id:
        raw = cu._get(f"task/{single_task_id}")
        tasks = [cu._parse_task(raw)]
    else:
        tasks = cu.get_pending_tasks()

    if not tasks:
        log.info("No hay tareas pendientes en TEST BLOG IA. ¡Todo al día!")
        return

    log.info("Tareas pendientes: %d", len(tasks))

    for task in tasks:
        log.info("── Procesando: %s (task %s)", task.title, task.task_id)

        if not task.neuronwriter_query_id:
            log.warning("  Sin NeuronWriter query ID — omitiendo. "
                        "Añade 'nw:<query_id>' en la descripción de la tarea.")
            continue

        # Marcar como en progreso
        if not dry_run:
            cu.set_status(task.task_id, cfg.status_writing)

        try:
            result = _process_query(
                wp, nw, task.neuronwriter_query_id,
                dry_run=dry_run,
                category_name=WP_DEFAULT_CATEGORY,
            )
            if result and not dry_run:
                cu.mark_published(task.task_id, result["url"], result["post_id"])
                log.info("  ✅ Publicado: %s", result["url"])
        except Exception as exc:  # noqa: BLE001
            log.error("  ❌ Error en task %s: %s", task.task_id, exc)
            if not dry_run:
                cu.mark_failed(task.task_id, str(exc))


def _process_query(
    wp: WordPressClient,
    nw: NeuronWriterClient,
    query_id: str,
    dry_run: bool = False,
    category_name: str = WP_DEFAULT_CATEGORY,
) -> dict | None:
    """Descarga de NeuronWriter, formatea y publica. Devuelve dict con url/post_id."""

    log.info("  Obteniendo contenido de NeuronWriter (query: %s)…", query_id)
    content = nw.build_neuron_content(query_id)

    log.info("  Keyword: '%s' | Score NW: %d | Título: %s",
             content.focus_keyword, content.score, content.title)

    if content.score < 30:
        log.warning("  ⚠️  Score bajo (%d/100). Considera mejorar el contenido antes de publicar.",
                    content.score)

    # Formatear HTML con estilo Founderz
    html = format_for_wordpress(
        html=content.html_content,
        title=content.title,
        focus_keyword=content.focus_keyword,
        include_cta=True,
    )

    slug = build_seo_slug(content.focus_keyword)

    # Categorías y tags en WordPress
    cat_id = wp.get_or_create_category(category_name)
    tag_ids = [wp.get_or_create_tag(t) for t in content.tags[:5]]

    post = WPPost(
        title=content.title,
        content=html,
        excerpt=content.excerpt,
        slug=slug,
        meta_description=content.meta_description,
        focus_keyword=content.focus_keyword,
        categories=[cat_id],
        tags=tag_ids,
        status="publish",
    )

    if dry_run:
        log.info("  [DRY-RUN] Se publicaría: '%s' → /%s", post.title, post.slug)
        log.info("  [DRY-RUN] HTML (%d chars), categoría '%s', tags: %s",
                 len(html), category_name, content.tags)
        return None

    log.info("  Publicando en WordPress…")
    result = wp.publish_post(post)
    log.info("  Post creado: ID=%d | %s", result.post_id, result.post_url)

    return {"post_id": result.post_id, "url": result.post_url}


# ──────────────────────────────────────────── #
# CLI                                          #
# ──────────────────────────────────────────── #

def main() -> None:
    parser = argparse.ArgumentParser(description="Founderz WordPress Blog Agent")
    parser.add_argument("--dry-run", action="store_true",
                        help="Simula el proceso sin publicar ni actualizar ClickUp")
    parser.add_argument("--task-id", metavar="ID",
                        help="Procesa solo esta tarea de ClickUp")
    parser.add_argument("--query-id", metavar="ID",
                        help="Publica directamente una query de NeuronWriter sin pasar por ClickUp")
    parser.add_argument("--list", action="store_true",
                        help="Lista todas las tareas en TEST BLOG IA y sale")
    args = parser.parse_args()

    cfg = load_config()

    if args.list:
        cu = ClickUpManager(cfg.clickup_api_token, cfg.clickup_list_id)
        tasks = cu.get_all_tasks()
        if not tasks:
            print("No hay tareas en la lista.")
            return
        print(f"\n{'TÍTULO':<45} {'STATUS':<15} {'NW QUERY'}")
        print("─" * 80)
        for t in tasks:
            print(f"{t.title[:44]:<45} {t.status:<15} {t.neuronwriter_query_id or '—'}")
        return

    run(
        dry_run=args.dry_run,
        single_task_id=args.task_id,
        single_query_id=args.query_id,
    )


if __name__ == "__main__":
    main()
