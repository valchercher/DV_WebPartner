<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\DB;
use App\Models\User;
class UserController extends Controller
{
    public function store(UserRequest $request)
    {
        try{
            return DB::transaction(function() use($request){
                $username = $request->name.'_'. $request->matricule;
                
                $user = new User();
                    $user->name=$request->name;
                    $user->prenom=$request->prenom;
                    $user->email=$request->email;
                    $user->password=$request->password;
                    $user->options = isset($request->options)? $request->options : "neant";
                    $user->role_id=$request->role_id;
                    $user->matricule=$request->matricule;
                    $user->username=$username;
                $user->save();
                return response()->json([
                    "statut"=>200,
                    "message"=>"Ajouter avec succès",
                    "data"=>$user
                ]);
            });
        }catch(Exception $e){
            return response()->json([
                "statut"=>221,
                "message"=>"erreur l'hort de l'ajout d'un utilisateur",
                "data"=>$e->getMessage(),
            ]);
        }
    }
}
