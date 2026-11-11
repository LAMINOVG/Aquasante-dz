# AquaSanté DZ — Projet Capacitor Android Prêt à l'Emploi

Ce dossier contient l'intégralité du projet **Vite + React + Tailwind + Capacitor** préconfiguré avec l'identifiant Android `dz.aquasante.app` et les **36 marques d'eaux algériennes**.

---

## Option 1 : Générer l'APK et le fichier Play Store (.AAB) SANS rien installer sur votre PC (via GitHub)

J'ai inclus un robot de compilation automatique dans `.github/workflows/android-build.yml` :

1. Créez un nouveau dépôt (repository) sur votre compte **GitHub**.
2. Uploadez tous les fichiers de ce ZIP dans votre dépôt GitHub.
3. Cliquez sur l'onglet **Actions** de votre dépôt GitHub.
4. En 3 minutes, les serveurs de GitHub compilent l'application Android pour vous : vous n'avez plus qu'à télécharger **`AquaSante-DZ-debug-apk`** (pour l'installer sur votre Samsung Galaxy) et **`AquaSante-DZ-release-aab`** (pour Google Play).

---

## Option 2 : Compiler sur votre PC en 1 clic

Double-cliquez simplement sur :
- **`build-android.bat`** (sur Windows)
- ou lancez **`./build-android.sh`** (sur Linux / macOS)

Le script installe automatiquement Capacitor, crée le dossier natif `android/` et l'ouvre dans Android Studio.
