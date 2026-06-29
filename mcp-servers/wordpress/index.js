#!/usr/bin/env node
/**
 * MCP Server — WordPress Founderz
 * ─────────────────────────────────
 * Permite a Claude gestionar el blog de founderz.com directamente:
 * publicar, editar, listar posts, categorías y tags.
 *
 * Configuración en claude_desktop_config.json o .claude/settings.json:
 *   {
 *     "mcpServers": {
 *       "wordpress": {
 *         "command": "node",
 *         "args": ["/ruta/a/mcp-servers/wordpress/index.js"],
 *         "env": {
 *           "WP_BASE_URL": "https://founderz.com/es",
 *           "WP_JWT_TOKEN": "<token>"
 *         }
 *       }
 *     }
 *   }
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { WPClient } from "./wp-client.js";

// ── Config ─────────────────────────────────────────────
const WP_BASE_URL = process.env.WP_BASE_URL || "https://founderz.com/es";
const WP_JWT_TOKEN = process.env.WP_JWT_TOKEN || "";

if (!WP_JWT_TOKEN) {
  process.stderr.write("⚠️  WP_JWT_TOKEN no configurado. El servidor arrancará pero las llamadas fallarán.\n");
}

const wp = new WPClient(WP_BASE_URL, WP_JWT_TOKEN);

// ── MCP Server ────────────────────────────────────────
const server = new McpServer({
  name: "wordpress-founderz",
  version: "1.0.0",
});

// ──────────────────────────────────────────────────────
// TOOL: wp_list_posts
// ──────────────────────────────────────────────────────
server.tool(
  "wp_list_posts",
  "Lista posts del blog de Founderz. Filtra por estado (publish/draft/all) y búsqueda.",
  {
    status: z.enum(["publish", "draft", "pending", "any"]).default("publish").describe("Estado de los posts"),
    per_page: z.number().min(1).max(100).default(10).describe("Número de posts a devolver"),
    search: z.string().default("").describe("Texto de búsqueda"),
  },
  async ({ status, per_page, search }) => {
    const posts = await wp.getPosts({ status, per_page, search });
    if (!posts.length) return { content: [{ type: "text", text: "No se encontraron posts." }] };

    const lines = posts.map(p =>
      `• [${p.id}] ${p.title.rendered} — ${p.status} — ${p.link}`
    );
    return {
      content: [{
        type: "text",
        text: `**${posts.length} posts encontrados:**\n\n${lines.join("\n")}`,
      }],
    };
  }
);

// ──────────────────────────────────────────────────────
// TOOL: wp_get_post
// ──────────────────────────────────────────────────────
server.tool(
  "wp_get_post",
  "Obtiene los detalles completos de un post de WordPress por su ID.",
  { post_id: z.number().describe("ID del post en WordPress") },
  async ({ post_id }) => {
    const p = await wp.getPost(post_id);
    const text = [
      `**ID:** ${p.id}`,
      `**Título:** ${p.title.rendered}`,
      `**Estado:** ${p.status}`,
      `**URL:** ${p.link}`,
      `**Fecha:** ${p.date}`,
      `**Categorías:** ${p.categories?.join(", ") || "—"}`,
      `**Tags:** ${p.tags?.join(", ") || "—"}`,
      `**Excerpt:** ${p.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() || "—"}`,
    ].join("\n");
    return { content: [{ type: "text", text }] };
  }
);

// ──────────────────────────────────────────────────────
// TOOL: wp_publish_post
// ──────────────────────────────────────────────────────
server.tool(
  "wp_publish_post",
  "Publica un nuevo post en el blog de Founderz con estilo SEO optimizado. Crea categorías y tags automáticamente si no existen.",
  {
    title: z.string().describe("Título del post (H1)"),
    content: z.string().describe("Contenido HTML del post"),
    excerpt: z.string().default("").describe("Resumen corto del post (max 160 chars)"),
    slug: z.string().default("").describe("Slug URL (se genera del título si se omite)"),
    meta_description: z.string().default("").describe("Meta descripción para SEO (max 160 chars)"),
    focus_keyword: z.string().default("").describe("Keyword principal para Yoast SEO"),
    categories: z.array(z.string()).default(["IA para negocios"]).describe("Nombres de categorías"),
    tags: z.array(z.string()).default([]).describe("Nombres de tags"),
    status: z.enum(["publish", "draft"]).default("draft").describe("publish = publicar ahora, draft = borrador"),
    author_id: z.number().default(19).describe("ID del autor en WordPress"),
  },
  async ({ title, content, excerpt, slug, meta_description, focus_keyword, categories, tags, status, author_id }) => {
    // Resolver categorías y tags a IDs
    const catIds = await Promise.all(categories.map(c => wp.getOrCreateCategory(c)));
    const tagIds = await Promise.all(tags.map(t => wp.getOrCreateTag(t)));

    // Slug limpio si no se proporciona
    const finalSlug = slug || title
      .toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 70);

    const payload = {
      title,
      content,
      excerpt,
      slug: finalSlug,
      status,
      author: author_id,
      categories: catIds,
      tags: tagIds,
      meta: {
        _yoast_wpseo_metadesc: meta_description.slice(0, 160),
        _yoast_wpseo_focuskw: focus_keyword,
      },
    };

    const post = await wp.createPost(payload);

    return {
      content: [{
        type: "text",
        text: [
          `✅ **Post ${status === "publish" ? "publicado" : "guardado como borrador"}**`,
          ``,
          `**ID:** ${post.id}`,
          `**Título:** ${post.title.rendered}`,
          `**URL:** ${post.link}`,
          `**Editar:** ${WP_BASE_URL}/wp-admin/post.php?post=${post.id}&action=edit`,
          `**Slug:** /${post.slug}`,
          `**Categorías:** ${catIds.join(", ")}`,
        ].join("\n"),
      }],
    };
  }
);

// ──────────────────────────────────────────────────────
// TOOL: wp_update_post
// ──────────────────────────────────────────────────────
server.tool(
  "wp_update_post",
  "Actualiza un post existente en WordPress. Solo actualiza los campos que se pasen.",
  {
    post_id: z.number().describe("ID del post a actualizar"),
    title: z.string().optional().describe("Nuevo título"),
    content: z.string().optional().describe("Nuevo contenido HTML"),
    excerpt: z.string().optional().describe("Nuevo excerpt"),
    status: z.enum(["publish", "draft", "pending"]).optional().describe("Nuevo estado"),
    meta_description: z.string().optional().describe("Nueva meta descripción"),
    focus_keyword: z.string().optional().describe("Nuevo focus keyword"),
  },
  async ({ post_id, title, content, excerpt, status, meta_description, focus_keyword }) => {
    const payload = {};
    if (title)    payload.title = title;
    if (content)  payload.content = content;
    if (excerpt)  payload.excerpt = excerpt;
    if (status)   payload.status = status;
    if (meta_description || focus_keyword) {
      payload.meta = {};
      if (meta_description) payload.meta._yoast_wpseo_metadesc = meta_description;
      if (focus_keyword)    payload.meta._yoast_wpseo_focuskw = focus_keyword;
    }

    const post = await wp.updatePost(post_id, payload);
    return {
      content: [{
        type: "text",
        text: `✅ Post ${post.id} actualizado.\n**URL:** ${post.link}\n**Estado:** ${post.status}`,
      }],
    };
  }
);

// ──────────────────────────────────────────────────────
// TOOL: wp_list_categories
// ──────────────────────────────────────────────────────
server.tool(
  "wp_list_categories",
  "Lista todas las categorías del blog de Founderz.",
  {},
  async () => {
    const cats = await wp.getCategories({ per_page: 100 });
    const lines = cats.map(c => `• [${c.id}] ${c.name} (${c.count} posts)`);
    return {
      content: [{
        type: "text",
        text: `**Categorías (${cats.length}):**\n\n${lines.join("\n")}`,
      }],
    };
  }
);

// ──────────────────────────────────────────────────────
// TOOL: wp_list_tags
// ──────────────────────────────────────────────────────
server.tool(
  "wp_list_tags",
  "Lista todos los tags del blog de Founderz.",
  {},
  async () => {
    const tags = await wp.getTags({ per_page: 100 });
    const lines = tags.map(t => `• [${t.id}] ${t.name} (${t.count} posts)`);
    return {
      content: [{
        type: "text",
        text: `**Tags (${tags.length}):**\n\n${lines.join("\n")}`,
      }],
    };
  }
);

// ──────────────────────────────────────────────────────
// TOOL: wp_delete_post
// ──────────────────────────────────────────────────────
server.tool(
  "wp_delete_post",
  "Mueve un post a la papelera (o lo elimina definitivamente con force=true).",
  {
    post_id: z.number().describe("ID del post"),
    force: z.boolean().default(false).describe("true = eliminar definitivamente, false = mover a papelera"),
  },
  async ({ post_id, force }) => {
    await wp.deletePost(post_id, force);
    return {
      content: [{
        type: "text",
        text: force
          ? `🗑️ Post ${post_id} eliminado permanentemente.`
          : `🗑️ Post ${post_id} movido a la papelera.`,
      }],
    };
  }
);

// ── Arrancar servidor ─────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
process.stderr.write("✅ MCP WordPress Founderz arrancado\n");
