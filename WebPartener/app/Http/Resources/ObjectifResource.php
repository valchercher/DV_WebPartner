<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\AnneeSemestreResource;
use App\Http\Resources\OutilResource;
use App\Models\Annee;
use App\Models\AnneeSemestre;
use App\Models\Semestre;
class ObjectifResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $allAnneeSemestre = AnneeSemestre::all();
        $annee_id = $allAnneeSemestre->pluck('annee_id')->toArray();
        $semestre_id = $allAnneeSemestre->pluck('semestre_id')->toArray();
        $anneeActive = Annee::whereIn('id',$annee_id)->where('etat',1)->first();
        $semestreActive = Semestre::whereIn('id',$semestre_id)->where('etat',1)->pluck('id');

        $anneeSemestre = AnneeSemestre::whereIn('semestre_id',$semestreActive)->where('annee_id',$anneeActive->id)->get();
       
        $anneeSemestreIds = $anneeSemestre->pluck('id')->toArray();
        $anneeSemestreResources = collect();
        foreach ($anneeSemestre as $anneeSemestreItem) {
            $anneeSemestreResources->push(AnneeSemestreResource::make($anneeSemestreItem));
        }
        return [
            "id"=>$this->id,
            "outil_id"=>OutilResource::make($this->outil),
            "value"=>$this->value,
            "annee_semestre"=>$anneeSemestreResources,
            "statut"=>$this->statut,
        ];
    }
}
