# Identifiants de Connexion - Plateforme FinEd

## 🔐 Super Admin FinEd

**Page de connexion** : `/super-admin/login`  
**Interface** : `/super-admin`

- **Email** : `admin@fined.app`
- **Mot de passe** : `superadmin123`
- **Rôle** : SUPER_ADMIN
- **Accès** : Interface Super Admin (gestion de tous les tenants)

---

## 👔 Admins Partenaires

**Page de connexion** : `/admin-login`  
**Interface** : `/admin`

### Admin CIAI Vert (Couleurs Vertes)
- **Email** : `admin@ciaivert.sn`
- **Mot de passe** : `admin_ciaivert123`
- **Rôle** : ADMIN_PARTNER
- **Tenant** : CIAI Vert (ID: 1)
- **Couleurs** : Vert (#10B981 / #059669)
- **Accès** : Interface Admin Partenaire avec les couleurs du tenant

### Admin Microfinance Academy (Couleurs Bleues)
- **Email** : `admin@microfinance.sn`
- **Mot de passe** : `admin_microfinance123`
- **Rôle** : ADMIN_PARTNER
- **Tenant** : Microfinance Academy (ID: 2)
- **Couleurs** : Bleu (#3B82F6 / #2563EB)
- **Accès** : Interface Admin Partenaire avec les couleurs du tenant

---

## 👤 Clients (Utilisateurs Finaux)

**Pages de connexion** : Une page par partenaire (ex: `/ciaivert/login`, `/microfinance/login`)  
**Interface** : `/dashboard` (avec couleurs du tenant correspondant)

### Client CIAI Vert (Couleurs Vertes)
- **Page de connexion** : `/ciaivert/login`
- **Email** : `user1@ciaivert.sn`
- **Mot de passe** : `user1_ciaivert123`
- **Rôle** : USER
- **Tenant** : CIAI Vert (ID: 1)
- **Couleurs** : Vert (#10B981 / #059669)
- **Accès** : Interface utilisateur avec les couleurs du tenant CIAI Vert

- **Email** : `user2@ciaivert.sn`
- **Mot de passe** : `user2_ciaivert123`

- **Email** : `user3@ciaivert.sn`
- **Mot de passe** : `user3_ciaivert123`

### Client Microfinance Academy (Couleurs Bleues)
- **Page de connexion** : `/microfinance/login`
- **Email** : `user1@microfinance.sn`
- **Mot de passe** : `user1_microfinance123`
- **Rôle** : USER
- **Tenant** : Microfinance Academy (ID: 2)
- **Couleurs** : Bleu (#3B82F6 / #2563EB)
- **Accès** : Interface utilisateur avec les couleurs du tenant Microfinance Academy

- **Email** : `user2@microfinance.sn`
- **Mot de passe** : `user2_microfinance123`

### Client Sécurité Routière (Couleurs Rouges)
- **Page de connexion** : `/securite-routiere/login`
- **Email** : `user1@securite-routiere.sn`
- **Mot de passe** : `user1_securite123`
- **Rôle** : USER
- **Tenant** : Sécurité Routière (ID: 3)
- **Couleurs** : Rouge (#EF4444 / #DC2626)
- **Accès** : Interface utilisateur avec les couleurs du tenant Sécurité Routière

- **Email** : `user2@securite-routiere.sn`
- **Mot de passe** : `user2_securite123`

### Client Green Tech Academy (Couleurs Vert clair)
- **Page de connexion** : `/greentech/login`
- **Email** : `user1@greentech.sn`
- **Mot de passe** : `user1_greentech123`
- **Rôle** : USER
- **Tenant** : Green Tech Academy (ID: 4)
- **Couleurs** : Vert clair (#22C55E / #16A34A)
- **Accès** : Interface utilisateur avec les couleurs du tenant Green Tech Academy

---

## 📝 Notes Importantes

- **Pages de connexion distinctes** :
  - `/super-admin/login` → Pour les Super Admins uniquement
  - `/admin-login` → Pour les Admins Partenaires uniquement
  - `/[tenantSlug]/login` → Pour les Clients de chaque partenaire (ex: `/ciaivert/login`, `/microfinance/login`)

- **Chaque partenaire a sa propre page de login client** avec :
  - Le nom du partenaire affiché
  - Les couleurs du partenaire (primaire et secondaire)
  - Vérification que l'utilisateur appartient bien au bon tenant

- Chaque utilisateur a son **propre identifiant unique**
- Chaque utilisateur voit les **couleurs de son tenant** automatiquement sur toutes les interfaces
- La **redirection après connexion** se fait automatiquement selon le rôle :
  - SUPER_ADMIN → `/super-admin`
  - ADMIN_PARTNER → `/admin`
  - USER → `/dashboard`
- Les **couleurs du tenant** s'appliquent automatiquement sur toutes les interfaces client
- Si vous vous connectez avec le mauvais type de compte ou le mauvais tenant, un message d'erreur vous indiquera d'utiliser la bonne page
- La page d'accueil (`/`) affiche tous les partenaires actifs avec leurs pages de login respectives

---

## 🎨 Couleurs par Tenant

| Tenant | Couleur Primaire | Couleur Secondaire |
|--------|-----------------|-------------------|
| CIAI Vert | #10B981 (Vert) | #059669 (Vert foncé) |
| Microfinance Academy | #3B82F6 (Bleu) | #2563EB (Bleu foncé) |
| Sécurité Routière | #EF4444 (Rouge) | #DC2626 (Rouge foncé) |
| Green Tech Academy | #22C55E (Vert clair) | #16A34A (Vert) |
