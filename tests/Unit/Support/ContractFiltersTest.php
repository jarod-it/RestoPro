<?php

namespace Tests\Unit\Support;

use App\Enums\ContractType;
use App\Support\ContractFilters;
use PHPUnit\Framework\TestCase;

class ContractFiltersTest extends TestCase
{
    public function test_it_builds_empty_filters_from_an_empty_input(): void
    {
        $filters = ContractFilters::fromArray([]);

        $this->assertTrue($filters->isEmpty());
        $this->assertSame([], $filters->types);
    }

    public function test_it_trims_text_and_treats_blank_values_as_absent(): void
    {
        $filters = ContractFilters::fromArray([
            'search' => '  chef de rang  ',
            'city' => '   ',
        ]);

        $this->assertSame('chef de rang', $filters->search);
        $this->assertNull($filters->city);
    }

    public function test_it_keeps_only_known_contract_types_without_duplicates(): void
    {
        $filters = ContractFilters::fromArray([
            'types' => ['extra', 'stagiaire', 'extra', 'cdi', 42],
        ]);

        $this->assertSame(
            [ContractType::Extra, ContractType::Cdi],
            $filters->types,
        );
    }

    public function test_it_rejects_a_date_that_is_not_iso_formatted(): void
    {
        $this->assertNull(ContractFilters::fromArray(['available_from' => '16/11/2026'])->availableFrom);
        $this->assertSame(
            '2026-11-16',
            ContractFilters::fromArray(['available_from' => '2026-11-16'])->availableFrom?->toDateString(),
        );
    }

    public function test_it_exposes_a_serialisable_shape(): void
    {
        $filters = ContractFilters::fromArray([
            'search' => 'barista',
            'types' => ['cdd'],
            'city' => 'Lyon',
            'min_hourly_rate' => '18.5',
            'available_from' => '2026-12-01',
        ]);

        $this->assertSame([
            'search' => 'barista',
            'types' => ['cdd'],
            'city' => 'Lyon',
            'min_hourly_rate' => 18.5,
            'available_from' => '2026-12-01',
        ], $filters->toArray());
    }
}
