<?php

namespace App\Services;

use App\Repositories\Contracts\UserRepositoryInterface;

/**
 * View data for the back office.
 */
class BackOfficeService
{
    public function __construct(
        private readonly UserRepositoryInterface $users,
    ) {}

    /**
     * @return array{stats: array{verified_clients: int}}
     */
    public function overviewProps(): array
    {
        return [
            'stats' => [
                'verified_clients' => $this->users->countVerified(),
            ],
        ];
    }
}
