#!/bin/bash
# El texto de voz dice «Yésop» (pronunciación); el subtítulo y los textos dicen «Jessop».
cd "$(dirname "$0")"
sed -i 's/Yésop/Jessop/g' words.js words.json lines.json words_table.txt script.txt
