import type { LegalDocument } from '@/types';

export default function LegalDocumentScreen({
    document,
}: {
    document: LegalDocument;
}) {
    return (
        <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
            <h1 className="text-3xl font-semibold tracking-tight">
                {document.title}
            </h1>

            {document.updated_at && (
                <p className="mt-2 text-sm text-muted-foreground">
                    Derniere mise a jour : {document.updated_at}
                </p>
            )}

            <p className="mt-6 text-base text-muted-foreground">
                {document.intro}
            </p>

            <div className="mt-10 flex flex-col gap-8">
                {document.sections.map((section) => (
                    <section key={section.heading}>
                        <h2 className="text-xl font-semibold tracking-tight">
                            {section.heading}
                        </h2>
                        <p className="mt-2 text-base text-muted-foreground">
                            {section.body}
                        </p>
                    </section>
                ))}
            </div>
        </article>
    );
}
