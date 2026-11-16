import { Head } from '@inertiajs/react';
import AdminLoginScreen from '@/components/screens/admin/login-screen';

export default function AdminLogin() {
    return (
        <>
            <Head title="Connexion back office" />
            <AdminLoginScreen />
        </>
    );
}

AdminLogin.layout = {
    title: 'Back office',
    description: 'Acces reserve aux administrateurs',
};
