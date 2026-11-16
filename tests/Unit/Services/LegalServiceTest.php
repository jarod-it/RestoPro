<?php

namespace Tests\Unit\Services;

use App\Repositories\Contracts\LegalDocumentRepositoryInterface;
use App\Services\LegalService;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class LegalServiceTest extends TestCase
{
    public function test_it_exposes_the_document_found_by_the_repository(): void
    {
        $service = new LegalService($this->repositoryReturning($this->document()));

        $props = $service->documentProps('cgu');

        $this->assertSame('CGU', $props['document']['title']);
    }

    public function test_it_fails_when_the_document_does_not_exist(): void
    {
        $service = new LegalService($this->repositoryReturning(null));

        $this->expectException(NotFoundHttpException::class);

        $service->documentProps('unknown');
    }

    public function test_it_reduces_the_index_to_slugs_and_titles(): void
    {
        $document = $this->document();

        $service = new LegalService($this->repositoryReturning($document, [$document]));

        $expected = [['slug' => 'cgu', 'title' => 'CGU']];

        $this->assertSame($expected, $service->index());
    }

    /**
     * @return array<string, mixed>
     */
    private function document(): array
    {
        return [
            'slug' => 'cgu',
            'title' => 'CGU',
            'intro' => 'Intro',
            'sections' => [['heading' => 'A', 'body' => 'B']],
            'updated_at' => null,
        ];
    }

    /**
     * @param  array<string, mixed>|null  $document
     * @param  list<array<string, mixed>>  $all
     */
    private function repositoryReturning(?array $document, array $all = []): LegalDocumentRepositoryInterface
    {
        return new class($document, $all) implements LegalDocumentRepositoryInterface
        {
            /**
             * @param  array<string, mixed>|null  $document
             * @param  list<array<string, mixed>>  $all
             */
            public function __construct(
                private readonly ?array $document,
                private readonly array $all,
            ) {}

            public function findBySlug(string $slug): ?array
            {
                return $this->document;
            }

            public function all(): array
            {
                return $this->all;
            }
        };
    }
}
