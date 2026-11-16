<?php

namespace App\Repositories\Contracts;

/**
 * Read access to the legal documents published on the public site.
 *
 * @phpstan-type LegalDocumentShape array{slug: string, title: string, intro: string, sections: list<array{heading: string, body: string}>, updated_at: string|null}
 */
interface LegalDocumentRepositoryInterface
{
    /**
     * Find a legal document by its slug.
     *
     * @return LegalDocumentShape|null
     */
    public function findBySlug(string $slug): ?array;

    /**
     * List every published legal document.
     *
     * @return list<LegalDocumentShape>
     */
    public function all(): array;
}
