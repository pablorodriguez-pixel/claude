#!/bin/bash
# uso: sheet.sh <dir> [paso_segundos]  -> genera <dir>/sheet_XX.jpg (contactos 6x3, cada miniatura 1 por paso)
D=$1; STEP=${2:-1}; E=$(dirname "$0")
DUR=$(python3 -c "import json;w=json.load(open('$D/words.json'));print(w[-1]['e']+3.2)")
TS=$(python3 -c "import numpy as n;print(' '.join(f'{x:.2f}' for x in n.arange(0.2,$DUR,$STEP)))")
rm -rf $D/shots; node $E/render.js $D sheet $TS
rm -f $D/sheet_*.jpg; ffmpeg -v error -pattern_type glob -i "$D/shots/s_*.jpg" -vf "scale=240:-1,tile=6x3:padding=4:color=white" $D/sheet_%02d.jpg
ls $D/sheet_*.jpg
