#!/bin/bash

if [ -f ./bin/nini.es6.js ]; then
  rm ./bin/nini.es6.js
fi

if [ -f ./bin/nini.js ]; then
  rm ./bin/nini.js
fi

cat ./src/monkey_patches.js >> ./bin/nini.es6.js
cat ./src/rect.js >> ./bin/nini.es6.js
cat ./src/color.js >> ./bin/nini.es6.js
cat ./src/viewport.js >> ./bin/nini.es6.js
cat ./src/bitmap.js >> ./bin/nini.es6.js
cat ./src/sprite.js >> ./bin/nini.es6.js
cat ./src/graphics.js >> ./bin/nini.es6.js
cat ./src/scene_base.js >> ./bin/nini.es6.js
cat ./src/scene_manage.js >> ./bin/nini.es6.js

babel ./bin/nini.es6.js -o ./bin/nini.js