import { Head } from '@inertiajs/react';
import LegalDocumentScreen from '@/components/screens/legal/legal-document-screen';
import type { LegalDocument } from '@/types';

export default function DataUsage({ document }: { document: LegalDocument }) {
    return (
        <>
            <Head title={document.title} />
            <LegalDocumentScreen document={document} />
        </>
    );
}
