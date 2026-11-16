import type { InertiaLinkProps } from '@inertiajs/react';

export type PublicNavItem = {
    label: string;
    href: NonNullable<InertiaLinkProps['href']>;
};

export type LandingSection = {
    id: string;
    label: string;
};

export type LegalSection = {
    heading: string;
    body: string;
};

export type LegalDocument = {
    slug: string;
    title: string;
    intro: string;
    sections: LegalSection[];
    updated_at: string | null;
};

export type ClientAccount = {
    id: string;
    name: string;
    email: string;
    email_verified: boolean;
    two_factor_enabled: boolean;
    member_since: string | null;
};

export type AdminStats = {
    verified_clients: number;
};
