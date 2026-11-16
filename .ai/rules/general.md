---
paths:
    - '**'
---

# Général

## Commentaires: des ancres, pas de narration

Aucun commentaire qui paraphrase, raconte ou résume le code.
Le seul commentaire autorisé dans le corps d'un fichier est l'ancre de navigation `// ANCHOR: <sujet>`, posée pour qu'un agent retrouve un point clé d'un fichier long sans le lire en entier. Quelques ancres par fichier au maximum, et seulement quand la taille ou la structure du fichier le justifie.
En PHP, les blocs PHPDoc restent la forme normale pour typer une API publique (paramètres, retours, array shapes).
Pas de code commenté, pas de commentaire de suivi laissé dans le code.

## Pas de tiret long

Aucun tiret long (U+2014) ni demi-cadratin (U+2013), nulle part: code, commentaires, chaînes, textes affichés sur le site, fichiers de documentation.
Utiliser une virgule, deux-points ou des parenthèses.

## Taille de fichier

150 lignes est un seuil d'alerte, pas une limite. Au-delà, découper si le fichier porte plusieurs responsabilités, sinon le garder tel quel.
Ne jamais découper artificiellement pour passer sous le seuil.
Fichiers exemptés: `resources/js/components/ui/*.tsx` (shadcn), `resources/js/actions/**`, `resources/js/routes/**`, `resources/js/wayfinder/**` (générés).

## Portes de qualité avant de clore une tâche

`vendor/bin/pint --dirty --format agent` si du PHP a changé.
`npm run types:check` puis `npm run check` si du front a changé.
Les tests qui couvrent le changement.
Vérifier qu'aucun tiret long n'a été introduit dans le diff.
