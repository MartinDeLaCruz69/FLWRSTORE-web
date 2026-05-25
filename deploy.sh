#!/bin/bash

echo ""
echo "🌸 FLWRSTORE — Deploy a producción 🌸"
echo ""

npm run build

if [ $? -ne 0 ]; then
  echo "❌ Error en el build. Deploy cancelado."
  exit 1
fi

firebase deploy --only hosting

if [ $? -ne 0 ]; then
  echo "❌ Error en el deploy."
  exit 1
fi

echo ""
echo "✅ FLWRSTORE actualizada — https://flwrstore.com.mx"
echo ""