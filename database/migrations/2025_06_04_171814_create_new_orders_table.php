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
        Schema::create('orders', function (Blueprint $table) {
            // Primary Key
            $table->id();

            // Relationships
            $table->foreignId('customer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('owner_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('equipment_id')->constrained()->onDelete('cascade');

            // Status & Payment
            $table->string('status')->default('pending')->comment('pending/approved/paid/rejected/expired');
            $table->decimal('total_price', 10, 2);
            $table->decimal('security_deposit', 10, 2)->nullable();

            // Stripe Integration
            $table->string('session_id')->nullable()->unique()->comment('Stripe Checkout Session ID');
            $table->string('approval_token')->nullable->unique()->comment('For owner approval links');

            // Dates
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('paid_at')->nullable();

            // Metadata
            $table->json('customer_notes')->nullable();
            $table->json('owner_notes')->nullable();

            // Timestamps
            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index(['owner_id', 'status']);
            $table->index(['customer_id', 'status']);
            $table->index('session_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
