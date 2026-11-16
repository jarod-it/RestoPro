<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\ClientAccountService;
use Illuminate\Container\Attributes\CurrentUser;
use Inertia\Response;

/**
 * Entry point of the authenticated client area.
 */
class DashboardController extends Controller
{
    public function __construct(private readonly ClientAccountService $accounts) {}

    public function __invoke(#[CurrentUser('web')] User $user): Response
    {
        return inertia('dashboard', $this->accounts->overviewProps($user));
    }
}
