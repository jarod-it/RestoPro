import { CalendarDays, ChefHat, CreditCard, UserSearch } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import PageSection from '@/components/ui/content/page-section';

type Service = {
    icon: LucideIcon;
    title: string;
    description: string;
};

const SERVICES: Service[] = [
    {
        icon: CreditCard,
        title: 'Caisse et encaissement',
        description:
            'Un point de vente pensé pour le coup de feu: prise de commande, envoi en cuisine, additions partagées et suivi des ventes en temps réel.',
    },
    {
        icon: UserSearch,
        title: 'Recrutement',
        description:
            'Publiez vos postes et trouvez des profils disponibles autour de vous, du plongeur au chef de partie, sans passer par une agence.',
    },
    {
        icon: CalendarDays,
        title: 'Planning des services',
        description:
            'Construisez vos semaines, couvrez les coupures, gérez les absences et suivez les heures effectuées sans ressortir le tableur.',
    },
    {
        icon: ChefHat,
        title: 'Montage de brigade',
        description:
            'Vous ouvrez ou vous repartez de zéro: on définit les postes à pourvoir, les niveaux attendus et on vous accompagne jusqu au premier service.',
    },
];

export default function Services() {
    return (
        <PageSection
            id="services"
            eyebrow="Services"
            title="Quatre briques, adoptées au rythme qui vous arrange"
            description="Chaque module fonctionne seul et se complète avec les autres. Vous commencez par ce qui vous manque aujourd hui."
            tone="muted"
        >
            <div className="grid gap-5 sm:grid-cols-2">
                {SERVICES.map((service) => (
                    <article
                        key={service.title}
                        className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
                    >
                        <span className="flex size-11 items-center justify-center rounded-lg bg-seaglass/25 text-primary">
                            <service.icon className="size-5" />
                        </span>

                        <h3 className="mt-5 text-lg font-semibold tracking-tight">
                            {service.title}
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {service.description}
                        </p>
                    </article>
                ))}
            </div>
        </PageSection>
    );
}
