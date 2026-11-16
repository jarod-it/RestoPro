import SiteLogo from '@/components/shell/site-logo';
import SiteNav from '@/components/shell/site-nav';
import { usePublicNavigation } from '@/hooks/use-public-navigation';

export default function SiteFooter() {
    const { legalNav } = usePublicNavigation();

    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
                <SiteLogo />

                <SiteNav
                    items={legalNav}
                    className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2"
                />

                <p className="text-sm text-muted-foreground">
                    {new Date().getFullYear()} RestoPro
                </p>
            </div>
        </footer>
    );
}
