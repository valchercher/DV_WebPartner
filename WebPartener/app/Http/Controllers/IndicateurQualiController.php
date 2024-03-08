<?php

namespace App\Http\Controllers;
use Exception;
use Illuminate\Http\Request;
use App\Models\IndicateurQuali;
use Illuminate\Support\Facades\DB;
class IndicateurQualiController extends Controller
{
    public function store(Request $request)
    {
        
        try
        {
            return DB::transaction(function() use($request){
                
                $quali =new IndicateurQuali();
                $quali->indicateur = $request->indicateur;
                $quali->poids_RA = $request->poids_RA;
                $quali->poids_CC = $request->poids_CC;
                $quali->poids_SADI = $request->poids_SADI;
                $quali->poids_RAVT = $request->poids_RAVT;
                $quali->objectif = $request->objectif;
                $quali->save();
            });
        }catch(Exception $e)
        {
            return response()->json([
                "error"=>$e->getMessage(),
            ]);
        }
    }
}
