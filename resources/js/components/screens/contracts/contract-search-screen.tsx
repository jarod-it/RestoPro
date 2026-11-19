import { Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import ContractCard from '@/components/screens/contracts/contract-card';
import ContractFiltersPanel from '@/components/screens/contracts/contract-filters-panel';
import { useContractSearch } from '@/components/screens/contracts/use-contract-search';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type {
    ContractOffersPage,
    ContractSearchFilters,
    ContractTypeOption,
} from '@/types';

type Props = {
    offers: ContractOffersPage;
    filters: ContractSearchFilters;
    cities: string[];
    types: ContractTypeOption[];
};

export default function ContractSearchScreen({
    offers,
    filters,
    cities,
    types,
}: Props) {
    const criteria = useContractSearch(filters);

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <h1 className="text-3xl font-semibold tracking-tight">
                Contrats en restauration
            </h1>
            <p className="mt-2 text-muted-foreground">
                {offers.meta.total} offre{offers.meta.total > 1 ? 's' : ''}{' '}
                publiée{offers.meta.total > 1 ? 's' : ''} par les maisons
                partenaires.
            </p>

            <div className="relative mt-8">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="search"
                    value={criteria.search}
                    onChange={(event) => criteria.setSearch(event.target.value)}
                    placeholder="Poste, restaurant ou ville"
                    aria-label="Rechercher un contrat"
                    className="h-11 pl-9"
                />
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[18rem_1fr]">
                <ContractFiltersPanel
                    criteria={criteria}
                    cities={cities}
                    types={types}
                />

                <div>
                    {offers.data.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-border py-20 text-center">
                            <p className="font-medium">Aucune offre trouvée</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Élargissez vos critères pour voir plus de
                                résultats.
                            </p>
                            {criteria.hasActiveFilters && (
                                <Button
                                    variant="outline"
                                    className="mt-6"
                                    onClick={criteria.reset}
                                >
                                    Effacer les filtres
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {offers.data.map((offer) => (
                                <ContractCard key={offer.id} offer={offer} />
                            ))}
                        </div>
                    )}

                    {offers.meta.last_page > 1 && (
                        <nav className="mt-10 flex items-center justify-between gap-4">
                            <Button
                                variant="outline"
                                disabled={offers.links.previous === null}
                                asChild={offers.links.previous !== null}
                            >
                                {offers.links.previous === null ? (
                                    <span>Précédent</span>
                                ) : (
                                    <Link
                                        href={offers.links.previous}
                                        preserveScroll
                                    >
                                        Précédent
                                    </Link>
                                )}
                            </Button>

                            <span className="text-sm text-muted-foreground">
                                Page {offers.meta.current_page} sur{' '}
                                {offers.meta.last_page}
                            </span>

                            <Button
                                variant="outline"
                                disabled={offers.links.next === null}
                                asChild={offers.links.next !== null}
                            >
                                {offers.links.next === null ? (
                                    <span>Suivant</span>
                                ) : (
                                    <Link
                                        href={offers.links.next}
                                        preserveScroll
                                    >
                                        Suivant
                                    </Link>
                                )}
                            </Button>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
}
