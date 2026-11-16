import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';

export default function SiteLogo() {
    const { name } = usePage().props;

    return (
        <Link
            href={home()}
            className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
            <span className="flex aspect-square size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <AppLogoIcon className="size-5 fill-current" />
            </span>
            <span className="text-base font-semibold tracking-tight">
                {name}
            </span>
        </Link>
    );
}
