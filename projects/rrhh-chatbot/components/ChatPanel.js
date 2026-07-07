"use client";

import { useEffect, useRef, useState } from "react";

const SUGGESTIONS = [
  "¿Cuántos días de vacaciones tengo al año?",
  "¿Cómo pido una baja médica?",
  "¿Cuál es la política de teletrabajo?",
];

export default function ChatPanel() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const history = messages.map(({ role, content }) => ({ role, content }));
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error inesperado.");
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "error", content: error.message || "No se ha podido contactar con el asistente." },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="chat-panel">
      <div className="chat-header">
        <h1>Asistente de RRHH</h1>
        <p>Pregunta sobre vacaciones, nómina, beneficios o políticas internas de Founderz.</p>
      </div>

      <div className="chat-messages" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="chat-empty">
            <p>Todavía no hay mensajes. Prueba con una de estas preguntas:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  className="btn btn-ghost"
                  onClick={() => sendMessage(suggestion)}
                  type="button"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`bubble-row ${msg.role}`}>
            <div className="bubble">{msg.content}</div>
          </div>
        ))}

        {isSending && (
          <div className="bubble-row assistant">
            <div className="bubble">
              <span className="typing-dots">
                <span />
                <span />
                <span />
              </span>
            </div>
          </div>
        )}
      </div>

      <form
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          className="chat-input"
          placeholder="Escribe tu duda de RRHH..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isSending}
        />
        <button className="btn btn-primary" type="submit" disabled={isSending || !input.trim()}>
          Enviar
        </button>
      </form>
    </section>
  );
}
