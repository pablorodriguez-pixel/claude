#!/bin/bash
# Junta el vídeo 3D de Blender (<ep>/build/blender/3d.mp4) con la capa HTML (cifras, nombres, subtítulos) y el audio.
# Uso: bash compone.sh ../../ep06-lucia-o-marcos   → <ep>/<ep>-3d.mp4
set -e
cd "$(dirname "$0")"; EP=$(cd "$1" && pwd); NAME=$(basename "$EP"); B="$EP/build"
python3 ../build.py "$EP" >/dev/null; python3 ../mezcla.py "$EP" >/dev/null
N=$(python3 -c "import json;print(len(json.load(open('$B/blender/pos.json'))))")
mkdir -p "$B/ov"; for ((a=0;a<N;a+=300)); do b=$((a+300<N?a+300:N))
  [ -f "$B/ov/o_$(printf %05d $((b-1))).png" ] || Q='?3d' node ../render.js "$B" pngs $a $b "$B/ov"; done
ffmpeg -y -loglevel error -i "$B/blender/3d.mp4" -framerate 30 -i "$B/ov/o_%05d.png" -i "$B/mezcla.wav" \
  -filter_complex "[0:v]scale=1080:1920:flags=lanczos[b];[b][1:v]overlay=0:0:shortest=1,format=yuv420p[v]" -map "[v]" -map 2:a \
  -c:v libx264 -crf 20 -preset medium -c:a aac -b:a 192k -shortest -movflags +faststart "$EP/$NAME-3d.mp4"
ls -la "$EP/$NAME-3d.mp4"
