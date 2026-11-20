<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trips', function (Blueprint $table) {
            $table->id();
            $table->json('from_city');       // {ar: "القاهرة", en: "Cairo", cn: "开罗"}
            $table->json('to_city');         // {ar: "الإسكندرية", en: "Alexandria", cn: "亚历山大"}
            $table->json('from_points');     // {ar: [...], en: [...], cn: [...]}
            $table->json('to_points');       // {ar: [...], en: [...], cn: [...]}
            $table->json('car_model');       // {ar: "...", en: "...", cn: "..."}
            $table->json('time');            // {ar: "08:00 ص", en: "08:00 AM", cn: "上午08:00"}
            $table->boolean('available')->default(true);
            $table->json('duration');        // {ar: "3 ساعات", en: "3 hours", cn: "3小时"}
            $table->decimal('price', 10, 2);
            $table->json('amenities');       // {ar: [...], en: [...], cn: [...]}
            $table->decimal('rating', 3, 1)->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
