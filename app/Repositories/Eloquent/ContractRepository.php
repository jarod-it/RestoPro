<?php

namespace App\Repositories\Eloquent;

use App\Enums\ContractType;
use App\Models\Contract;
use App\Repositories\Contracts\ContractRepositoryInterface;
use App\Support\ContractFilters;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

/**
 * Eloquent implementation backed by the Contract model, which carries the
 * table name, the casts and the published scope this repository relies on.
 */
class ContractRepository implements ContractRepositoryInterface
{
    public function __construct(private readonly Contract $model) {}

    /**
     * @return LengthAwarePaginator<int, Contract>
     */
    public function paginateMatching(ContractFilters $filters, int $perPage = 9): LengthAwarePaginator
    {
        return $this->baseQuery($filters)
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->paginate($perPage)
            ->withQueryString();
    }

    /**
     * @return list<string>
     */
    public function availableCities(): array
    {
        /** @var list<string> $cities */
        $cities = $this->model->newQuery()
            ->published()
            ->distinct()
            ->orderBy('city')
            ->pluck('city')
            ->all();

        return $cities;
    }

    /**
     * @return Builder<Contract>
     */
    private function baseQuery(ContractFilters $filters): Builder
    {
        return $this->model->newQuery()
            ->published()
            ->when($filters->search, fn (Builder $query, string $search): Builder => $query->where(
                fn (Builder $scoped): Builder => $scoped
                    ->where('title', 'like', "%{$search}%")
                    ->orWhere('restaurant_name', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%"),
            ))
            ->when($filters->types !== [], fn (Builder $query): Builder => $query->whereIn(
                'contract_type',
                array_map(fn (ContractType $type): string => $type->value, $filters->types),
            ))
            ->when($filters->city, fn (Builder $query, string $city): Builder => $query->where('city', $city))
            ->when($filters->minHourlyRate, fn (Builder $query, float $rate): Builder => $query->where('hourly_rate', '>=', $rate))
            ->when($filters->availableFrom, fn (Builder $query): Builder => $query->where('starts_on', '>=', $filters->availableFrom));
    }
}
