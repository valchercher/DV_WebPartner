<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Outil;
use App\Models\Annee;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('objectifs', function (Blueprint $table) {
            $table->foreignIdFor(Outil::class)->constrained()->cascadeOnDelete();
            $table->boolean("statut")->default(0);
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('objectifs', function (Blueprint $table) {
            //
        });
    }
};
