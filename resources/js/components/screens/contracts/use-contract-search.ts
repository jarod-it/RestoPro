import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { index as contractsIndex } from '@/routes/contracts';
import type { ContractSearchFilters } from '@/types';

const DEBOUNCE_MS = 350;

type ContractSearch = {
    search: string;
    setSearch: (value: string) => void;
    types: string[];
    toggleType: (value: string) => void;
    city: string | null;
    setCity: (value: string | null) => void;
    minHourlyRate: number | null;
    setMinHourlyRate: (value: number | null) => void;
    availableFrom: string | null;
    setAvailableFrom: (value: string | null) => void;
    reset: () => void;
    hasActiveFilters: boolean;
};

type Criteria = {
    search: string;
    types: string[];
    city: string | null;
    minHourlyRate: number | null;
    availableFrom: string | null;
};

function toQuery(criteria: Criteria): Record<string, string | string[]> {
    const query: Record<string, string | string[]> = {};

    if (criteria.search.trim() !== '') {
        query.search = criteria.search.trim();
    }

    if (criteria.types.length > 0) {
        query.types = criteria.types;
    }

    if (criteria.city !== null) {
        query.city = criteria.city;
    }

    if (criteria.minHourlyRate !== null) {
        query.min_hourly_rate = String(criteria.minHourlyRate);
    }

    if (criteria.availableFrom !== null) {
        query.available_from = criteria.availableFrom;
    }

    return query;
}

/**
 * Holds the draft criteria of the contract search screen and pushes them to
 * the server as a partial Inertia visit. Typing is debounced, every other
 * control submits straight away.
 */
export function useContractSearch(
    applied: ContractSearchFilters,
): ContractSearch {
    const [search, setSearch] = useState(applied.search ?? '');
    const [types, setTypes] = useState<string[]>(applied.types);
    const [city, setCity] = useState<string | null>(applied.city);
    const [minHourlyRate, setMinHourlyRate] = useState<number | null>(
        applied.min_hourly_rate,
    );
    const [availableFrom, setAvailableFrom] = useState<string | null>(
        applied.available_from,
    );

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const timeout = window.setTimeout(() => {
            router.get(
                contractsIndex().url,
                toQuery({ search, types, city, minHourlyRate, availableFrom }),
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    only: ['offers', 'filters'],
                },
            );
        }, DEBOUNCE_MS);

        return () => window.clearTimeout(timeout);
    }, [search, types, city, minHourlyRate, availableFrom]);

    const toggleType = (value: string) => {
        setTypes((current) =>
            current.includes(value)
                ? current.filter((type) => type !== value)
                : [...current, value],
        );
    };

    const reset = () => {
        setSearch('');
        setTypes([]);
        setCity(null);
        setMinHourlyRate(null);
        setAvailableFrom(null);
    };

    const hasActiveFilters =
        search.trim() !== '' ||
        types.length > 0 ||
        city !== null ||
        minHourlyRate !== null ||
        availableFrom !== null;

    return {
        search,
        setSearch,
        types,
        toggleType,
        city,
        setCity,
        minHourlyRate,
        setMinHourlyRate,
        availableFrom,
        setAvailableFrom,
        reset,
        hasActiveFilters,
    };
}
