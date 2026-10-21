#!/bin/sh
# uso: sheet.sh <carpeta-video> t1 t2 ...  -> shots/sheet.jpg con esos fotogramas (máx 10)
d=$1; shift; : > /tmp/nsc_list.txt
for t in "$@"; do printf "file '%s/shots/s_%.2f.jpg'\n" "$(cd $d && pwd)" "$t" >> /tmp/nsc_list.txt; done
ffmpeg -y -loglevel error -f concat -safe 0 -i /tmp/nsc_list.txt -vf "scale=300:-1,tile=5x2" -frames:v 1 $d/shots/sheet.jpg
