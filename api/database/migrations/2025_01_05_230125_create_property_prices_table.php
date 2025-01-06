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
        Schema::create('property_prices', function (Blueprint $table) {
            $table->id();
            $table->string('property_id', 8);
            $table->decimal('amount', 12, 2)->nullable();
            $table->decimal('price_per_meter', 12, 2)->nullable();
            $table->string('currency')->default('EUR');
            $table->string('type')->default('sale');
            $table->boolean('price_on_request')->default(false);
            $table->decimal('warm_rent', 12, 2)->nullable();
            $table->decimal('cold_rent', 12, 2)->nullable();
            $table->decimal('heating_costs', 12, 2)->nullable();
            $table->decimal('additional_costs', 12, 2)->nullable();
            $table->decimal('non_transferable_costs', 12, 2)->nullable();
            $table->decimal('parking_price', 12, 2)->nullable();
            $table->decimal('monthly_rental_income', 12, 2)->nullable();
            $table->boolean('heating_in_additional_costs')->default(false);
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
        Schema::dropIfExists('property_prices');
    }
};
