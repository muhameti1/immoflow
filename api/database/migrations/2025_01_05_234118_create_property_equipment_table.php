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
        Schema::create('property_equipment', function (Blueprint $table) {
            $table->id();
            $table->string('property_id', 8);

            // Bathroom Amenities
            $table->boolean('bathtub')->default(false);
            $table->boolean('shower')->default(false);
            $table->boolean('guest_toilet')->default(false);

            // Security Features
            $table->boolean('alarm_system')->default(false);
            $table->boolean('smart_lock')->default(false);

            // Comfort & Convenience
            $table->boolean('air_conditioning')->default(false);
            $table->boolean('floor_heating')->default(false);
            $table->boolean('elevator')->default(false);
            $table->boolean('barrier_free')->default(false);
            $table->boolean('furnished')->default(false);

            // Outdoor Features
            $table->boolean('balcony')->default(false);
            $table->boolean('terrace')->default(false);
            $table->boolean('garden')->default(false);
            $table->boolean('parking')->default(false);
            $table->boolean('garage')->default(false);

            $table->timestamps();
            $table->softDeletes();

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
        Schema::dropIfExists('property_equipment');
    }
};
