"use client";

import { useState } from "react";

/**
 * El hero de esta variante no afirma la tesis del webinar: la demuestra.
 *
 * Se descartó una primera versión en la que el visitante pegaba un prompt suyo.
 * Escribir encima del fold es fricción alta —hay que tener el prompt a mano,
 * copiarlo y exponerlo— y filtra justo donde no interesa filtrar. Aquí solo se
 * elige entre dos, con dos objetivos táctiles grandes: cero teclado.
 *
 * El sénior alterna de lado entre rondas para que no se acierte por posición.
 */

type Ronda = {
  contexto: string;
  /** Índice de la opción escrita por el perfil sénior. */
  senior: 0 | 1;
  opciones: [string, string];
  porque: React.ReactNode;
};

const RONDAS: Ronda[] = [
  {
    contexto: "Un post de LinkedIn.",
    senior: 1,
    opciones: [
      "Escríbeme un post de LinkedIn sobre inteligencia artificial y cómo está cambiando el trabajo. Que sea profesional.",
      "Soy directora de operaciones en una empresa de logística de 200 personas. Escribe un post de 120 palabras para otros directores de operaciones contando por qué frenamos un piloto de IA en almacén. Tono directo, sin entusiasmo de vendedor, sin la palabra «revolución». Termina con una pregunta.",
    ],
    porque: (
      <>
        El segundo no pide un tema: pide un texto concreto, para un lector
        concreto, y dice <b>lo que no quiere</b>. Por eso no puede salir
        genérico.
      </>
    ),
  },
  {
    contexto: "Resumir la transcripción de un comité.",
    senior: 0,
    opciones: [
      "Te paso la transcripción de un comité de 50 minutos. Sácame: (1) decisiones tomadas y quién es responsable de cada una; (2) desacuerdos que quedaron abiertos; (3) lo que se dijo que se haría y no tiene fecha. En tabla. Si algo no está claro en la transcripción, dilo en vez de deducirlo.",
      "Resume esta reunión y dime los puntos importantes.",
    ],
    porque: (
      <>
        El primero define <b>qué significa «importante»</b> en lugar de dejar
        que lo decida la IA. Y le da permiso para decir «no lo sé», que es justo
        lo que evita que se lo invente.
      </>
    ),
  },
  {
    contexto: "Analizar unos datos de ventas.",
    senior: 1,
    opciones: [
      "Analiza estos datos de ventas y dame conclusiones y recomendaciones.",
      "Adjunto ventas mensuales por región de 2024 y 2025. Compáralas y dime solo dónde la variación supera el 15%. Para cada caso, dame la hipótesis más probable y qué dato necesitaría yo para confirmarla. No me des recomendaciones todavía.",
    ],
    porque: (
      <>
        Pone un <b>umbral</b>, pide hipótesis en vez de certezas y aplaza la
        recomendación. Está usando la IA para pensar mejor, no para que piense
        por él.
      </>
    ),
  },
];

const CIERRES = [
  {
    titulo: "No las has visto venir",
    texto:
      "Y es normal: la diferencia no está en la herramienta, está en el criterio. Eso es exactamente lo que se ve en el directo.",
  },
  {
    titulo: "Una de tres",
    texto:
      "Intuyes por dónde va, pero todavía no lo distingues a la primera. En el directo se ve el porqué de cada una.",
  },
  {
    titulo: "Dos de tres",
    texto:
      "Buen ojo. Te falta el matiz que separa el prompt correcto del que te ahorra media mañana.",
  },
  {
    titulo: "Las tres",
    texto:
      "Ya sabes distinguirlo. Lo que vemos en el directo no son reglas: es cómo se decide cuando el resultado no acaba de estar bien.",
  },
];

export default function PromptGame() {
  const [ronda, setRonda] = useState(0);
  const [elegida, setElegida] = useState<number | null>(null);
  const [aciertos, setAciertos] = useState(0);
  const [fin, setFin] = useState(false);

  const r = RONDAS[ronda];
  const resuelta = elegida !== null;

  function elegir(i: number) {
    if (resuelta) return;
    setElegida(i);
    if (i === r.senior) setAciertos((n) => n + 1);
  }

  function siguiente() {
    if (ronda === RONDAS.length - 1) {
      setFin(true);
      return;
    }
    setRonda((n) => n + 1);
    setElegida(null);
  }

  if (fin) {
    const c = CIERRES[aciertos];
    return (
      <div className="wb-game" role="status">
        <p className="wb-score" data-nivel={aciertos >= 2 ? "alto" : aciertos === 1 ? "medio" : "bajo"}>
          {aciertos}
          <span>/3</span>
        </p>
        <h3 className="wb-score-title">{c.titulo}</h3>
        <p className="wb-score-text">{c.texto}</p>
        <p className="wb-score-text wb-score-cta">
          El formulario está justo aquí al lado. Son cuatro campos.
        </p>
      </div>
    );
  }

  return (
    <div className="wb-game">
      <div className="wb-game-top">
        <p className="wb-game-q">
          ¿Cuál lo escribió alguien con quince años de oficio?
        </p>
        <span className="wb-game-step">
          {ronda + 1} de {RONDAS.length}
        </span>
      </div>
      <p className="wb-game-ctx">{r.contexto}</p>

      <div className="wb-opts" data-locked={resuelta ? "true" : "false"}>
        {r.opciones.map((texto, i) => {
          const estado = !resuelta
            ? undefined
            : i === r.senior
              ? "win"
              : i === elegida
                ? "lose"
                : "dim";
          return (
            <button
              key={i}
              type="button"
              className="wb-opt"
              data-state={estado}
              onClick={() => elegir(i)}
              disabled={resuelta}
            >
              <span className="wb-opt-tag">Opción {i === 0 ? "A" : "B"}</span>
              <span className="wb-opt-txt">{texto}</span>
              {resuelta && i === r.senior && (
                <span className="wb-opt-verdict">Este lo escribió el sénior</span>
              )}
              {resuelta && i === elegida && i !== r.senior && (
                <span className="wb-opt-verdict">Tu elección</span>
              )}
            </button>
          );
        })}
      </div>

      {resuelta && (
        <>
          <p className="wb-why">
            <b>{elegida === r.senior ? "Correcto." : "Casi."}</b> {r.porque}
          </p>
          <button
            type="button"
            className="fz-btn fz-btn--primary wb-next"
            onClick={siguiente}
          >
            {ronda === RONDAS.length - 1 ? "Ver mi resultado" : "Siguiente"}
          </button>
        </>
      )}
    </div>
  );
}
