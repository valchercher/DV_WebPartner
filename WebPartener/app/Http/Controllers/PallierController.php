<?php

namespace App\Http\Controllers;
use Exception;
use Illuminate\Http\Request;
use App\Models\Pallier;
use  Illuminate\Support\Facades\DB;
class PallierController extends Controller
{
    public function store(Request $request)
    {
        try
        {
            return DB::transaction(function() use($request){
                $indicateurQuali = Pallier::create([
                    "libelle"=>$request->libelle,
                    "condition"=>$request->condition,
                    "regle_pallier"=>$request->regle_pallier,
                    "commission_CC"=>$request->commission_RA,
                    "commission_RA"=>$request->commission_CC,
                ]);
            });
        }catch(Exception $e)
        {
            return response()->json([
                "error"=>$e->getMessage(),
            ]);
        }
    }
}
