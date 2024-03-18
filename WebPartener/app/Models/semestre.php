<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\AnneeSemestre;
class Semestre extends Model
{
    use HasFactory,SoftDeletes;
    protected $guarded=["id"];
    public function anneeSemestre()
    {
        return $this->belongsToMany(AnneeSemestre::class);
    }
}
