#!/bin/bash
# Renderiza todos los planos (o los indicados) a frames/f_####.png
BL=${BLENDER:-blender}
cd "$(dirname "$0")"
for n in ${@:-$(seq 0 17)}; do
  s=$(date +%s)
  $BL -b --factory-startup -P shots.py -- $n > logs/shot_$n.log 2>&1
  echo "plano $n: $(grep -c 'Saved:' logs/shot_$n.log) fotogramas en $(( $(date +%s)-s )) s $(grep -q SHOT_DONE logs/shot_$n.log && echo OK || echo FALLO)"
done
echo TODO_TERMINADO
