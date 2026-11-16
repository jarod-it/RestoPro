<?php

namespace App\Services;

use App\Models\User;

/**
 * Business operations and view data for the authenticated client area.
 */
class ClientAccountService
{
    /**
     * @return array{account: array{id: string, name: string, email: string, email_verified: bool, two_factor_enabled: bool, member_since: string|null}}
     */
    public function overviewProps(User $user): array
    {
        return [
            'account' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified' => $user->email_verified_at !== null,
                'two_factor_enabled' => $user->two_factor_confirmed_at !== null,
                'member_since' => $user->created_at?->toDateString(),
            ],
        ];
    }
}
