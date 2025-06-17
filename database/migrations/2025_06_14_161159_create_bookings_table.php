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
    Schema::create('bookings', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('customer_id'); // Foreign key to users table
        $table->unsignedBigInteger('equipment_id'); // Foreign key to equipment table
        $table->string('pickup_loc');
        $table->string('return_loc');
        $table->date('start_date');
        $table->date('end_date');
        $table->float('total_price', 8);
        $table->timestamps();

        // Foreign key constraints
        $table->foreign('customer_id')->references('id')->on('users')->onDelete('cascade');
        $table->foreign('equipment_id')->references('id')->on('equipment')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
