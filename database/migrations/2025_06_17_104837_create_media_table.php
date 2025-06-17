<?php
// database/migrations/xxxx_xx_xx_create_media_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipment_id')->constrained()->onDelete('cascade');
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_type')->default('image');
            $table->integer('file_size'); // in bytes
            $table->string('mime_type');
            $table->boolean('is_primary')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index(['equipment_id', 'is_primary']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
