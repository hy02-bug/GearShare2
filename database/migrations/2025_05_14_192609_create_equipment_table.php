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
        Schema::create('equipment', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('sports');
            $table->string('size');
            $table->string('condition'); // 'New', 'Used', etc.
            $table->string('location');
            $table->text('description')->nullable();
            $table->decimal('rentalPrice', 8, 2); // Supports decimals (e.g., 15.99)
            $table->date('dateAvailability');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment');
    }
};
