---
paths:
    - 'config/auth.php'
    - 'config/hashing.php'
    - 'app/Http/Controllers/Admin/**'
    - 'app/Models/**'
---

# Authentification

## Décisions arrêtées

Hachage des mots de passe: argon2id, configuré dans `config/hashing.php`, paramètres OWASP (64 MiB, t=4, p=1), `rehash_on_login` actif. Jamais de SHA ni de MD5 pour un mot de passe: ce sont des hachages rapides, donc cassables au GPU.
Session de l'utilisateur: cookie de session Laravel, `httpOnly`, plus protection CSRF, via Fortify sur le guard `web`. Aucun jeton de session en `localStorage`, `sessionStorage` ou IndexedDB: tout ce qui est lisible par le JavaScript est lisible par une faille XSS.
API: jetons Laravel Sanctum (`routes/api.php`, middleware `auth:sanctum`). Pas de JWT écrit à la main.
Clés primaires: UUID (`HasUuids`) sur les modèles authentifiables, et `foreignUuid` / `uuidMorphs` pour toute colonne qui les référence.

## Deux guards, deux tables

Guard `web` sur la table `users`, pour le client. Guard `admin` sur la table `admins`, pour le back office.
Aucune colonne de rôle ne donne accès à l'administration: un compte client ne peut pas être promu en administrateur, il n'est pas dans la bonne table.
Fortify ne pilote que le guard `web`. Le back office garde son propre contrôleur de session, `app/Http/Controllers/Admin/AuthenticatedSessionController.php`.
Les deux guards partagent la même session chiffrée, donc `session()->regenerate()` à chaque connexion et `invalidate()` plus `regenerateToken()` à chaque déconnexion.

## Limitation de débit

Toute route de connexion est limitée. Le limiteur `login` de Fortify couvre le client, le limiteur `admin-login` déclaré dans `AppServiceProvider` couvre le back office.
La clé combine l'adresse e-mail et l'adresse IP: une IP seule regroupe injustement les utilisateurs derrière un même réseau, un compte seul permet de verrouiller une cible.
