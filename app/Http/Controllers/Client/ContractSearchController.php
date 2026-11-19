<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContractSearchRequest;
use App\Services\ContractSearchService;
use Inertia\Response;

/**
 * Search screen for the restaurant job offers, reserved to signed in users.
 */
class ContractSearchController extends Controller
{
    public function __construct(private readonly ContractSearchService $search) {}

    public function __invoke(ContractSearchRequest $request): Response
    {
        return inertia('contracts/index', $this->search->searchProps($request->filters()));
    }
}
