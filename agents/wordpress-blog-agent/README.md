# Founderz WordPress Blog Agent

Agente que automatiza la publicación de blogs en WordPress (founderz.com) conectando **NeuronWriter** (contenido SEO) con **ClickUp** (gestión de estado).

## Flujo

```
ClickUp "TEST BLOG IA"
  └─ Tarea en "to do" con nw:<query_id> en descripción
       │
       ▼
NeuronWriter API
  └─ Descarga HTML + keyword + meta + score
       │
       ▼
Content Formatter
  └─ Aplica estilos Founderz + bloque CTA + SEO
       │
       ▼
WordPress REST API (JWT)
  └─ Crea post con categoría, tags, Yoast SEO meta
       │
       ▼
ClickUp → status "complete" + comentario con URL
```

## Setup

```bash
cd agents/wordpress-blog-agent
pip install -r requirements.txt
cp .env.example .env
# Edita .env con tus credenciales
```

## Uso

```bash
# Procesar todas las tareas pendientes
python agent.py

# Simular sin publicar nada
python agent.py --dry-run

# Publicar una query de NeuronWriter directamente (sin ClickUp)
python agent.py --query-id <neuronwriter_query_id>

# Procesar una tarea concreta de ClickUp
python agent.py --task-id <clickup_task_id>

# Ver estado de todas las tareas
python agent.py --list
```

## ClickUp — cómo crear una tarea de blog

1. Ve a **Growth → SEO → TEST BLOG IA**
2. Crea una tarea con el título del artículo (= keyword principal)
3. En la **descripción** añade: `nw:<query_id_de_neuronwriter>`
4. Deja el status en **to do**
5. El agente la recoge en la siguiente ejecución

## Credenciales necesarias

| Variable | Dónde obtenerla |
|---|---|
| `WP_JWT_TOKEN` | Ya incluido (expira — regenerar en WP Admin → JWT) |
| `NEURONWRITER_API_KEY` | app.neuronwriter.com → Settings → API |
| `CLICKUP_API_TOKEN` | app.clickup.com → Settings → Apps |
