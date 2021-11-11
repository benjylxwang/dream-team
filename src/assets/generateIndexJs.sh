#!/bin/bash

FOLDER=$1
OUTPUT=$2
rm $OUTPUT
exportString=''
for filepath in $FOLDER/*.png; do
    filename=${filepath##*/}
    name=${filename%.png}
    echo import $name from \'./$filename\' >> $OUTPUT
    exportString="$name, $exportString"
done

echo "export { ${exportString} };" >> $OUTPUT