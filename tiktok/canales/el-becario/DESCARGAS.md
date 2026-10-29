# Qué descargar para «El Becario» en Blender (≈10-15 min, una vez)

Todo va dentro del repo, en `tiktok/canales/el-becario/assets/`, con esta estructura:
```
assets/
  arturo/   personaje.fbx  +  animaciones (*.fbx)
  dani/     personaje.fbx  +  animaciones (*.fbx)
  escenario/  (el jet, en .glb o .fbx)
```

## 1. Personajes — mixamo.com (gratis con cuenta de Adobe)
Pestaña **Characters**. Elige dos (los nombres cambian; elige por aspecto):
- **Arturo (mentor, 62):** hombre mayor o maduro, **con traje** o camisa y americana. Si no hay ninguno mayor, el más serio con traje.
- **Dani (becario, 23):** chico joven **informal** (sudadera o camiseta, zapatillas).
Para cada uno: botón **DOWNLOAD** → Format **FBX Binary (.fbx)** · Pose **T-pose** → guárdalo como `personaje.fbx` en su carpeta.

## 2. Animaciones — pestaña Animations (con el personaje seleccionado)
Busca cada nombre (o la más parecida). Para cada una: **DOWNLOAD** → FBX Binary · **Skin: Without Skin** ·
Frames per Second: **30** · Keyframe Reduction: **none**. Guarda con el nombre de la tabla.

| Arturo (`assets/arturo/`) | Buscar en Mixamo |
|---|---|
| `sentado-hablando.fbx` | Sitting Talking |
| `sentado-reposo.fbx` | Sitting Idle |
| `sentado-explicando.fbx` | Sitting Talking (otra variante) o Talking |
| `sentado-se-inclina.fbx` | Sitting (lean forward) / Sitting Disapproval |
| `sentado-asiente.fbx` | Sitting Agreeing / Head Nod Yes |

| Dani (`assets/dani/`) | Buscar en Mixamo |
|---|---|
| `sentado-reposo.fbx` | Sitting Idle |
| `sentado-pregunta.fbx` | Sitting Talking |
| `sentado-sorprendido.fbx` | Sitting (surprised) / Shocked |
| `sentado-se-rasca.fbx` | Sitting Thinking / Head Scratch |
| `mira-movil.fbx` | Sitting (phone) / Texting While Sitting |

No pasa nada si alguna no existe: con *Sitting Idle* + *Sitting Talking* de cada uno ya se puede hacer el episodio.

## 3. Escenario — el jet (sketchfab.com, gratis con cuenta)
Busca **«private jet interior»**, filtra por **Downloadable** y licencia **CC Attribution** (CC BY), y descarga en
**glTF (.glb)**. Guárdalo en `assets/escenario/`. Si no encuentras uno que te guste, lo monto yo.
Apunta el autor y el enlace: la licencia CC BY pide citarlo en la descripción del vídeo.

## 4. Súbelo y conecta
1. En tu Mac, desde la carpeta `claude`: `git add tiktok/canales/el-becario/assets && git commit -m "assets" && git push`
2. Blender instalado (blender.org, versión Apple Silicon).
3. App de escritorio de Claude → Ajustes → Claude Code → **Remote Control** → añade la carpeta `claude`.
4. Avísame: monto las escenas y renderizamos en tu Mac.
