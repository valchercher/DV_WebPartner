<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndicateurQualiController;
use App\Http\Controllers\IndicateurQuantiController;
use App\Http\Controllers\PallierController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::controller(IndicateurQualiController::class)->prefix('Sonatel_dv')->group(function(){
    Route::post('create/quali','store');
});
Route::controller(IndicateurQuantiController::class)->prefix('Sonatel_dv')->group(function(){
    Route::post('create/quanti','store');
    Route::get('index/indicateur','index');
});
Route::controller(PallierController::class)->prefix('Sonatel_dv')->group(function(){
    Route::post('create/pallier','store');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
