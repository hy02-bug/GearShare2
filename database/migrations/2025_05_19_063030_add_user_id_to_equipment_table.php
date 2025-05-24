<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // database/migrations/xxxx_add_user_id_to_equipment_table.php
        public function up()
        {
            Schema::table('equipment', function (Blueprint $table) {
                    // Add user_id column (unsignedBigInteger for foreign key)
                    $table->unsignedBigInteger('user_id')->after('id');

                    // Add foreign key constraint
                    $table->foreign('user_id')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade'); // Optional: Delete equipment if user is deleted
            });
        }

        public function down()
        {
            Schema::table('equipment', function (Blueprint $table) {
                    $table->dropForeign(['user_id']); // Must drop FK first
                    $table->dropColumn('user_id');
        });
        }
};
