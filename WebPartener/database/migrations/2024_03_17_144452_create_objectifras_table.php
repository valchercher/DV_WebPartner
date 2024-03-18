<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Objectif;
use App\Models\RA;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('objectifras', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Objectif::class)->constrained()->cascadeOnDelete();
            $table->foreignId('ra_id')->constrained('ras')->cascadeOnDelete();
            $table->integer("value");
            $table->boolean("statut")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('objectif_ra');
    }
};
