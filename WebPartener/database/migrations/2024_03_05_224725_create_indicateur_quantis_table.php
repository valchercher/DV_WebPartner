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
        Schema::create('indicateur_quantis', function (Blueprint $table) {
            $table->id();
            $table->string('indicateur');
            $table->integer('poids_CC')->default(0);
            $table->integer('poids_RA')->default(0);
            $table->integer('poids_RAVT')->default(0);
            $table->integer('poids_SADI')->default(0);
            $table->boolean("statut")->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('indicateur_quantis');
    }
};
