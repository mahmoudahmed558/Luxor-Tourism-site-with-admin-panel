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
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->json('title');           // {ar: "...", en: "..."}
            $table->json('description');     // {ar: "...", en: "..."}
            $table->decimal('price', 10, 2);
            $table->string('city')->nullable();
            $table->integer('duration')->comment('duration in days');
            $table->string('image_path')->nullable();
            $table->boolean('is_active')->default(true);
            $table->decimal('discount', 5, 2)->default(0);
            $table->json('locations')->nullable();   // [{ar: "...", en: "..."}, ...]
            $table->json('images')->nullable();      // ["url1", "url2", ...]
            $table->decimal('rating', 3, 1)->default(0);
            $table->boolean('featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
