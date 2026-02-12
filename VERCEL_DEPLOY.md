# Guide de Déploiement sur Vercel

## ⚠️ IMPORTANT : Variables d'environnement OBLIGATOIRES

**Si vous obtenez une erreur 404, c'est probablement parce que `AUTH_SECRET` n'est pas défini !**

Dans les paramètres de votre projet Vercel, ajoutez ces variables d'environnement :

### Variables obligatoires

1. **AUTH_SECRET** ⚠️ OBLIGATOIRE
   - Description : Clé secrète pour NextAuth.js
   - Comment générer : 
     - En ligne : https://generate-secret.vercel.app/32
     - En ligne de commande : `openssl rand -base64 32`
   - Exemple : `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0`
   - **IMPORTANT** : Sans cette variable, vous obtiendrez une erreur 404 !

2. **AUTH_URL** ⚠️ OBLIGATOIRE
   - Description : URL complète de votre application Vercel
   - Format : `https://votre-app.vercel.app`
   - Exemple : `https://marque-blanche.vercel.app`
   - **IMPORTANT** : Utilisez l'URL exacte de votre déploiement Vercel

3. **NEXT_PUBLIC_APP_URL** (optionnel mais recommandé)
   - Description : URL publique de l'application
   - Format : `https://votre-app.vercel.app`
   - Exemple : `https://white-mark.vercel.app`

## Étapes de déploiement

1. **Connecter votre repository GitHub à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Importez votre repository

2. **Configurer les variables d'environnement**
   - Dans les paramètres du projet Vercel
   - Section "Environment Variables"
   - Ajoutez les 3 variables ci-dessus

3. **Configuration du build**
   - Framework Preset : Next.js
   - Build Command : `npm run build` (par défaut)
   - Output Directory : `.next` (par défaut)
   - Install Command : `npm install` (par défaut)

4. **Déployer**
   - Vercel détectera automatiquement Next.js
   - Le build se lancera automatiquement

## Résolution des problèmes

### Erreur 404 NOT_FOUND

Si vous obtenez une erreur 404, vérifiez :

1. **Variables d'environnement** : Assurez-vous que `AUTH_SECRET` et `AUTH_URL` sont définies
2. **Build réussi** : Vérifiez les logs de build dans Vercel
3. **Routes publiques** : Le middleware devrait permettre l'accès à `/` et `/api/auth`

### Erreur de build

Si le build échoue :

1. Vérifiez les logs de build dans Vercel
2. Assurez-vous que toutes les dépendances sont dans `package.json`
3. Vérifiez que TypeScript compile sans erreurs

### Problèmes d'authentification

Si l'authentification ne fonctionne pas :

1. Vérifiez que `AUTH_SECRET` est défini et unique
2. Vérifiez que `AUTH_URL` correspond exactement à l'URL de votre déploiement
3. Vérifiez les logs de runtime dans Vercel

## Structure des routes

Les routes suivantes doivent être accessibles :

- `/` - Page d'accueil publique
- `/api/auth/*` - Routes d'authentification NextAuth
- `/login`, `/admin-login`, `/super-admin/login` - Pages de connexion
- `/[tenantSlug]/login` - Pages de connexion par tenant

## Notes importantes

- Le mode mocké fonctionne sans base de données
- Les modifications ne sont pas persistées (mode démo)
- Pour la production, vous devrez connecter une vraie base de données
