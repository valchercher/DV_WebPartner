<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Annee;
use App\Models\Semestre;
class AnneeSemestre extends Model
{
    use HasFactory;
    public function annee()
    {
        return $this->belongsTo(Annee::class);
    }
    public function semestre()
    {
        return $this->belongsTo(Semestre::class);
    }
}
