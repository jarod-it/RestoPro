<?php

namespace Tests\Feature\Admin;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_back_office_login(): void
    {
        $this->get(route('admin.dashboard'))->assertRedirect(route('admin.login'));
    }

    public function test_a_client_cannot_reach_the_back_office(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('admin.dashboard'))
            ->assertRedirect(route('admin.login'));
    }

    public function test_an_administrator_sees_the_verified_client_count(): void
    {
        User::factory()->count(2)->create();
        User::factory()->unverified()->create();

        $response = $this->actingAs(Admin::factory()->create(), 'admin')
            ->get(route('admin.dashboard'));

        $response->assertOk();
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('admin/dashboard')
            ->where('stats.verified_clients', 2),
        );
    }
}
