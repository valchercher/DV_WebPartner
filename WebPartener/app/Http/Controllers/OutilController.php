<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IndicateurQuanti;
use App\Models\Outil;
use Illuminate\Support\Facades\DB;


class OutilController extends Controller
{
    public function store(Request $request){
        try{
            return DB::transaction(function() use($request){
                $indicateurs = IndicateurQuanti::all();
                foreach ($indicateurs as $key => $value) {
                    $outil = new Outil();
                    $outil->indicateur_quanti_id=$value->id;
                    $outil->save();
                };
                return response()->json([
                    "statut"=>200,
                    "message"=>"Outil ajouter avec succès",
                    "data"=>$outil
                ]);
            });
        }catch(Exception $e){
            return response()->json([
                "statut"=>221,
                "message"=>"Erreur lors de l'ajout outil",
                "data"=>$e->getMessage()
            ]);
        };
    }
}
