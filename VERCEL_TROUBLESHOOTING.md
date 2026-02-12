# Résolution de l'erreur 404 sur Vercel

## Problème
Vous obtenez une erreur `404: NOT_FOUND` sur `marque-blanche.vercel.app`

## Solution

### 1. Variables d'environnement OBLIGATOIRES

Allez dans votre projet Vercel → **Settings** → **Environment Variables** et ajoutez :

#### AUTH_SECRET (OBLIGATOIRE)
- **Nom** : `AUTH_SECRET`
- **Valeur** : Générez une clé secrète avec :
  ```bash
  openssl rand -base64 32
  ```
  Ou utilisez un générateur en ligne : https://generate-secret.vercel.app/32
- **Environnements** : Production, Preview, Development (cochez les 3)

#### AUTH_URL (OBLIGATOIRE)
- **Nom** : `AUTH_URL`
- **Valeur** : `https://marque-blanche.vercel.app`
- **Environnements** : Production, Preview, Development (cochez les 3)

#### NEXT_PUBLIC_APP_URL (Recommandé)
- **Nom** : `NEXT_PUBLIC_APP_URL`
- **Valeur** : `https://marque-blanche.vercel.app`
- **Environnements** : Production, Preview, Development (cochez les 3)

### 2. Redéployer après avoir ajouté les variables

1. Après avoir ajouté les variables, allez dans **Deployments**
2. Cliquez sur les **3 points** du dernier déploiement
3. Sélectionnez **Redeploy**
4. Ou poussez un nouveau commit pour déclencher un nouveau déploiement

### 3. Vérifier les logs

Si l'erreur persiste :

1. Allez dans **Deployments** → Cliquez sur le dernier déploiement
2. Regardez les **Function Logs** ou **Build Logs**
3. Cherchez des erreurs liées à :
   - `AUTH_SECRET`
   - `MissingSecret`
   - `auth()`

### 4. Vérifier que le build réussit

Dans les logs de build, vous devriez voir :
```
✓ Compiled successfully
✓ Generating static pages
```

Si le build échoue, corrigez les erreurs avant de redéployer.

### 5. Test local

Pour tester avant de déployer :

1. Créez un fichier `.env.local` :
   ```
   AUTH_SECRET=votre-secret-ici
   AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

2. Testez le build :
   ```bash
   npm run build
   npm start
   ```

3. Visitez `http://localhost:3000` - cela devrait fonctionner

### 6. Si l'erreur persiste

Vérifiez dans les logs Vercel :
- Les erreurs de runtime
- Les erreurs de build
- Les erreurs de fonction

Le problème est **très probablement** que `AUTH_SECRET` n'est pas défini dans Vercel.

## Checklist de déploiement

- [ ] `AUTH_SECRET` est défini dans Vercel
- [ ] `AUTH_URL` est défini dans Vercel (avec l'URL complète)
- [ ] `NEXT_PUBLIC_APP_URL` est défini (optionnel mais recommandé)
- [ ] Les variables sont définies pour Production, Preview ET Development
- [ ] Vous avez redéployé après avoir ajouté les variables
- [ ] Le build réussit sans erreur
- [ ] Les logs ne montrent pas d'erreurs liées à l'authentification
