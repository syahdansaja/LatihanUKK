<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pelanggan;
use Inertia\Inertia;

class PelangganController extends Controller
{
    public function index() {
        return Inertia::render("Customer", [
            "customers" => Pelanggan::orderBy("NamaPelanggan")->get()
        ]);
    }
}
