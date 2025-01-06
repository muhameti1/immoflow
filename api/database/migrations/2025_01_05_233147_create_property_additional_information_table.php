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
        Schema::create('property_additional_information', function (Blueprint $table) {
            $table->id();
            $table->string('property_id', 8);
            $table->integer('year_built')->nullable();
            $table->integer('last_renovation_year')->nullable();
            $table->integer('number_of_floors')->nullable();
            $table->string('floor_number')->nullable();
            $table->integer('number_of_rooms')->nullable();
            $table->integer('number_of_bathrooms')->nullable();
            $table->integer('parking_spaces')->nullable();
            $table->string('energy_rating')->nullable();
            $table->string('heating_type')->nullable();
            $table->string('construction_type')->nullable();
            $table->string('building_condition')->nullable();
            $table->string('last_modernization')->nullable();
            $table->string('interior_quality')->nullable();
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
        Schema::dropIfExists('property_additional_information');
    }
};
