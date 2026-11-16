<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class LegalPagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_privacy_policy_is_public(): void
    {
        $response = $this->get(route('legal.privacy'));

        $response->assertOk();
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('legal/privacy')
            ->where('document.slug', 'politique-de-confidentialite')
            ->has('document.sections'),
        );
    }

    public function test_the_data_usage_page_is_public(): void
    {
        $response = $this->get(route('legal.data-usage'));

        $response->assertOk();
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('legal/data-usage')
            ->where('document.slug', 'utilisation-des-donnees')
            ->has('document.sections'),
        );
    }
}
