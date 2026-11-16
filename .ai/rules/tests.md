---
paths:
    - 'tests/**'
---

# Tests

## Répartition feature / unitaire

Feature test dès qu'un test traverse une route, la base de données, une Policy ou le conteneur.
Test unitaire pour la logique métier pure, isolée de tout service externe.
En cas de doute, feature test: la majorité des tests de ce projet doit rester des feature tests.

## Couverture feature, par route

Un feature test par route, couvrant le cas nominal, l'accès refusé (401 ou 403) et la validation invalide (422).
Créer avec `php artisan make:test --phpunit {name} --no-interaction`.

## Couverture unitaire, par logique

Un test unitaire est requis dès qu'une classe porte des branches ou des cas limites:

- Service dont la règle métier a plusieurs chemins, en doublant le Repository qu'il consomme
- Value object, DTO, enum, classe de support
- Concern ou trait qui calcule quelque chose

Un test unitaire ne touche ni la base, ni le cache, ni le réseau, ni la couche HTTP, et n'utilise pas `RefreshDatabase`. S'il a besoin de la base, c'est qu'il s'agit d'un feature test.
Le Repository ne se teste pas unitairement: il ne contient que des requêtes, il est couvert par le feature test.
Créer avec `php artisan make:test --unit --phpunit {name} --no-interaction`.

## Données et lecture préalable

Utiliser les factories pour les données, y compris leurs states existants.
Lire la skill `testing-best-practices` avant d'écrire des tests.
