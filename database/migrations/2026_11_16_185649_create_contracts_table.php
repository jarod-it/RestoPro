<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('restaurant_name');
            $table->string('city');
            $table->text('description');
            $table->decimal('hourly_rate', 5, 2);
            $table->string('contract_type');
            $table->unsignedSmallInteger('weekly_hours');
            $table->date('starts_on');
            $table->date('ends_on')->nullable();
            $table->string('image_seed');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->index('contract_type');
            $table->index('city');
            $table->index('published_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
