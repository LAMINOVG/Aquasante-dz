@echo off
echo ===================================================
echo   INITIALISATION CAPACITOR ANDROID - AQUASANTE DZ
echo ===================================================
call npm install
call npm run build
call npx cap add android
call npx cap sync
echo.
echo Termine ! Ouverture d'Android Studio...
call npx cap open android
pause
