<?php

namespace App\Models;

use App\Enums\ContractType;
use Database\Factories\ContractFactory;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * A job offer published by a restaurant.
 *
 * @property string $id
 * @property string $title
 * @property string $restaurant_name
 * @property string $city
 * @property string $description
 * @property string $hourly_rate
 * @property ContractType $contract_type
 * @property int $weekly_hours
 * @property Carbon $starts_on
 * @property Carbon|null $ends_on
 * @property string $image_seed
 * @property Carbon|null $published_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Contract extends Model
{
    /** @use HasFactory<ContractFactory> */
    use HasFactory, HasUuids;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'contract_type' => ContractType::class,
            'hourly_rate' => 'decimal:2',
            'weekly_hours' => 'integer',
            'starts_on' => 'date',
            'ends_on' => 'date',
            'published_at' => 'datetime',
        ];
    }

    /**
     * @param  Builder<Contract>  $query
     * @return Builder<Contract>
     */
    #[Scope]
    protected function published(Builder $query): Builder
    {
        return $query->whereNotNull('published_at')->where('published_at', '<=', now());
    }
}
