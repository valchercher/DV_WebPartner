<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PallierResource extends JsonResource
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
            "libelle"=>$this->libelle,
            "condition"=>$this->condition,
            "regle_pallier"=>$this->regle_pallier,
            "regle_pallier_sablix"=>$this->regle_pallier_sablix,
            "commission_CC"=>$this->commission_RA,
            "commission_RA"=>$this->commission_CC,
            "commission_RAVT"=>$this->commission_RAVT,
            "commission_SADI"=>$this->commission_SADI,
        ];
    }
}
