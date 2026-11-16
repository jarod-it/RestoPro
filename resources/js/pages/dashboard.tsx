import { Head } from '@inertiajs/react';
import ClientDashboardScreen from '@/components/screens/client/dashboard-screen';
import { dashboard } from '@/routes';
import type { ClientAccount } from '@/types';

export default function Dashboard({ account }: { account: ClientAccount }) {
    return (
        <>
            <Head title="Espace client" />
            <ClientDashboardScreen account={account} />
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Espace client',
            href: dashboard(),
        },
    ],
};
