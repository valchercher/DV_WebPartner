<?php

namespace App\Http\Controllers;

use App\Models\indicateurQuanti;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\IndicateurQuantiResource;
use App\Http\Resources\IndicateurQualiResource;
use App\Models\IndicateurQuali;
use Symfony\Component\HttpFoundation\Response;
class IndicateurQuantiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quanti = IndicateurQuanti::all();
        $quali = IndicateurQuali::all();
        return response()->json([
            "statut"=>Response::HTTP_OK,
            "message"=>"recupération de tous les indicateurs",
           "data"=>[
            "quanti"=>IndicateurQuantiResource::collection($quanti),
            "quali"=>IndicateurQualiResource::collection($quali),
           ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
   
    public function store(Request $request)
    {
        
        try
        {
            return DB::transaction(function() use($request){
                $indicateurQuali = IndicateurQuanti::create([
                    "indicateur"=>$request->indicateur,
                    "poids_RA"=>$request->poids_RA,
                    "poids_CC"=>$request->poids_CC,
                    "poids_RAVT"=>$request->poids_RAVT,
                    "poids_SADI"=>$request->poids_SADI,
                ]);
            });
        }catch(Exception $e)
        {
            return response()->json([
                "error"=>$e->getMessage(),
            ]);
        }
    }
    

    /**
     * Display the specified resource.
     */
    public function show(indicateurQuanti $indicateurQuanti)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(indicateurQuanti $indicateurQuanti)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, indicateurQuanti $indicateurQuanti)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(indicateurQuanti $indicateurQuanti)
    {
        //
    }
}
