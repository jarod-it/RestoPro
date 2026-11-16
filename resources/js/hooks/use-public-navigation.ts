import { home, login, register } from '@/routes';
import { dataUsage, privacy } from '@/routes/legal';
import type { LandingSection, PublicNavItem } from '@/types';

export const LANDING_SECTIONS: LandingSection[] = [
    { id: 'presentation', label: 'Présentation' },
    { id: 'a-propos', label: 'À propos' },
    { id: 'services', label: 'Services' },
];

type PublicNavigation = {
    mainNav: PublicNavItem[];
    accountNav: PublicNavItem[];
    legalNav: PublicNavItem[];
};

/**
 * Single source of truth for the public chrome navigation.
 */
export function usePublicNavigation(): PublicNavigation {
    const mainNav = LANDING_SECTIONS.map((section) => ({
        label: section.label,
        href: `${home.url()}#${section.id}`,
    }));

    const accountNav: PublicNavItem[] = [
        { label: 'Connexion', href: login() },
        { label: 'Inscription', href: register() },
    ];

    const legalNav: PublicNavItem[] = [
        { label: 'Politique de confidentialité', href: privacy() },
        { label: 'Utilisation des données', href: dataUsage() },
    ];

    return { mainNav, accountNav, legalNav };
}
