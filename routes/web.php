<?php

use App\Http\Controllers\Client\ContractSearchController;
use App\Http\Controllers\Client\DashboardController;
use App\Http\Controllers\LegalController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'index')->name('home');

Route::get('politique-de-confidentialite', [LegalController::class, 'privacy'])
    ->name('legal.privacy');

Route::get('utilisation-des-donnees', [LegalController::class, 'dataUsage'])
    ->name('legal.data-usage');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::get('contrats', ContractSearchController::class)->name('contracts.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
