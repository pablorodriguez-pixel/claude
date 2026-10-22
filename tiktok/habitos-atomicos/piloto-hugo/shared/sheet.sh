#!/bin/bash
# uso: sheet.sh <dir> out.jpg t1..t10 (exactamente 10)
DIR=$1; OUT=$2; shift 2
rm -f $DIR/shot_*.jpg
node $(dirname $0)/render.js $DIR sheet "$@" || exit 1
L=$(ls $DIR/shot_*.jpg | sort -t_ -k2 -n)
f=""; for i in $(seq 0 9); do f="$f[$i:v]scale=320:569[v$i];"; done
f="$f[v0][v1][v2][v3][v4]hstack=5[a];[v5][v6][v7][v8][v9]hstack=5[b];[a][b]vstack"
ffmpeg -y -loglevel error $(for x in $L; do echo -n "-i $x "; done) -filter_complex "$f" -q:v 3 $OUT
rm -f $DIR/shot_*.jpg
