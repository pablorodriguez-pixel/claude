#!/bin/bash
# Vídeo completo del motor 2D, por tramos reanudables. Uso: bash render.sh ../<ep>   → <ep>/<ep>.mp4
set -e
cd "$(dirname "$0")"; EP=$(cd "$1" && pwd); NAME=$(basename "$EP"); R=../../a-escala/build/render.js
D=$(python3 build.py "$EP" | awk '{print $2}')
node planos.js "$EP/build" 2>/dev/null || true
python3 mezcla.py "$EP" >/dev/null
N=$(python3 -c "import math;print(math.ceil($D*30))"); mkdir -p "$EP/build/segs"
for ((a=0;a<N;a+=300)); do b=$((a+300<N?a+300:N)); f=$(printf "%s/build/segs/%05d.mp4" "$EP" $a)
  [ -f "$f" ] && continue
  for try in 1 2 3; do node $R "$EP/build" seg $a $b "$f.tmp.mp4" && break; done; mv "$f.tmp.mp4" "$f"; echo "$NAME $b/$N"
done
ls "$EP"/build/segs/[0-9]*.mp4 | sed "s/.*/file '&'/" > "$EP/build/segs/list.txt"
ffmpeg -y -loglevel error -f concat -safe 0 -i "$EP/build/segs/list.txt" -c copy "$EP/build/video_noaudio.mp4"
ffmpeg -y -loglevel error -i "$EP/build/video_noaudio.mp4" -i "$EP/build/mezcla.wav" -map 0:v -map 1:a -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart "$EP/$NAME.mp4"
ls -la "$EP/$NAME.mp4"
