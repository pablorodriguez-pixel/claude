/**
 * WordPress REST API client with JWT authentication.
 * Base URL: https://founderz.com/es
 */

import fetch from "node-fetch";

export class WPClient {
  constructor(baseUrl, jwtToken) {
    this.apiUrl = `${baseUrl.replace(/\/$/, "")}/wp-json/wp/v2`;
    this.headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    };
  }

  async request(method, endpoint, body) {
    const url = `${this.apiUrl}/${endpoint.replace(/^\//, "")}`;
    const opts = { method, headers: this.headers };
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(url, opts);
    const text = await res.text();

    if (!res.ok) {
      let msg = text;
      try { msg = JSON.parse(text)?.message || text; } catch {}
      throw new Error(`WP API ${res.status}: ${msg}`);
    }
    return text ? JSON.parse(text) : {};
  }

  // ── Posts ──────────────────────────────────────────
  async getPosts({ status = "publish", per_page = 10, search = "" } = {}) {
    const params = new URLSearchParams({ status, per_page, search });
    return this.request("GET", `posts?${params}`);
  }

  async getPost(id) {
    return this.request("GET", `posts/${id}`);
  }

  async createPost(data) {
    return this.request("POST", "posts", data);
  }

  async updatePost(id, data) {
    return this.request("POST", `posts/${id}`, data);
  }

  async deletePost(id, force = false) {
    return this.request("DELETE", `posts/${id}?force=${force}`);
  }

  // ── Categorías ─────────────────────────────────────
  async getCategories({ per_page = 50 } = {}) {
    return this.request("GET", `categories?per_page=${per_page}`);
  }

  async getOrCreateCategory(name) {
    const cats = await this.request("GET", `categories?search=${encodeURIComponent(name)}&per_page=5`);
    const match = cats.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (match) return match.id;
    const created = await this.request("POST", "categories", { name });
    return created.id;
  }

  // ── Tags ───────────────────────────────────────────
  async getTags({ per_page = 50 } = {}) {
    return this.request("GET", `tags?per_page=${per_page}`);
  }

  async getOrCreateTag(name) {
    const tags = await this.request("GET", `tags?search=${encodeURIComponent(name)}&per_page=5`);
    const match = tags.find(t => t.name.toLowerCase() === name.toLowerCase());
    if (match) return match.id;
    const created = await this.request("POST", "tags", { name });
    return created.id;
  }

  // ── Media ──────────────────────────────────────────
  async getMedia({ per_page = 10 } = {}) {
    return this.request("GET", `media?per_page=${per_page}`);
  }

  // ── Site info ──────────────────────────────────────
  async getSiteInfo() {
    const url = this.apiUrl.replace("/wp/v2", "");
    const res = await fetch(url, { headers: this.headers });
    return res.json();
  }
}
