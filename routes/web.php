<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProdukController;

Route::get("/", [ProdukController::class, 'index']);
