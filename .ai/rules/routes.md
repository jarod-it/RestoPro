---
paths:
    - 'routes/**'
---

# Routes

## Un fichier par zone

`routes/web.php` pour le site public, `routes/settings.php` pour les réglages du compte, `routes/admin.php` pour l'administration, `routes/api.php` pour l'API.
Un nouveau fichier de routes se branche par un `require __DIR__.'/<fichier>.php';` en bas de `routes/web.php`, comme le fait déjà `settings.php`. `routes/api.php` fait exception: il s'installe avec `php artisan install:api`, qui l'enregistre dans `bootstrap/app.php`.
Les routes d'administration vivent dans un groupe avec préfixe `admin`, middleware d'authentification et autorisation par Policy.

## Route model binding et slug

Toute route qui cible une ressource utilise le route model binding (`/projects/{project}`). Jamais d'identifiant brut résolu à la main dans le contrôleur.
Les pages publiques se lient par `slug` via `getRouteKeyName()`, pas par id. L'administration peut rester sur l'id.
Les pages sans ressource (accueil, dashboard, réglages) restent statiques et nommées.

## Déclaration des ressources

Déclarer les ressources avec `Route::resource()`, restreintes par `only()` ou `except()` plutôt qu'en inventant des routes hors convention.
Les routes API sont versionnées sous le préfixe `v1` et pointent vers `app/Http/Controllers/Api/V1/`.
