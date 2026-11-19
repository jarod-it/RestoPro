<?php

namespace App\Providers;

use App\Repositories\Config\LegalDocumentRepository;
use App\Repositories\Contracts\ContractRepositoryInterface;
use App\Repositories\Contracts\LegalDocumentRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\Eloquent\ContractRepository;
use App\Repositories\Eloquent\UserRepository;
use Illuminate\Support\ServiceProvider;

/**
 * Binds every repository contract to the implementation the application uses.
 *
 * Services depend on the contracts only, so an implementation can be replaced
 * here without touching a service or a controller.
 */
class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * All of the container bindings that should be registered.
     *
     * @var array<class-string, class-string>
     */
    public array $bindings = [
        UserRepositoryInterface::class => UserRepository::class,
        LegalDocumentRepositoryInterface::class => LegalDocumentRepository::class,
        ContractRepositoryInterface::class => ContractRepository::class,
    ];
}
