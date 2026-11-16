import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { ClientAccount } from '@/types';

export default function ClientDashboardScreen({
    account,
}: {
    account: ClientAccount;
}) {
    const rows = [
        { label: 'Nom', value: account.name },
        { label: 'Adresse e-mail', value: account.email },
        {
            label: 'E-mail verifie',
            value: account.email_verified ? 'Oui' : 'Non',
        },
        {
            label: 'Double authentification',
            value: account.two_factor_enabled ? 'Active' : 'Inactive',
        },
        { label: 'Client depuis', value: account.member_since ?? 'Inconnu' },
    ];

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Espace client</CardTitle>
                    <CardDescription>
                        Placeholder. Les fonctionnalites client arriveront ici.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <dl className="divide-y divide-border">
                        {rows.map((row) => (
                            <div
                                key={row.label}
                                className="flex items-center justify-between gap-4 py-3"
                            >
                                <dt className="text-sm text-muted-foreground">
                                    {row.label}
                                </dt>
                                <dd className="text-sm font-medium">
                                    {row.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </CardContent>
            </Card>
        </div>
    );
}
