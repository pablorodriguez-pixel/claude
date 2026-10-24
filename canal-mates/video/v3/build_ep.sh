#!/bin/bash
# Uso: build_ep.sh <ep> <proveedor_voz>  (la voz usa caché: no vuelve a gastar créditos si el texto no cambia)
set -e -o pipefail   # si falla el render, se para (antes seguía y salía un vídeo cortado)
cd "$(dirname "$0")"; EP=$1; PROV=${2:-eleven:o0SveC0zgHFuCsEO3vHR:eleven_v4}; B=build/$EP
mkdir -p $B; python3 make_voice.py scripts/$EP.json $B "$PROV" > $B/voice.txt && tail -1 $B/voice.txt
python3 make_timeline.py $B > $B/timeline.txt && head -1 $B/timeline.txt
rm -rf $B/frames; node render_frames.js $EP 6 > $B/render.txt && tail -1 $B/render.txt
python3 make_audio.py $B
ffmpeg -y -v error -framerate 30 -i $B/frames/f%05d.jpg -i $B/mix.wav -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart $EP.mp4
ls -la $EP.mp4
