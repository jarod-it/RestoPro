<?php

namespace App\Services;

use App\Repositories\Contracts\LegalDocumentRepositoryInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Shapes legal documents into the props the Inertia pages expect.
 *
 * @phpstan-import-type LegalDocumentShape from LegalDocumentRepositoryInterface
 */
class LegalService
{
    public function __construct(
        private readonly LegalDocumentRepositoryInterface $documents,
    ) {}

    /**
     * @return array{document: LegalDocumentShape}
     *
     * @throws NotFoundHttpException
     */
    public function documentProps(string $slug): array
    {
        $document = $this->documents->findBySlug($slug);

        if ($document === null) {
            throw new NotFoundHttpException("Unknown legal document [{$slug}].");
        }

        return ['document' => $document];
    }

    /**
     * @return list<array{slug: string, title: string}>
     */
    public function index(): array
    {
        return array_map(
            fn (array $document): array => [
                'slug' => $document['slug'],
                'title' => $document['title'],
            ],
            $this->documents->all(),
        );
    }
}
