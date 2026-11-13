# Onda — Hydratation connectée

Landing page marketing réalisée avec React + Vite.

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvrez l'URL affichée par Vite (généralement http://localhost:5173).

## Build de production

```bash
npm run build
npm run preview
```

## Personnalisation

- Le contenu marketing est dans `src/main.jsx`.
- Les styles responsive sont dans `src/styles.css`.
- Les visuels issus de la présentation sont dans `public/`.
- Le formulaire est une démonstration front-end : il affiche une confirmation mais n'envoie ni ne stocke les e-mails. Connectez un backend ou un service de formulaire avant une mise en production.

## Déploiement Vercel

Importez le dépôt GitHub dans Vercel. Vercel détecte Vite automatiquement. Commande de build : `npm run build`. Dossier de sortie : `dist`.
