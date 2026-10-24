#!/bin/bash
# Uso: build_ep.sh <ep> <proveedor_voz>   p.ej.  build_ep.sh ep01 edge:es-MX-JorgeNeural
set -e
cd "$(dirname "$0")"; EP=$1; PROV=${2:-edge:es-MX-JorgeNeural}; B=build/$EP
mkdir -p $B; python3 make_voice.py scripts/$EP.json $B "$PROV" | tail -1
python3 make_timeline.py $B | head -1
rm -rf $B/frames; node render_frames.js $EP 6 | tail -1
python3 make_audio.py $B
ffmpeg -y -v error -framerate 30 -i $B/frames/f%05d.jpg -i $B/mix.wav -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart $EP.mp4
ls -la $EP.mp4
