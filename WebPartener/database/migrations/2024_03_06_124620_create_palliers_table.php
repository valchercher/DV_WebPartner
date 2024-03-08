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
        Schema::create('palliers', function (Blueprint $table) {
            $table->id();
            $table->string("libelle");
            $table->string('condition');
            $table->integer('regle_pallier');
            $table->integer("commission_RA");
            $table->integer("commission_CC");
            $table->boolean("statut")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('palliers');
    }
};
