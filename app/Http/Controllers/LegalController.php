<?php

namespace App\Http\Controllers;

use App\Services\LegalService;
use Inertia\Response;

/**
 * Serves the legal pages linked from the public footer.
 */
class LegalController extends Controller
{
    public function __construct(private readonly LegalService $legal) {}

    public function privacy(): Response
    {
        return inertia('legal/privacy', $this->legal->documentProps('politique-de-confidentialite'));
    }

    public function dataUsage(): Response
    {
        return inertia('legal/data-usage', $this->legal->documentProps('utilisation-des-donnees'));
    }
}
