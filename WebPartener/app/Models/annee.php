<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Semestre;
class Annee extends Model
{
    use HasFactory,SoftDeletes;
    protected $guarded=["id"];
    public function semestres(){
        return $this->belongsToMany(Semestre::class,'annee_semestres')->withTimestamps();
    }
}
