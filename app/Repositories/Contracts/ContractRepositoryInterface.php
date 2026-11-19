<?php

namespace App\Repositories\Contracts;

use App\Models\Contract;
use App\Support\ContractFilters;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

/**
 * Read access to the published job offers.
 */
interface ContractRepositoryInterface
{
    /**
     * @return LengthAwarePaginator<int, Contract>
     */
    public function paginateMatching(ContractFilters $filters, int $perPage = 9): LengthAwarePaginator;

    /**
     * Every city that currently has at least one published offer.
     *
     * @return list<string>
     */
    public function availableCities(): array;
}
