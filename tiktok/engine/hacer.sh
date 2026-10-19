#!/bin/bash
# Produce un episodio de punta a punta con UNA orden y salida mínima (todo lo largo va a <ep>/logs/).
# uso: bash hacer.sh <ep_dir> [voz|hoja|video|todo]   (por defecto: todo)
#   voz   → ElevenLabs (solo las líneas sin clip) + QA en texto con Whisper
#   hoja  → UNA hoja de contactos (un fotograma cada 3 s, 5×4 a 200 px) = una sola imagen que revisar
#   video → render + mezcla + QA de audio
set -o pipefail
D=$(cd "$1" && pwd); E=$(cd "$(dirname "$0")" && pwd); P=${2:-todo}; mkdir -p "$D/logs"
ok(){ echo "✓ $*"; }; ko(){ echo "✗ $*  (detalle: $D/logs/)"; exit 1; }

if [[ $P == voz || $P == todo ]]; then
  [ -n "$API_KEY_ELEVENLABS" ] || ko "falta API_KEY_ELEVENLABS"
  python3 -I "$E/gen_lines.py" "$D" > "$D/logs/voz.log" 2>&1 || ko "voz: $(tail -1 "$D/logs/voz.log")"
  ok "voz: $(tail -1 "$D/logs/voz.log")"
  python3 -I "$E/qa.py" "$D" --whisper 2>"$D/logs/qa.err" || { [[ $P == todo ]] && ko "QA de guion: arregla lines_in.json (borra clips/NN.* de la línea) y repite"; }
fi

if [[ $P == hoja || $P == todo ]]; then
  DUR=$(python3 -c "import json;print(json.load(open('$D/words.json'))[-1]['e']+0.6)")
  TS=$(python3 -c "print(' '.join(f'{x:.2f}' for x in [0.05]+[t*3.0 for t in range(1,int($DUR/3)+1)]))")
  rm -rf "$D/shots"; node "$E/render.js" "$D" sheet $TS > "$D/logs/hoja.log" 2>&1 || ko "hoja: $(tail -1 "$D/logs/hoja.log")"
  grep -q ERRORES "$D/logs/hoja.log" && echo "! errores de página: $(grep -m1 -A1 ERRORES "$D/logs/hoja.log" | tail -1 | cut -c1-160)"
  ffmpeg -v error -y -pattern_type glob -i "$D/shots/s_*.jpg" -vf "scale=200:-1,tile=5x4:padding=3:color=white" -frames:v 1 "$D/hoja.jpg"
  ok "hoja: $D/hoja.jpg (fotograma 0 arriba-izquierda, luego cada 3 s)"
fi

if [[ $P == video || $P == todo ]]; then
  flock /tmp/render.lock node "$E/render.js" "$D" video > "$D/logs/render.log" 2>&1 || ko "render: $(tail -1 "$D/logs/render.log")"
  grep -q ERRORES "$D/logs/render.log" && ko "render con errores de página"
  python3 -I "$E/audio.py" "$D" "${MUSICA:-ragtime}" > "$D/logs/audio.log" 2>&1 || ko "audio: $(tail -1 "$D/logs/audio.log")"
  MB=$(du -m "$D/final.mp4" | cut -f1)
  ok "final.mp4 · ${MB} MB · $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$D/final.mp4" | cut -c1-5) s · portada = fotograma 0"
  [ "$MB" -gt 95 ] && echo "! pesa más de 95 MB: re-encodifica a crf 20 antes de subirlo"
fi
exit 0
