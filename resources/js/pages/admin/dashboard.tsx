import { Head } from '@inertiajs/react';
import AdminDashboardScreen from '@/components/screens/admin/dashboard-screen';
import type { AdminStats } from '@/types';

export default function AdminDashboard({ stats }: { stats: AdminStats }) {
    return (
        <>
            <Head title="Back office" />
            <AdminDashboardScreen stats={stats} />
        </>
    );
}
