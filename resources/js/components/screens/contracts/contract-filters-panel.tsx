import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { formatHourlyRate } from '@/lib/format';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { ContractTypeOption } from '@/types';
import type { useContractSearch } from '@/components/screens/contracts/use-contract-search';

const ANY_CITY = 'toutes';

type Props = {
    criteria: ReturnType<typeof useContractSearch>;
    cities: string[];
    types: ContractTypeOption[];
};

export default function ContractFiltersPanel({
    criteria,
    cities,
    types,
}: Props) {
    return (
        <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                        <SlidersHorizontal className="size-4" />
                        Filtres
                    </h2>

                    {criteria.hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={criteria.reset}
                        >
                            <X />
                            Effacer
                        </Button>
                    )}
                </div>

                <fieldset className="mt-6">
                    <legend className="text-sm font-medium">
                        Type de contrat
                    </legend>

                    <div className="mt-3 flex flex-col gap-2.5">
                        {types.map((type) => (
                            <div
                                key={type.value}
                                className="flex items-center gap-3"
                            >
                                <Checkbox
                                    id={`type-${type.value}`}
                                    checked={criteria.types.includes(
                                        type.value,
                                    )}
                                    onCheckedChange={() =>
                                        criteria.toggleType(type.value)
                                    }
                                />
                                <Label
                                    htmlFor={`type-${type.value}`}
                                    className="font-normal"
                                >
                                    {type.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </fieldset>

                <div className="mt-6 grid gap-2">
                    <Label htmlFor="city">Ville</Label>
                    <Select
                        value={criteria.city ?? ANY_CITY}
                        onValueChange={(value) =>
                            criteria.setCity(value === ANY_CITY ? null : value)
                        }
                    >
                        <SelectTrigger id="city" className="w-full">
                            <SelectValue placeholder="Toutes les villes" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={ANY_CITY}>
                                Toutes les villes
                            </SelectItem>
                            {cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                    {city}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="mt-6 grid gap-2">
                    <div className="flex items-baseline justify-between">
                        <Label htmlFor="min-hourly-rate">
                            Taux horaire minimum
                        </Label>
                        <span className="text-sm font-medium text-muted-foreground">
                            {criteria.minHourlyRate === null
                                ? 'Indifférent'
                                : formatHourlyRate(criteria.minHourlyRate)}
                        </span>
                    </div>
                    <input
                        id="min-hourly-rate"
                        type="range"
                        min={16}
                        max={35}
                        step={0.5}
                        value={criteria.minHourlyRate ?? 16}
                        onChange={(event) =>
                            criteria.setMinHourlyRate(
                                Number(event.target.value),
                            )
                        }
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
                    />
                </div>

                <div className="mt-6 grid gap-2">
                    <Label htmlFor="available-from">
                        Disponible à partir du
                    </Label>
                    <Input
                        id="available-from"
                        type="date"
                        value={criteria.availableFrom ?? ''}
                        onChange={(event) =>
                            criteria.setAvailableFrom(
                                event.target.value === ''
                                    ? null
                                    : event.target.value,
                            )
                        }
                    />
                </div>
            </div>
        </aside>
    );
}
