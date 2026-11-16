import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import type { PublicNavItem } from '@/types';

type Props = {
    items: PublicNavItem[];
    className?: string;
    itemClassName?: string;
    onNavigate?: () => void;
};

export default function SiteNav({
    items,
    className,
    itemClassName,
    onNavigate,
}: Props) {
    return (
        <nav className={className}>
            {items.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                        'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
                        itemClassName,
                    )}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}
