---
paths:
    - 'app/**'
---

# App

## Couches Controller / Service / Repository / Model

Controller: HTTP uniquement. Valide via Form Request, appelle un Service, retourne `Inertia::render()` ou une JsonResource. Aucun Eloquent, aucune logique métier, cinq méthodes REST au maximum.
Service: toute la logique métier. Ne connaît ni `Request` ni `Response`.
Repository: accès aux données seulement, eager loading explicite. Obligatoire dès qu'une requête est réutilisée à deux endroits ou qu'elle est non triviale (jointures, agrégats, filtres composés). Pour du CRUD simple, le Service parle directement au modèle.
Model: relations, casts, scopes, accessors. Pas de logique métier.
Les liaisons interface vers implémentation vivent dans un ServiceProvider dédié.

## Zones et réutilisation

Les contrôleurs sont groupés par zone: `app/Http/Controllers/` pour le site public, `app/Http/Controllers/Admin/` pour l'administration, `app/Http/Controllers/Api/V1/` pour l'API.
Une ressource éditable expose un contrôleur de ressource Laravel classique, créé avec `php artisan make:controller --resource --no-interaction`.
Les trois zones partagent le même Service. Aucune règle métier dupliquée d'une zone à l'autre. Ce qui varie d'une zone à l'autre: l'autorisation (Policy), la validation (Form Request dédié) et la forme de la réponse.

## Validation et autorisation

La validation passe toujours par un Form Request, jamais par `$request->validate()` dans un contrôleur.
L'autorisation passe par une Policy, y compris pour l'administration. Une zone protégée par middleware reste protégée par Policy.
Les contrôleurs API répondent avec des Eloquent API Resources.

## Mode strict Eloquent

`Model::shouldBeStrict()` est actif hors production. Le lazy loading, les attributs manquants et les affectations silencieuses lèvent une exception en développement. Ne pas le désactiver pour faire passer du code: corriger la requête, en général par un eager loading dans le repository.
