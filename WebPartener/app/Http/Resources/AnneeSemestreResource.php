<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\SemestreResource;
class AnneeSemestreResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            "id"=>$this->id,
            "annee"=>SemestreResource::make($this->annee),
            "semestre"=>SemestreResource::make($this->semestre),
        ];
    }
}
