import ChatPanel from "@/components/ChatPanel";
import KnowledgePanel from "@/components/KnowledgePanel";

export default function Home() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">Founderz</span>
          <span className="brand-tag">RRHH</span>
        </div>
        <span className="header-hint">Asistente interno · respuestas basadas en tu documentación</span>
      </header>

      <main className="app-main">
        <ChatPanel />
        <KnowledgePanel />
      </main>
    </div>
  );
}
