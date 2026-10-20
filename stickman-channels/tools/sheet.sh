#!/bin/sh
# Hoja de contactos de un vídeo: tools/sheet.sh <id>
D=build/$1/sheet; n=$(ls $D/s*.jpg | wc -l); cols=5; rows=$(( (n + cols - 1) / cols ))
ffmpeg -v error -y -pattern_type glob -i "$D/s*.jpg" -vf "scale=288:512,tile=${cols}x${rows}:padding=4" -frames:v 1 build/$1/contact.jpg
