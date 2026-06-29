"""ClickUp integration — gestiona el estado del pipeline de blogs."""

import requests
from dataclasses import dataclass
from typing import Optional


@dataclass
class BlogTask:
    task_id: str
    title: str
    status: str
    neuronwriter_query_id: str   # almacenado en campo personalizado o descripción
    wp_post_id: Optional[int] = None
    wp_post_url: Optional[str] = None
    keyword: Optional[str] = None


FIELD_NW_QUERY = "neuronwriter_query_id"
FIELD_WP_URL = "wp_post_url"
FIELD_WP_ID = "wp_post_id"


class ClickUpManager:
    """
    Gestiona tareas en la lista TEST BLOG IA.

    Statuses esperados:
      - to do        → pendiente de generar
      - in progress  → en redacción / procesando
      - review       → listo, pendiente de revisión humana
      - complete     → publicado en WordPress
    """

    BASE = "https://api.clickup.com/api/v2"

    def __init__(self, api_token: str, list_id: str):
        self.list_id = list_id
        self.headers = {
            "Authorization": api_token,
            "Content-Type": "application/json",
        }

    def _get(self, path: str, params: dict | None = None) -> dict:
        r = requests.get(f"{self.BASE}/{path}", headers=self.headers, params=params, timeout=20)
        r.raise_for_status()
        return r.json()

    def _post(self, path: str, json: dict) -> dict:
        r = requests.post(f"{self.BASE}/{path}", headers=self.headers, json=json, timeout=20)
        r.raise_for_status()
        return r.json()

    def _put(self, path: str, json: dict) -> dict:
        r = requests.put(f"{self.BASE}/{path}", headers=self.headers, json=json, timeout=20)
        r.raise_for_status()
        return r.json()

    # ------------------------------------------------------------------ #
    # Lectura
    # ------------------------------------------------------------------ #

    def get_pending_tasks(self) -> list[BlogTask]:
        """Devuelve tareas en estado 'to do' listas para procesar."""
        data = self._get(f"list/{self.list_id}/task", params={"statuses[]": "to do"})
        return [self._parse_task(t) for t in data.get("tasks", [])]

    def get_all_tasks(self) -> list[BlogTask]:
        data = self._get(f"list/{self.list_id}/task", params={"include_closed": "true"})
        return [self._parse_task(t) for t in data.get("tasks", [])]

    def _parse_task(self, raw: dict) -> BlogTask:
        custom = {f["name"]: f.get("value") for f in raw.get("custom_fields", [])}
        desc = raw.get("description", "")
        # Si no hay campo custom, busca el query ID en la descripción (formato: nw:XXXX)
        nw_id = custom.get(FIELD_NW_QUERY) or _extract_nw_id(desc)
        return BlogTask(
            task_id=raw["id"],
            title=raw["name"],
            status=raw["status"]["status"],
            neuronwriter_query_id=nw_id or "",
            keyword=raw["name"],
        )

    # ------------------------------------------------------------------ #
    # Escritura
    # ------------------------------------------------------------------ #

    def create_blog_task(
        self,
        title: str,
        keyword: str,
        neuronwriter_query_id: str = "",
        due_date: str | None = None,
    ) -> str:
        """Crea una tarea de blog en la lista TEST BLOG IA. Devuelve el task_id."""
        desc_lines = [f"**Keyword objetivo:** {keyword}"]
        if neuronwriter_query_id:
            desc_lines.append(f"**NeuronWriter Query ID:** `{neuronwriter_query_id}`")
            desc_lines.append(f"nw:{neuronwriter_query_id}")

        payload: dict = {
            "name": title,
            "description": "\n".join(desc_lines),
            "status": "to do",
            "priority": 2,
        }
        if due_date:
            payload["due_date"] = due_date

        result = self._post(f"list/{self.list_id}/task", json=payload)
        return result["id"]

    def set_status(self, task_id: str, status: str) -> None:
        self._put(f"task/{task_id}", json={"status": status})

    def mark_published(self, task_id: str, wp_post_url: str, wp_post_id: int) -> None:
        """Actualiza status a 'complete' y añade la URL del post en la descripción."""
        # Actualizar status
        self._put(f"task/{task_id}", json={"status": "complete"})

        # Añadir comentario con link al post
        self._post(
            f"task/{task_id}/comment",
            json={
                "comment_text": (
                    f"✅ **Post publicado en WordPress**\n\n"
                    f"- **URL:** {wp_post_url}\n"
                    f"- **Post ID:** {wp_post_id}"
                ),
                "notify_all": False,
            },
        )

    def mark_failed(self, task_id: str, error: str) -> None:
        self._put(f"task/{task_id}", json={"status": "to do"})
        self._post(
            f"task/{task_id}/comment",
            json={"comment_text": f"❌ **Error al publicar:**\n\n```\n{error}\n```"},
        )


def _extract_nw_id(text: str) -> str | None:
    import re
    m = re.search(r"nw:([A-Za-z0-9_-]+)", text)
    return m.group(1) if m else None
