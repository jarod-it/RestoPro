import PageSection from '@/components/ui/content/page-section';

const PILLARS = [
    {
        title: 'Construit avec des exploitants',
        body: 'Les quatre modules viennent de besoins remontés en salle et en cuisine, pas d un cahier des charges écrit hors du terrain.',
    },
    {
        title: 'Une seule base pour la salle et les équipes',
        body: 'La caisse, le planning et le recrutement partagent les mêmes données. Un extra recruté le lundi apparaît sur le planning du service suivant.',
    },
    {
        title: 'Adopté par briques',
        body: 'Vous gardez votre caisse actuelle et vous ne prenez que le recrutement, ou l inverse. Rien n oblige à tout basculer d un coup.',
    },
];

export default function About() {
    return (
        <PageSection
            id="a-propos"
            eyebrow="À propos"
            title="Pensé pour les maisons indépendantes, pas pour les groupes"
            description="RestoPro s adresse aux restaurants qui gèrent leur salle, leur cuisine et leur personnel sans service RH dédié. L outil reprend ce que fait déjà le patron, en moins fastidieux."
        >
            <div className="grid gap-10 md:grid-cols-3">
                {PILLARS.map((pillar) => (
                    <div
                        key={pillar.title}
                        className="border-t-2 border-sand pt-5"
                    >
                        <h3 className="text-base font-semibold tracking-tight">
                            {pillar.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {pillar.body}
                        </p>
                    </div>
                ))}
            </div>
        </PageSection>
    );
}
