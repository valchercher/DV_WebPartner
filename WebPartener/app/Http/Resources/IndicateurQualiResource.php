<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IndicateurQualiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=>$this->id,
            "indicateur"=>$this->indicateur,
            "poids_RA"=>$this->poids_RA,
            "poids_CC"=>$this->poids_CC,
            "poids_RAVT"=>$this->poids_RAVT,
            "poids_SADI"=>$this->poids_SADI,
            "objectif"=>$this->objectif,
        ];
    }
}
