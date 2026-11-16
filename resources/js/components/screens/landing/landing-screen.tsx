import PageSection from '@/components/ui/content/page-section';
import { LANDING_SECTIONS } from '@/hooks/use-public-navigation';

const PLACEHOLDERS: Record<string, string> = {
    presentation:
        'Contenu a rediger. Cette section presentera RestoPro et ce que la plateforme apporte aux restaurateurs.',
    'a-propos':
        'Contenu a rediger. Cette section presentera l equipe et la demarche derriere le projet.',
    services:
        'Contenu a rediger. Cette section detaillera les services proposes et leurs tarifs.',
};

export default function LandingScreen() {
    return (
        <>
            {LANDING_SECTIONS.map((section) => (
                <PageSection
                    key={section.id}
                    id={section.id}
                    title={section.label}
                >
                    <p>{PLACEHOLDERS[section.id]}</p>
                </PageSection>
            ))}
        </>
    );
}
