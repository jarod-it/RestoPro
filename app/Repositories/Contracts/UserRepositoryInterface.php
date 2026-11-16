<?php

namespace App\Repositories\Contracts;

use App\Models\User;

/**
 * Read access to client accounts.
 */
interface UserRepositoryInterface
{
    public function findByUuid(string $uuid): ?User;

    public function findByEmail(string $email): ?User;

    public function countVerified(): int;
}
