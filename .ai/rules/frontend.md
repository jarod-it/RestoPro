---
paths:
    - 'resources/js/**'
---

# Frontend

## Arborescence

Toute création de fichier front respecte cette arborescence.

```
resources/js/
  app.tsx                point d'entrée Inertia, ne pas déplacer
  pages/                 pages résolues par Inertia depuis ce dossier, ne pas déplacer
    <zone>/<ressource>/  une zone par espace de routage (public, admin)
  layouts/               layouts Inertia branchés dans le switch de app.tsx
  components/
    ui/
      primitives/        composants atomiques maison (bouton primaire, badge, titre de section)
      <groupe>/          composants réutilisables groupés par famille (forms, feedback, data-display, navigation)
      *.tsx              primitives shadcn posées par le CLI, jamais éditées, déjà exclues du lint et du formateur
    screens/
      <zone>/<ressource>/  composants d'un écran, chemin aligné sur celui de la page
    shell/               briques de mise en page (header, sidebar, nav, footer, shell applicatif)
  hooks/                 hooks transverses
  lib/                   utilitaires purs
  types/                 types de domaine partagés, un fichier par ressource
  actions/               généré par Wayfinder, jamais édité
  routes/                généré par Wayfinder, jamais édité
  wayfinder/             généré par Wayfinder, jamais édité
```

Le chemin d'un écran reproduit celui de sa page: `pages/admin/projects/index.tsx` se sert dans `components/screens/admin/projects/`.
Une page est une coquille: elle lit ses props et compose les composants de son écran.
Toute nouvelle zone a son layout dans `layouts/` et son `case` dans le switch `layout:` de `app.tsx`.

## Cloisonnement

Aucun import d'un dossier d'écran vers un autre dossier d'écran. Quand deux écrans ont besoin de la même chose, elle monte: composant vers `components/ui/<groupe>/`, hook vers `hooks/`, type vers `types/`.
Pas de fichier baril: importer directement le fichier concerné, jamais un `index.ts` de réexport.

## Extraction et placement des composants

Extraire à la deuxième utilisation réelle, jamais par anticipation: une mauvaise abstraction coûte plus cher qu'une duplication.

Le placement se décide d'abord sur le couplage au domaine, ensuite sur la portée:

- présentation pure, sans couplage à une ressource: `ui/primitives/` si le composant est atomique, `ui/<groupe>/` sinon, même s'il n'est utilisé que par un seul écran
- couplé à une ressource, utilisé par un seul écran: `components/screens/<zone>/<ressource>/`
- couplé à une ressource, partagé par plusieurs écrans d'une même zone: racine de `components/screens/<zone>/`
- couplé à une ressource, utilisé dans plusieurs zones: `ui/<groupe>/`

Les fichiers shadcn à la racine de `components/ui/` ne sont pas modifiés à la main, on compose au-dessus dans `primitives/`.
Au-delà de trois props booléennes de variante, scinder le composant ou passer par `cva`.

## Écrans CRUD

Pour une ressource éditable, le motif par défaut suit les routes de ressource Laravel:

- `index.tsx`: liste, filtres, actions de ligne
- `create.tsx` et `edit.tsx`: des pages entières, pas des modales, pour conserver l'URL, le retour navigateur, les erreurs de validation et l'autorisation côté serveur
- un seul composant de formulaire partagé par `create` et `edit`, nommé `<ressource>-form.tsx`, piloté par `useForm` avec un modèle optionnel
- `show.tsx` seulement s'il montre autre chose que ce que `edit` affiche déjà
- la suppression est une confirmation dans un `AlertDialog`, jamais une page

Les modales servent aux actions courtes et sans état profond (confirmation, choix unique). Une modale ne porte jamais un formulaire de création ou d'édition complet.

## Types

Type de domaine renvoyé par le back (props Inertia, API Resource): `types/<ressource>.ts`, exporté et réutilisable par toutes les zones.
Type de props d'un composant: déclaré dans le fichier du composant, exporté seulement si un autre fichier en a besoin.
Type propre à un seul écran (état de filtre, forme d'un formulaire local): `components/screens/<zone>/<ressource>/types.ts`.
Un type utilisé par deux écrans monte dans `types/`. Jamais `any`.

## Données et logique

Les données d'une page viennent des props serveur envoyées par `Inertia::render()`. Aucun fetch au montage pour charger le contenu d'une page.
Les hooks portent l'état de formulaire (`useForm`), les dérivations non triviales, l'état d'interface partagé et les rares appels autonomes (`useHttp` avec Wayfinder).
Un composant se limite au rendu et à des handlers courts. Au-delà de trois `useState` ou `useEffect`, la logique sort dans un hook: local à l'écran dans son dossier, transverse dans `hooks/`.
Données globales: `HandleInertiaRequests::share()` et `usePage().props`. Données de feature: props de la page. Arbre profond: composition avant Context.

## Conventions React

Suivre la documentation officielle React. En cas de doute, la doc prime sur l'habitude.
Fichiers en kebab-case, composants en PascalCase, un seul composant exporté par fichier.
Props typées explicitement, pas de `React.FC`. En React 19, `ref` est une prop normale: pas de `forwardRef`.
Pas de `useEffect` pour un état dérivé ni pour réagir à un changement de props, calculer pendant le rendu.
Clés de liste stables issues des données, jamais l'index.
Composants purs: aucun effet de bord pendant le rendu.

## URLs

Aucune URL en dur. Liens, formulaires et appels passent par Wayfinder (`@/actions`, `@/routes`).

## Responsive

Mobile-first avec les variants Tailwind (`md:`, `lg:`), qui sont des media queries. Jamais de JavaScript pour du style.
JavaScript uniquement quand le comportement change et pas l'apparence (sidebar qui devient drawer), via `use-mobile`.
