#!/bin/bash

# ── FLWRSTORE Deploy Script ──────────────────────────────────
echo ""
echo "🌸 ══════════════════════════════════════════ 🌸"
echo "        FLWRSTORE — Deploy a producción"
echo "🌸 ══════════════════════════════════════════ 🌸"
echo ""

# 1. Build
echo "📦 Construyendo el proyecto..."
npm run build

# Verificar build exitoso
if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Error en el build. Deploy cancelado."
  exit 1
fi

echo "✅ Build completado."
echo ""

# 2. Deploy a Firebase
echo "🚀 Desplegando a Firebase Hosting..."
firebase deploy --only hosting

# Verificar deploy exitoso
if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Error en el deploy."
  exit 1
fi

echo ""
echo "🌸 ══════════════════════════════════════════ 🌸"
echo "   ✅ ¡FLWRSTORE actualizada en producción!"
echo "   🔗 https://flwrstore.com.mx"
echo "🌸 ══════════════════════════════════════════ 🌸"
echo ""