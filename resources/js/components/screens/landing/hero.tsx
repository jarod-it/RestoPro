import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePublicNavigation } from '@/hooks/use-public-navigation';
import { index as contractsIndex } from '@/routes/contracts';
import { register } from '@/routes';

const LAYERS = [
    { blur: 'backdrop-blur-[2px]', hold: '58%', fade: '86%' },
    { blur: 'backdrop-blur-[6px]', hold: '38%', fade: '66%' },
    { blur: 'backdrop-blur-[14px]', hold: '20%', fade: '48%' },
    { blur: 'backdrop-blur-[28px]', hold: '6%', fade: '30%' },
];

export default function Hero() {
    const { isAuthenticated } = usePublicNavigation();

    return (
        <section
            id="presentation"
            className="relative isolate scroll-mt-16 overflow-hidden"
        >
            <img
                src="/images/hero-terrasse.jpg"
                alt=""
                aria-hidden
                className="absolute inset-0 -z-20 size-full object-cover object-center"
            />

            <div aria-hidden className="absolute inset-0 -z-10">
                {LAYERS.map((layer) => (
                    <div
                        key={layer.blur}
                        className={`absolute inset-0 ${layer.blur}`}
                        style={{
                            maskImage: `linear-gradient(to right, black 0%, black ${layer.hold}, transparent ${layer.fade})`,
                            WebkitMaskImage: `linear-gradient(to right, black 0%, black ${layer.hold}, transparent ${layer.fade})`,
                        }}
                    />
                ))}
                <div className="absolute inset-0 bg-linear-to-r from-background/92 via-background/55 to-transparent" />
            </div>

            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
                <div className="max-w-2xl py-24 sm:py-32 lg:py-40">
                    <p className="text-sm font-medium tracking-wide text-primary uppercase">
                        Plateforme pour la restauration
                    </p>

                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                        La salle, la cuisine et les équipes, pilotées au même
                        endroit
                    </h1>

                    <p className="mt-6 max-w-xl text-base text-foreground/80 sm:text-lg">
                        RestoPro réunit la caisse, le recrutement et la
                        planification des services. Vous encaissez, vous trouvez
                        du personnel disponible et vous montez vos brigades sans
                        changer d outil.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <Button size="lg" className="rounded-full" asChild>
                            <a href="#services">
                                Découvrir les services
                                <ArrowRight />
                            </a>
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full bg-background/60"
                            asChild
                        >
                            <Link
                                href={
                                    isAuthenticated
                                        ? contractsIndex()
                                        : register()
                                }
                            >
                                {isAuthenticated
                                    ? 'Parcourir les contrats'
                                    : 'Créer un compte'}
                                <ArrowRight />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
