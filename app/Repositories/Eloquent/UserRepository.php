<?php

namespace App\Repositories\Eloquent;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;

/**
 * Eloquent implementation backed by the User model, which carries the table
 * name, the casts and the scopes this repository relies on.
 */
class UserRepository implements UserRepositoryInterface
{
    public function __construct(private readonly User $model) {}

    public function findByUuid(string $uuid): ?User
    {
        return $this->model->newQuery()->whereKey($uuid)->first();
    }

    public function findByEmail(string $email): ?User
    {
        return $this->model->newQuery()->where('email', mb_strtolower($email))->first();
    }

    public function countVerified(): int
    {
        return $this->model->newQuery()->whereNotNull('email_verified_at')->count();
    }
}
