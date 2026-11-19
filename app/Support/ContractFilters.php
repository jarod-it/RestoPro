<?php

namespace App\Support;

use App\Enums\ContractType;
use Carbon\CarbonImmutable;
use Carbon\Exceptions\InvalidFormatException;

/**
 * The criteria a visitor applied on the contract search screen.
 *
 * @phpstan-type ContractFiltersShape array{search: string|null, types: list<string>, city: string|null, min_hourly_rate: float|null, available_from: string|null}
 */
final readonly class ContractFilters
{
    /**
     * @param  list<ContractType>  $types
     */
    public function __construct(
        public ?string $search = null,
        public array $types = [],
        public ?string $city = null,
        public ?float $minHourlyRate = null,
        public ?CarbonImmutable $availableFrom = null,
    ) {}

    /**
     * @param  array<string, mixed>  $input
     */
    public static function fromArray(array $input): self
    {
        return new self(
            search: self::trimmedOrNull($input['search'] ?? null),
            types: self::typesFrom($input['types'] ?? []),
            city: self::trimmedOrNull($input['city'] ?? null),
            minHourlyRate: isset($input['min_hourly_rate']) && $input['min_hourly_rate'] !== ''
                ? (float) $input['min_hourly_rate']
                : null,
            availableFrom: self::dateOrNull($input['available_from'] ?? null),
        );
    }

    /**
     * @return ContractFiltersShape
     */
    public function toArray(): array
    {
        return [
            'search' => $this->search,
            'types' => array_map(fn (ContractType $type): string => $type->value, $this->types),
            'city' => $this->city,
            'min_hourly_rate' => $this->minHourlyRate,
            'available_from' => $this->availableFrom?->toDateString(),
        ];
    }

    public function isEmpty(): bool
    {
        return $this->search === null
            && $this->types === []
            && $this->city === null
            && $this->minHourlyRate === null
            && $this->availableFrom === null;
    }

    private static function trimmedOrNull(mixed $value): ?string
    {
        if (! is_string($value)) {
            return null;
        }

        $trimmed = trim($value);

        return $trimmed === '' ? null : $trimmed;
    }

    /**
     * @return list<ContractType>
     */
    private static function typesFrom(mixed $value): array
    {
        if (! is_array($value)) {
            return [];
        }

        $types = [];

        foreach ($value as $candidate) {
            $type = is_string($candidate) ? ContractType::tryFrom($candidate) : null;

            if ($type !== null && ! in_array($type, $types, true)) {
                $types[] = $type;
            }
        }

        return $types;
    }

    private static function dateOrNull(mixed $value): ?CarbonImmutable
    {
        $date = self::trimmedOrNull($value);

        if ($date === null) {
            return null;
        }

        try {
            return CarbonImmutable::createFromFormat('!Y-m-d', $date);
        } catch (InvalidFormatException) {
            return null;
        }
    }
}
