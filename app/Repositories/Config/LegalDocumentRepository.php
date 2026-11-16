<?php

namespace App\Repositories\Config;

use App\Repositories\Contracts\LegalDocumentRepositoryInterface;
use Illuminate\Contracts\Config\Repository as ConfigRepository;

/**
 * Serves the legal documents from config/legal.php.
 *
 * The documents are editorial placeholders for now. Swapping this class for an
 * Eloquent implementation requires no change outside the container binding.
 *
 * @phpstan-import-type LegalDocumentShape from LegalDocumentRepositoryInterface
 */
class LegalDocumentRepository implements LegalDocumentRepositoryInterface
{
    public function __construct(private readonly ConfigRepository $config) {}

    /**
     * @return LegalDocumentShape|null
     */
    public function findBySlug(string $slug): ?array
    {
        /** @var LegalDocumentShape|null $document */
        $document = $this->config->get("legal.documents.{$slug}");

        return $document;
    }

    /**
     * @return list<LegalDocumentShape>
     */
    public function all(): array
    {
        /** @var array<string, LegalDocumentShape> $documents */
        $documents = $this->config->get('legal.documents', []);

        return array_values($documents);
    }
}
