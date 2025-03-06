<?php

use App\Http\Controllers\IndexController;
use App\Http\Controllers\PelangganController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\TransactionController;
use App\Models\Penjualan;

Route::get("/", [IndexController::class, "index"]);

Route::prefix("/produk")->group(function () {
    Route::get("/" , [ProdukController::class, "index"]);
    Route::post("/", [ProdukController::class, "createProductData"]);
    Route::put("/{id}", [ProdukController::class, "updateProductData"]);
    Route::delete("/{id}", [ProdukController::class, "deleteProductData"]);
});

Route::prefix("/pelanggan")->group(function () {
    Route::get("/" , [PelangganController::class, "index"]);
    Route::post("/", [PelangganController::class, "createNewCustomer"]);
    Route::put("/{id}", [PelangganController::class, "updateData"]);
    Route::delete("/{id}", [PelangganController::class,"delete"]);
});

Route::prefix("/penjualan")->group(function () {
    Route::get("", [TransactionController::class, "index"]);
    Route::get("/create", [Transactioncontroller::class, "createTransactionIndex"]);
    Route::post("/create", [TransactionController::class, "createTransaction"]);
    Route::get("/{id}/details", [TransactionController::class, "getTransactionDetails"]);
    Route::get("/{id}/print", [TransactionController::class, "printTransaction"]);
});

