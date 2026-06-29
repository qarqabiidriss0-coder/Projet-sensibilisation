# 🎣 Plateforme de Sensibilisation au Phishing (Clone EcoleDirecte)

Ce projet est une application web développée dans le cadre d'une campagne interne de sensibilisation à la cybersécurité. L'objectif est d'évaluer la vigilance des utilisateurs face aux attaques d'ingénierie sociale (phishing) et de les éduquer sur les bonnes pratiques, sans jamais compromettre leurs données réelles.

⚠️ **Avertissement Éthique & Légal :** Cet outil a été créé à des fins strictement pédagogiques et d'audit interne pour le Groupe Scolaire Jean XXIII. Il ne doit en aucun cas être utilisé pour mener de véritables attaques malveillantes ou usurper des identités sans le consentement explicite des parties concernées.

## ✨ Fonctionnalités Principales

*   **Réalisme Visuel (UI/UX) :** Clone fidèle de l'interface de connexion d'EcoleDirecte (charte graphique, logos SVG, typographie) pour tester la vigilance visuelle des collaborateurs.
*   **Privacy by Design (Zéro Mot de Passe) :** La plateforme est conçue pour **ne jamais** enregistrer, traiter ou transmettre les mots de passe saisis.
*   **Tracking de KPI (Firebase) :** Enregistrement sécurisé des indicateurs de compromission (adresse e-mail ciblée, horodatage, agent utilisateur) vers une base de données Firestore pour calculer le taux de clics.
*   **Redirection Éducative :** Dès la soumission du formulaire, l'utilisateur est instantanément redirigé vers une page d'avertissement et de sensibilisation expliquant les mécanismes du phishing.

## 🛠️ Stack Technique

*   **Front-End :** React.js, Next.js (App Router)
*   **Stylisation :** Tailwind CSS
*   **Icônes :** Lucide React
*   **Back-End / Base de données :** Firebase (Firestore)
*   **Déploiement / Hébergement :** Vercel (Architecture Serverless / Edge Network)

## 🚀 Installation et Démarrage Local

Pour faire tourner ce projet sur votre machine locale :

1.  **Cloner le dépôt :**
```bash
    git clone [https://github.com/Inolmine/phishing_SCHOOL.git](https://github.com/Inolmine/phishing_SCHOOL.git)
    cd phishing_SCHOOL
```

2.  **Installer les dépendances :**
    *Note : L'utilisation du flag `--legacy-peer-deps` est requise pour résoudre les conflits de versions liés à certaines bibliothèques React dans ce projet Next.js.*
```bash
    npm install --legacy-peer-deps
```

3.  **Lancer le serveur de développement :**
```bash
    npm run dev
```
Le projet sera accessible sur [http://localhost:3000](http://localhost:3000).

## ☁️ Déploiement en Production

Ce projet est optimisé pour un déploiement fluide sur Vercel. Les fichiers `vercel.json` et `next.config.ts` ont été configurés pour ignorer les avertissements de typage stricts et assurer une mise en production continue.

```bash
# Déploiement direct via Vercel CLI
vercel --prod
```
# Projet-sensibilisation
# Projet-sensibilisation
