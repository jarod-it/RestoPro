<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\BackOfficeService;
use Inertia\Response;

/**
 * Entry point of the back office.
 */
class DashboardController extends Controller
{
    public function __construct(private readonly BackOfficeService $backOffice) {}

    public function __invoke(): Response
    {
        return inertia('admin/dashboard', $this->backOffice->overviewProps());
    }
}
