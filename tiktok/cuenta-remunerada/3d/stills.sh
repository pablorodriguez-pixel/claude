#!/bin/bash
# Renderiza un fotograma de prueba por plano: ./stills.sh "0:1.9 1:4.0 ..."
BL=${BLENDER:-blender}
cd "$(dirname "$0")"
for pair in $1; do n=${pair%%:*}; t=${pair##*:}
  $BL -b --factory-startup -P shots.py -- $n still $t 2>&1 | grep -E "SHOT_DONE|Error|Traceback|File \"" | head -6
done
