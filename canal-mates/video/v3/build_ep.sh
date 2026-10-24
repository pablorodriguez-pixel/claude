#!/bin/bash
# Uso: build_ep.sh <ep> <proveedor_voz>  (la voz usa caché: no vuelve a gastar créditos si el texto no cambia)
set -e
cd "$(dirname "$0")"; EP=$1; PROV=${2:-eleven:o0SveC0zgHFuCsEO3vHR:eleven_v4}; B=build/$EP
mkdir -p $B; python3 make_voice.py scripts/$EP.json $B "$PROV" | tail -1
python3 make_timeline.py $B | head -1
rm -rf $B/frames; node render_frames.js $EP 6 | tail -1
python3 make_audio.py $B
ffmpeg -y -v error -framerate 30 -i $B/frames/f%05d.jpg -i $B/mix.wav -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart $EP.mp4
ls -la $EP.mp4
