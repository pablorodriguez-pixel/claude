"""
Formatea y enriquece el HTML de NeuronWriter con el estilo Founderz
antes de publicarlo en WordPress.
"""

import re


FOUNDERZ_STYLES = """
<style>
  .fz-blog-content { font-family: 'RundDisplay', 'Trebuchet MS', Helvetica, sans-serif; letter-spacing: 0.02em; color: #111115; }
  .fz-blog-content h2 { font-size: 2rem; font-weight: 600; line-height: 1.2; color: #111115; margin: 2.5rem 0 1rem; }
  .fz-blog-content h3 { font-size: 1.5rem; font-weight: 400; line-height: 1.2; color: #111115; margin: 2rem 0 0.75rem; }
  .fz-blog-content p  { font-size: 1rem; line-height: 1.6; margin: 0 0 1.25rem; }
  .fz-blog-content ul, .fz-blog-content ol { padding-left: 1.5rem; margin: 0 0 1.25rem; }
  .fz-blog-content li { margin-bottom: 0.5rem; line-height: 1.6; }
  .fz-blog-content strong { font-weight: 600; color: #5045c8; }
  .fz-blog-content a { color: #5045c8; text-decoration: underline; }
  .fz-blog-content blockquote { border-left: 4px solid #5045c8; margin: 1.5rem 0; padding: 1rem 1.5rem; background: #f5f4ff; border-radius: 0 0.75rem 0.75rem 0; }
  .fz-cta-block { background: #5045c8; color: #fff; border-radius: 1.875rem; padding: 2.5rem; text-align: center; margin: 3rem 0; }
  .fz-cta-block h3 { color: #fff; font-size: 1.5rem; font-weight: 600; margin: 0 0 1rem; }
  .fz-cta-block p  { color: rgba(255,255,255,0.85); margin: 0 0 1.5rem; }
  .fz-cta-block a  { display: inline-block; background: #fff; color: #5045c8; font-weight: 600; padding: 0.875rem 2rem; border-radius: 100rem; text-decoration: none; }
</style>
"""


def format_for_wordpress(
    html: str,
    title: str,
    focus_keyword: str,
    include_cta: bool = True,
) -> str:
    """
    Recibe el HTML crudo de NeuronWriter y devuelve HTML listo para WordPress:
    - Envuelve en clase Founderz
    - Añade estilos inline
    - Inyecta bloque CTA al final
    - Asegura alt text en imágenes
    """
    # Limpiar estilos inline que pueda traer NeuronWriter
    html = _strip_inline_styles(html)

    # Asegurar que los <img> tienen loading lazy y alt
    html = _fix_images(html, focus_keyword)

    # Envolver en contenedor Founderz
    wrapped = (
        f'{FOUNDERZ_STYLES}\n'
        f'<div class="fz-blog-content">\n'
        f'{html}\n'
    )

    if include_cta:
        wrapped += _build_cta_block()

    wrapped += "\n</div>"
    return wrapped


def _strip_inline_styles(html: str) -> str:
    return re.sub(r'\s*style="[^"]*"', "", html)


def _fix_images(html: str, keyword: str) -> str:
    def add_attrs(m: re.Match) -> str:
        tag = m.group(0)
        if 'loading=' not in tag:
            tag = tag.replace("<img ", '<img loading="lazy" ')
        if 'alt=' not in tag:
            tag = tag.replace("<img ", f'<img alt="{keyword}" ')
        return tag

    return re.sub(r"<img\b[^>]*>", add_attrs, html)


def _build_cta_block() -> str:
    return """
<div class="fz-cta-block">
  <h3>¿Listo para llevar tu carrera al siguiente nivel con la IA?</h3>
  <p>Únete a la comunidad de +40.000 profesionales que ya aprenden con Founderz.</p>
  <a href="https://founderz.com/es/programas/" rel="noopener">Ver programas →</a>
</div>
"""


def build_seo_slug(text: str) -> str:
    slug = text.lower()
    slug = re.sub(r"[áàä]", "a", slug)
    slug = re.sub(r"[éèë]", "e", slug)
    slug = re.sub(r"[íìï]", "i", slug)
    slug = re.sub(r"[óòö]", "o", slug)
    slug = re.sub(r"[úùü]", "u", slug)
    slug = re.sub(r"[ñ]", "n", slug)
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    slug = slug.strip("-")
    return slug[:70]
