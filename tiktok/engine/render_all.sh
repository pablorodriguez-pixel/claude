#!/bin/bash
D=/tmp/claude-0/-home-user/e7509651-8a9e-5b92-be7f-f416fbb7d9dc/scratchpad/prod/lt02_super
N=1725
for try in 1 2 3 4 5 6; do
  for a in $(seq 0 200 $N); do node $D/rev/rchunk.js $D $a $((a+200)) >> $D/rev/rchunk.log 2>&1; done
  c=$(ls $D/rev/frames/*.jpg | wc -l); echo "try $try frames $c" >> $D/rev/rchunk.log
  [ "$c" -ge "$N" ] && break
done
ffmpeg -y -loglevel error -framerate 30 -i $D/rev/frames/f_%05d.jpg -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p $D/video_noaudio.mp4
python3 -I $D/../engine/audio.py $D abuela > $D/rev/audio.log 2>&1
ffprobe -v error -show_entries stream=codec_name,width,height:format=duration -of compact $D/final.mp4 >> $D/rev/audio.log
for t in 0.0 15.3 23.5 38.7 54.0; do ffmpeg -v error -y -ss $t -i $D/final.mp4 -frames:v 1 -vf scale=360:-1 $D/rev/v4_$t.jpg; done
ffmpeg -v error -y -i $D/rev/v4_0.0.jpg -i $D/rev/v4_15.3.jpg -i $D/rev/v4_23.5.jpg -i $D/rev/v4_38.7.jpg -i $D/rev/v4_54.0.jpg -filter_complex hstack=5 $D/rev/final_check.jpg
echo DONE >> $D/rev/rchunk.log
