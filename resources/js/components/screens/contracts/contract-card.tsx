import { CalendarRange, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatHourlyRate } from '@/lib/format';
import type { ContractOffer } from '@/types';

const DATE_FORMAT = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
});

function formatDate(value: string): string {
    return DATE_FORMAT.format(new Date(`${value}T00:00:00`));
}

function formatPeriod(offer: ContractOffer): string {
    if (offer.ends_on === null) {
        return `A partir du ${formatDate(offer.starts_on)}`;
    }

    return `${formatDate(offer.starts_on)} au ${formatDate(offer.ends_on)}`;
}

export default function ContractCard({ offer }: { offer: ContractOffer }) {
    return (
        <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
            <img
                src={offer.image_url}
                alt=""
                aria-hidden
                loading="lazy"
                className="aspect-16/10 w-full bg-muted object-cover"
            />

            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-base font-semibold tracking-tight">
                            {offer.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {offer.restaurant_name}
                        </p>
                    </div>

                    <Badge variant="secondary" className="shrink-0">
                        {offer.contract_type}
                    </Badge>
                </div>

                <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                    {offer.description}
                </p>

                <dl className="mt-4 flex flex-col gap-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <MapPin className="size-4 shrink-0" />
                        <dd>{offer.city}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarRange className="size-4 shrink-0" />
                        <dd>{formatPeriod(offer)}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="size-4 shrink-0" />
                        <dd>{offer.weekly_hours} h par semaine</dd>
                    </div>
                </dl>

                <p className="mt-5 border-t border-border pt-4 text-lg font-semibold">
                    {formatHourlyRate(offer.hourly_rate)}
                    <span className="text-sm font-normal text-muted-foreground">
                        {' '}
                        par heure
                    </span>
                </p>
            </div>
        </article>
    );
}
