<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\IndicateurQuanti;
class Outil extends Model
{
    use HasFactory;
    protected $guarded=["id"];
    public function indicateurQuanti()
    {
        return $this->belongsTo(IndicateurQuanti::class);
    }
   
}
