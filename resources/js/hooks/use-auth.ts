import { usePage } from '@inertiajs/react';
import type { User } from '@/types';

/**
 * The signed in user, or null when the visitor is a guest.
 */
export function useAuthUser(): User | null {
    return usePage().props.auth.user;
}

export function useIsAuthenticated(): boolean {
    return useAuthUser() !== null;
}
