<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use App\Models\Pelanggan;
use Illuminate\Http\Request;

class ProdukController extends Controller
{
    public function  index() {
        return response()->json([
            "data" => Pelanggan::has("penjualans")->with("penjualans.detailpenjualans.produk")->get()
        ]);
    }
}
