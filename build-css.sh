#!/bin/sh
# Gera o tailwind.css a partir das classes usadas no index.html.
# Rode de novo sempre que mudar/adicionar classes do Tailwind no index.html.
printf '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n' > /tmp/nook-input.css
npx --yes tailwindcss@3.4.17 -i /tmp/nook-input.css -o tailwind.css --content ./index.html --minify
