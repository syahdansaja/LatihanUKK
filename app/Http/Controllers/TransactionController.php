<?php

namespace App\Http\Controllers;

use App\Models\Penjualan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index () {
        return Inertia::render("TransactionPage", [
            "transactions" => Penjualan::orderBy("TanggalPenjualan")->get()
        ]);
    }
}
