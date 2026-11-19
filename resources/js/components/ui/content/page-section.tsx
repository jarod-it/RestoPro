import { cn } from '@/lib/utils';

type Tone = 'default' | 'muted' | 'sand';

type Props = {
    id?: string;
    eyebrow?: string;
    title: string;
    description?: string;
    tone?: Tone;
    className?: string;
    children?: React.ReactNode;
};

const TONES: Record<Tone, string> = {
    default: 'bg-background',
    muted: 'bg-muted/50',
    sand: 'bg-sand/15',
};

export default function PageSection({
    id,
    eyebrow,
    title,
    description,
    tone = 'default',
    className,
    children,
}: Props) {
    return (
        <section
            id={id}
            className={cn('scroll-mt-16 border-t border-border', TONES[tone])}
        >
            <div
                className={cn(
                    'mx-auto w-full max-w-6xl px-4 py-20 sm:px-6',
                    className,
                )}
            >
                {eyebrow && (
                    <p className="text-sm font-medium tracking-wide text-primary uppercase">
                        {eyebrow}
                    </p>
                )}

                <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                    {title}
                </h2>

                {description && (
                    <p className="mt-4 max-w-2xl text-base text-muted-foreground">
                        {description}
                    </p>
                )}

                {children && <div className="mt-12">{children}</div>}
            </div>
        </section>
    );
}
