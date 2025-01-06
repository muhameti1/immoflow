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
        Schema::create('property_areas', function (Blueprint $table) {
            $table->id();
            $table->string('property_id', 8);
            $table->decimal('total_area', 10, 2)->nullable();
            $table->decimal('living_area', 10, 2)->nullable();
            $table->decimal('usable_area', 10, 2)->nullable();
            $table->decimal('land_area', 10, 2)->nullable();
            $table->decimal('storage_area', 10, 2)->nullable();
            $table->decimal('terrace_area', 10, 2)->nullable();
            $table->decimal('balcony_area', 10, 2)->nullable();
            $table->decimal('garden_area', 10, 2)->nullable();
            $table->decimal('basement_area', 10, 2)->nullable();
            $table->decimal('garage_area', 10, 2)->nullable();
            $table->decimal('parking_area', 10, 2)->nullable();
            $table->timestamps();

            $table->foreign('property_id')
                ->references('id')
                ->on('properties')
                ->onDelete('cascade');

            $table->index('property_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_areas');
    }
};
