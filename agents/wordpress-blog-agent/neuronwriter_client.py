"""NeuronWriter API client — extracts SEO-optimized content from queries/documents."""

import requests
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class NeuronContent:
    title: str
    meta_description: str
    focus_keyword: str
    slug: str
    html_content: str
    excerpt: str
    tags: list[str] = field(default_factory=list)
    neuronwriter_query_id: str = ""
    score: int = 0


class NeuronWriterClient:
    """
    NeuronWriter REST API client.

    Docs: https://app.neuronwriter.com/api-documentation

    Required env var: NEURONWRITER_API_KEY

    Flow:
      1. list_queries()          → lista de queries disponibles
      2. get_query(query_id)     → detalles de una query (keyword, content, score)
      3. get_content(query_id)   → extrae el HTML ya redactado en NeuronWriter
    """

    BASE_URL = "https://app.neuronwriter.com/uapi/0.1"

    def __init__(self, api_key: str, project_id: str = "64c70e6d66b9ed1b"):
        if not api_key:
            raise ValueError(
                "NEURONWRITER_API_KEY no configurada. "
                "Añádela al archivo .env y vuelve a ejecutar el agente."
            )
        self.project_id = project_id
        self.session = requests.Session()
        self.session.headers.update(
            {"X-API-KEY": api_key, "Content-Type": "application/json"}
        )

    def _get(self, path: str, params: dict | None = None) -> dict:
        resp = self.session.get(f"{self.BASE_URL}/{path}", params=params, timeout=30)
        resp.raise_for_status()
        return resp.json()

    def _post(self, path: str, json: dict | None = None) -> dict:
        resp = self.session.post(f"{self.BASE_URL}/{path}", json=json or {}, timeout=30)
        resp.raise_for_status()
        return resp.json()

    def list_queries(self, project_id: str | None = None) -> list[dict]:
        """Devuelve todas las queries del proyecto (por defecto usa self.project_id)."""
        pid = project_id or self.project_id
        data = self._post("query/list", json={"project": pid})
        return data.get("queries", [])

    def get_query(self, query_id: str) -> dict:
        """Detalles de una query: keyword, idioma, score, contenido."""
        return self._post("query/get", json={"query": query_id})

    def get_content_html(self, query_id: str) -> str:
        """Extrae el HTML del editor de NeuronWriter para la query indicada."""
        data = self._post("query/get", json={"query": query_id})
        # El campo 'content' contiene el HTML guardado en el editor
        return data.get("content", "")

    def build_neuron_content(self, query_id: str) -> NeuronContent:
        """Construye un objeto NeuronContent listo para publicar en WordPress."""
        query = self.get_query(query_id)

        keyword = query.get("keyword", "")
        title = query.get("title") or keyword.title()
        meta = query.get("meta_description") or f"Descubre todo sobre {keyword} en el blog de Founderz."
        slug = keyword.lower().replace(" ", "-").replace(",", "")
        html = query.get("content", "")
        score = query.get("content_score", 0)

        # Párrafo inicial como excerpt
        excerpt = _extract_excerpt(html)

        return NeuronContent(
            title=title,
            meta_description=meta[:160],
            focus_keyword=keyword,
            slug=slug,
            html_content=html,
            excerpt=excerpt,
            tags=[keyword],
            neuronwriter_query_id=query_id,
            score=score,
        )


def _extract_excerpt(html: str, max_chars: int = 200) -> str:
    """Extrae texto plano del primer párrafo del HTML."""
    import re
    text = re.sub(r"<[^>]+>", "", html)
    text = " ".join(text.split())
    return text[:max_chars].rstrip() + ("…" if len(text) > max_chars else "")
