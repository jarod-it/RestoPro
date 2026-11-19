<?php

namespace App\Services;

use App\Enums\ContractType;
use App\Models\Contract;
use App\Repositories\Contracts\ContractRepositoryInterface;
use App\Support\ContractFilters;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

/**
 * Shapes the contract search screen: the matching offers, the filters that
 * produced them and the values the filter panel can offer.
 */
class ContractSearchService
{
    private const PER_PAGE = 9;

    public function __construct(
        private readonly ContractRepositoryInterface $contracts,
    ) {}

    /**
     * @return array<string, mixed>
     */
    public function searchProps(ContractFilters $filters): array
    {
        $offers = $this->contracts->paginateMatching($filters, self::PER_PAGE);

        return [
            'offers' => $this->transform($offers),
            'filters' => $filters->toArray(),
            'cities' => $this->contracts->availableCities(),
            'types' => ContractType::options(),
        ];
    }

    /**
     * @param  LengthAwarePaginator<int, Contract>  $offers
     * @return array<string, mixed>
     */
    private function transform(LengthAwarePaginator $offers): array
    {
        return [
            'data' => array_map($this->toCard(...), $offers->items()),
            'meta' => [
                'current_page' => $offers->currentPage(),
                'last_page' => $offers->lastPage(),
                'total' => $offers->total(),
            ],
            'links' => [
                'previous' => $offers->previousPageUrl(),
                'next' => $offers->nextPageUrl(),
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function toCard(Contract $offer): array
    {
        return [
            'id' => $offer->id,
            'title' => $offer->title,
            'restaurant_name' => $offer->restaurant_name,
            'city' => $offer->city,
            'description' => $offer->description,
            'hourly_rate' => (float) $offer->hourly_rate,
            'contract_type' => $offer->contract_type->label(),
            'weekly_hours' => $offer->weekly_hours,
            'starts_on' => $offer->starts_on->toDateString(),
            'ends_on' => $offer->ends_on?->toDateString(),
            'image_url' => "https://picsum.photos/seed/{$offer->image_seed}/640/420",
        ];
    }
}
