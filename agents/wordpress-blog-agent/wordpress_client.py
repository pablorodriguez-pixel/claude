"""WordPress REST API client with JWT authentication."""

import re
import requests
from dataclasses import dataclass
from typing import Optional


@dataclass
class WPPost:
    title: str
    content: str                  # HTML
    excerpt: str
    slug: str
    meta_description: str
    focus_keyword: str
    categories: list[int]
    tags: list[int]
    status: str = "publish"       # draft | publish
    featured_media: int = 0
    author: int = 19


@dataclass
class WPPostResult:
    post_id: int
    post_url: str
    edit_url: str
    status: str


class WordPressClient:
    def __init__(self, base_url: str, jwt_token: str):
        self.base_url = base_url.rstrip("/")
        self.api_url = f"{self.base_url}/wp-json/wp/v2"
        self.headers = {
            "Authorization": f"Bearer {jwt_token}",
            "Content-Type": "application/json",
        }

    def _request(self, method: str, endpoint: str, **kwargs) -> dict:
        url = f"{self.api_url}/{endpoint.lstrip('/')}"
        resp = requests.request(method, url, headers=self.headers, timeout=30, **kwargs)
        resp.raise_for_status()
        return resp.json()

    def get_or_create_category(self, name: str) -> int:
        cats = self._request("GET", "categories", params={"search": name, "per_page": 5})
        for c in cats:
            if c["name"].lower() == name.lower():
                return c["id"]
        created = self._request("POST", "categories", json={"name": name})
        return created["id"]

    def get_or_create_tag(self, name: str) -> int:
        tags = self._request("GET", "tags", params={"search": name, "per_page": 5})
        for t in tags:
            if t["name"].lower() == name.lower():
                return t["id"]
        created = self._request("POST", "tags", json={"name": name})
        return created["id"]

    def publish_post(self, post: WPPost) -> WPPostResult:
        payload = {
            "title": post.title,
            "content": post.content,
            "excerpt": post.excerpt,
            "slug": post.slug,
            "status": post.status,
            "author": post.author,
            "categories": post.categories,
            "tags": post.tags,
            "meta": {
                "_yoast_wpseo_metadesc": post.meta_description,
                "_yoast_wpseo_focuskw": post.focus_keyword,
            },
        }
        if post.featured_media:
            payload["featured_media"] = post.featured_media

        result = self._request("POST", "posts", json=payload)
        return WPPostResult(
            post_id=result["id"],
            post_url=result["link"],
            edit_url=f"{self.base_url}/wp-admin/post.php?post={result['id']}&action=edit",
            status=result["status"],
        )

    def update_post(self, post_id: int, **fields) -> dict:
        return self._request("POST", f"posts/{post_id}", json=fields)

    def upload_media_from_url(self, image_url: str, filename: str, alt_text: str = "") -> int:
        """Download image and upload to WP media library."""
        img_data = requests.get(image_url, timeout=20).content
        upload_headers = {
            "Authorization": self.headers["Authorization"],
            "Content-Disposition": f'attachment; filename="{filename}"',
            "Content-Type": "image/jpeg",
        }
        resp = requests.post(
            f"{self.api_url}/media",
            headers=upload_headers,
            data=img_data,
            timeout=30,
        )
        resp.raise_for_status()
        media = resp.json()
        if alt_text:
            self._request("POST", f"media/{media['id']}", json={"alt_text": alt_text})
        return media["id"]
