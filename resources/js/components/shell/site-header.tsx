import { Link } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import SiteLogo from '@/components/shell/site-logo';
import SiteNav from '@/components/shell/site-nav';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { usePublicNavigation } from '@/hooks/use-public-navigation';

export default function SiteHeader() {
    const { mainNav, accountNav } = usePublicNavigation();
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
                <SiteLogo />

                <SiteNav
                    items={mainNav}
                    className="hidden items-center gap-1 md:flex"
                />

                <div className="hidden items-center gap-2 md:flex">
                    {accountNav.map((item, position) => (
                        <Button
                            key={item.label}
                            variant={
                                position === accountNav.length - 1
                                    ? 'default'
                                    : 'ghost'
                            }
                            size="sm"
                            asChild
                        >
                            <Link href={item.href}>{item.label}</Link>
                        </Button>
                    ))}
                </div>

                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Ouvrir le menu"
                        >
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-72">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-6 px-4">
                            <SiteNav
                                items={mainNav}
                                className="flex flex-col gap-1"
                                itemClassName="text-base"
                                onNavigate={() => setOpen(false)}
                            />
                            <div className="flex flex-col gap-2">
                                {accountNav.map((item, position) => (
                                    <Button
                                        key={item.label}
                                        variant={
                                            position === accountNav.length - 1
                                                ? 'default'
                                                : 'outline'
                                        }
                                        asChild
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
