<?php

namespace Tests\Feature;

use App\Enums\ContractType;
use App\Models\Contract;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class ContractSearchTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page(): void
    {
        $this->get(route('contracts.index'))->assertRedirect(route('login'));
    }

    public function test_an_authenticated_user_sees_the_published_offers(): void
    {
        Contract::factory()->count(3)->create();
        Contract::factory()->unpublished()->create();

        $response = $this->actingAs(User::factory()->create())
            ->get(route('contracts.index'));

        $response->assertOk();
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('contracts/index')
            ->has('offers.data', 3)
            ->where('offers.meta.total', 3)
            ->has('cities')
            ->has('types', count(ContractType::cases())),
        );
    }

    public function test_the_search_term_matches_the_restaurant_name(): void
    {
        Contract::factory()->create(['restaurant_name' => 'Brasserie Marceau']);
        Contract::factory()->create(['restaurant_name' => 'Cantine Nord']);

        $response = $this->actingAs(User::factory()->create())
            ->get(route('contracts.index', ['search' => 'Marceau']));

        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->has('offers.data', 1)
            ->where('offers.data.0.restaurant_name', 'Brasserie Marceau'),
        );
    }

    public function test_offers_can_be_filtered_by_contract_type_and_hourly_rate(): void
    {
        Contract::factory()->ofType(ContractType::Extra)->create(['hourly_rate' => 22.5]);
        Contract::factory()->ofType(ContractType::Extra)->create(['hourly_rate' => 13]);
        Contract::factory()->ofType(ContractType::Cdi)->create(['hourly_rate' => 25]);

        $response = $this->actingAs(User::factory()->create())->get(route('contracts.index', [
            'types' => [ContractType::Extra->value],
            'min_hourly_rate' => 20,
        ]));

        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->has('offers.data', 1)
            ->where('offers.data.0.hourly_rate', 22.5),
        );
    }

    public function test_the_filters_are_validated(): void
    {
        $response = $this->actingAs(User::factory()->create())->get(route('contracts.index', [
            'types' => ['stagiaire'],
            'min_hourly_rate' => 'beaucoup',
            'available_from' => '16/11/2026',
        ]));

        $response->assertSessionHasErrors([
            'types.0',
            'min_hourly_rate',
            'available_from',
        ]);
    }
}
