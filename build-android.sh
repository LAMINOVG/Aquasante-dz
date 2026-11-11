#!/bin/bash
echo "==================================================="
echo "  INITIALISATION CAPACITOR ANDROID - AQUASANTE DZ"
echo "==================================================="
npm install
npm run build
npx cap add android
npx cap sync
echo "Terminé ! Ouverture d'Android Studio..."
npx cap open android
