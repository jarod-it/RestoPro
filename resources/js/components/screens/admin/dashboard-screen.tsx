import { Form } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { logout } from '@/routes/admin';
import type { AdminStats } from '@/types';

export default function AdminDashboardScreen({ stats }: { stats: AdminStats }) {
    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Back office
                </h1>
                <Form {...logout.form()}>
                    {({ processing }) => (
                        <Button
                            type="submit"
                            variant="outline"
                            size="sm"
                            disabled={processing}
                        >
                            Deconnexion
                        </Button>
                    )}
                </Form>
            </div>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Clients verifies</CardTitle>
                    <CardDescription>
                        Placeholder. Le back office sera construit ici.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-semibold">
                        {stats.verified_clients}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
