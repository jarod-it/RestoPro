import { dashboard, home, login, register } from '@/routes';
import { index as contractsIndex } from '@/routes/contracts';
import { dataUsage, privacy } from '@/routes/legal';
import { useAuthUser } from '@/hooks/use-auth';
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
    isAuthenticated: boolean;
};

/**
 * Single source of truth for the public chrome navigation. The contract search
 * entry and the account buttons depend on whether a visitor is signed in.
 */
export function usePublicNavigation(): PublicNavigation {
    const user = useAuthUser();
    const isAuthenticated = user !== null;

    const mainNav: PublicNavItem[] = LANDING_SECTIONS.map((section) => ({
        label: section.label,
        href: `${home.url()}#${section.id}`,
    }));

    if (isAuthenticated) {
        mainNav.push({ label: 'Contrats', href: contractsIndex() });
    }

    const accountNav: PublicNavItem[] = isAuthenticated
        ? [{ label: 'Espace client', href: dashboard() }]
        : [
              { label: 'Connexion', href: login() },
              { label: 'Inscription', href: register() },
          ];

    const legalNav: PublicNavItem[] = [
        { label: 'Politique de confidentialité', href: privacy() },
        { label: 'Utilisation des données', href: dataUsage() },
    ];

    return { mainNav, accountNav, legalNav, isAuthenticated };
}
