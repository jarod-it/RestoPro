<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Legal Documents
    |--------------------------------------------------------------------------
    |
    | Documents served on the public site by the legal repository. Each slug
    | matches a route defined in routes/web.php. The bodies below are
    | placeholders awaiting the final wording.
    |
    */

    'documents' => [

        'politique-de-confidentialite' => [
            'slug' => 'politique-de-confidentialite',
            'title' => 'Politique de confidentialite',
            'intro' => 'Contenu a rediger. Cette page decrira les donnees que RestoPro collecte, la finalite de chaque traitement et la duree de conservation.',
            'sections' => [
                ['heading' => 'Donnees collectees', 'body' => 'Placeholder.'],
                ['heading' => 'Finalite des traitements', 'body' => 'Placeholder.'],
                ['heading' => 'Duree de conservation', 'body' => 'Placeholder.'],
                ['heading' => 'Vos droits', 'body' => 'Placeholder.'],
            ],
            'updated_at' => null,
        ],

        'utilisation-des-donnees' => [
            'slug' => 'utilisation-des-donnees',
            'title' => 'Utilisation des donnees',
            'intro' => 'Contenu a rediger. Cette page detaillera l usage fait des donnees, les sous traitants et les transferts eventuels.',
            'sections' => [
                ['heading' => 'Usage interne', 'body' => 'Placeholder.'],
                ['heading' => 'Sous traitants', 'body' => 'Placeholder.'],
                ['heading' => 'Cookies et mesure d audience', 'body' => 'Placeholder.'],
            ],
            'updated_at' => null,
        ],

    ],

];
