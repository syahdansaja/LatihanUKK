<?php

namespace App\Http\Controllers;

use App\Models\Penjualan;
use App\Models\Pelanggan;
use App\Models\Produk;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index () {
        return Inertia::render("TransactionPage", [
            "transactions" => Penjualan::orderBy("TanggalPenjualan")->with("pelanggan")->get(),
        ]);
    }
    public function transactionDetails($id) {
        $transaction = Penjualan::where("PenjualanID",$id)->with("detailpenjualans")->first();
        if(!$transaction){
            return redirect()->back()->withErrors([
                "errors" => [
                    "client" => "Data transaksi tidak di temukan"
                ]
            ]);
        }
        return response()->json([
            "transactionDetails" => $transaction
        ]);
    }
    public function createTransactionIndex() {
        return Inertia::render("CreateTransaction", [
            "products" => Produk::orderBy("NamaProduk")->get(),
            "customers" => Pelanggan::orderBy("NamaPelanggan")->get()
        ]);
    }
    public function validateExistingProduct() {

    }
    public function createTransaction(Request $req) {
        $validated = $req->validate([
            "PelangganID" => "required|numeric",
            "detailtransaksi" => "array",
            "detailtransaksi.*.ProdukID" => "required|numeric|exists:produks,ProdukID",
        ]);
        $customer = Pelanggan::where("PelangganID", $validated["PelangganID"])->first();
        if(! $customer) {
            return redirect()->back()->withErrors([
                "message" => "data customer tidak ditemukan"
            ]);
        }
        $transaction = $customer->penjualans()->create([
            "TanggalPenjualan" => Carbon::now(),
            "TotalHarga" => 0
        ]);
        $detailtransactions = [];
        foreach($validated["detailtransaksi"] as $detail ) {
            $detailtransactions[] = [
                "ProdukID" => $detail["ProdukID"]
            ];
        }
        return $detailtransactions;
    }
}
