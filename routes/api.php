<?php

use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::post("/test", [TransactionController::class , "createTransaction"]);
// Route::get("/test/{id}", [TransactionController::class ,"getTransactionDetails"]);
// Route::delete("test/{id}", [TransactionController::class,"deleteTransaction"]);
