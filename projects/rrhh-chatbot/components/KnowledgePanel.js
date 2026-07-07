"use client";

import { useEffect, useState } from "react";

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export default function KnowledgePanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("text");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState(null);

  async function loadItems() {
    try {
      const res = await fetch("/api/knowledge");
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      setStatus({ type: "error", message: "No se ha podido cargar la base de conocimiento." });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch on mount, setState happens after the await
    loadItems();
  }, []);

  async function handleAddText(e) {
    e.preventDefault();
    setIsSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/knowledge", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al guardar.");
      setTitle("");
      setContent("");
      setStatus({ type: "success", message: "Documento añadido a la base de conocimiento." });
      await loadItems();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleAddFile(e) {
    e.preventDefault();
    if (!file) return;
    setIsSaving(true);
    setStatus(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (title.trim()) formData.append("title", title.trim());

      const res = await fetch("/api/knowledge", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al subir el archivo.");
      setTitle("");
      setFile(null);
      setStatus({ type: "success", message: `"${data.item.title}" añadido correctamente.` });
      await loadItems();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id) {
    const previous = items;
    setItems(items.filter((item) => item.id !== id));
    try {
      const res = await fetch(`/api/knowledge/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("No se ha podido borrar el documento.");
    } catch (error) {
      setItems(previous);
      setStatus({ type: "error", message: error.message });
    }
  }

  return (
    <aside className="knowledge-panel">
      <div>
        <h2>Base de conocimiento</h2>
        <p className="hint">
          Sube políticas, manuales o FAQs de RRHH. El asistente solo responde con esta información.
        </p>
      </div>

      <div className="tabs">
        <button
          type="button"
          className={`tab ${mode === "text" ? "active" : ""}`}
          onClick={() => setMode("text")}
        >
          Pegar texto
        </button>
        <button
          type="button"
          className={`tab ${mode === "file" ? "active" : ""}`}
          onClick={() => setMode("file")}
        >
          Subir archivo
        </button>
      </div>

      {mode === "text" ? (
        <form onSubmit={handleAddText} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div>
            <label className="field-label" htmlFor="title-text">Título</label>
            <input
              id="title-text"
              className="text-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Política de vacaciones 2026"
              required
            />
          </div>
          <div>
            <label className="field-label" htmlFor="content-text">Contenido</label>
            <textarea
              id="content-text"
              className="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Pega aquí el texto de la política o FAQ..."
              required
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={isSaving}>
            {isSaving ? "Guardando..." : "Añadir a la base de conocimiento"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleAddFile} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div>
            <label className="field-label" htmlFor="title-file">Título (opcional)</label>
            <input
              id="title-file"
              className="text-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Se usará el nombre del archivo si lo dejas vacío"
            />
          </div>
          <label className="file-drop">
            {file ? file.name : "Haz clic para elegir un archivo (.txt, .md, .pdf — máx. 5MB)"}
            <input
              type="file"
              accept=".txt,.md,.pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
          <button className="btn btn-primary" type="submit" disabled={isSaving || !file}>
            {isSaving ? "Subiendo..." : "Subir documento"}
          </button>
        </form>
      )}

      {status && <div className={`status-note ${status.type}`}>{status.message}</div>}

      <div>
        <label className="field-label">Documentos cargados ({items.length})</label>
        {loading ? (
          <p className="empty-note">Cargando...</p>
        ) : items.length === 0 ? (
          <p className="empty-note">Todavía no se ha subido ningún documento.</p>
        ) : (
          <div className="knowledge-list">
            {items.map((item) => (
              <div className="knowledge-item" key={item.id}>
                <div>
                  <div className="knowledge-item-title">{item.title}</div>
                  <div className="knowledge-item-meta">
                    {dateFormatter.format(new Date(item.createdAt))} · {item.chars.toLocaleString("es-ES")} caracteres
                  </div>
                  <div className="knowledge-item-preview">{item.preview}...</div>
                </div>
                <button className="icon-btn" onClick={() => handleDelete(item.id)} type="button">
                  Borrar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
