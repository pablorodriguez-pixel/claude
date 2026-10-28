#!/bin/bash
# Render reanudable: tramos de 300 fotogramas en <ep>/build/segs/, se salta los ya hechos; luego une y mezcla.
# Uso: bash render.sh ../<episodio>
set -e
cd "$(dirname "$0")"; EP=$(cd "$1" && pwd); NAME=$(basename "$EP")
D=$(python3 build.py "$EP" | awk '{print $2}')
python3 mezcla.py "$EP" >/dev/null
N=$(python3 -c "import math;print(math.ceil($D*30))"); mkdir -p "$EP/build/segs"
for ((a=0;a<N;a+=300)); do b=$((a+300<N?a+300:N)); f=$(printf "%s/build/segs/%05d.mp4" "$EP" $a)
  [ -f "$f" ] && continue
  node render.js "$EP/build" seg $a $b "$f.tmp.mp4" && mv "$f.tmp.mp4" "$f"; echo "$NAME $b/$N"
done
ls "$EP"/build/segs/[0-9]*.mp4 | sed "s/.*/file '&'/" > "$EP/build/segs/list.txt"
ffmpeg -y -loglevel error -f concat -safe 0 -i "$EP/build/segs/list.txt" -c copy "$EP/build/video_noaudio.mp4"
ffmpeg -y -loglevel error -i "$EP/build/video_noaudio.mp4" -i "$EP/build/mezcla.wav" -map 0:v -map 1:a -c:v libx264 -crf 21 -preset medium -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart "$EP/$NAME.mp4"
ls -la "$EP/$NAME.mp4"
