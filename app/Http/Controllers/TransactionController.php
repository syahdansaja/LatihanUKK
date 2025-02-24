<?php

namespace App\Http\Controllers;

use App\Models\Penjualan;
use App\Models\Pelanggan;
use App\Models\Produk;
use App\Rules\fieldInObjectOnArray;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

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
    public static function handleProductCalculations ($product_id) {

    }
    public static function handleUpdateProduct($product = []) {

    }
    public function createTransaction(Request $req) {
        $products = (function () {
            $array = [];
            foreach(Produk::select(["ProdukID", "Stok"])->get() as $produk){
                $array[$produk->ProdukID] = $produk;
            }
            return $array;
        })();
        $productIDs = [];
        foreach($products as $product) {
            $productIDs[] = $product->ProdukID;
        }
        $validated = $req->validate([
            "PelangganID" => "required|numeric",
            "detailtransaksi" => "required|array",
            "detailtransaksi.*.ProdukID" => ["required", "integer", function($attribute, $value , $fail) use ($productIDs) {
                ! in_array($value, $productIDs) && $fail("This product doesn't exist in our record , where $attribute: $value");
            }], // lebih aman dari "exists" karena menghindari overhead database
            "detailtransaksi.*.jumlahbarang" => ["required","numeric", function ($attribute, $value , $fail) use ($products, $req) {
                $currentIndex = explode(".", $attribute)[1] ?? null;
                if(!isset($currentIndex)){
                    $fail("Wrong index in request field");
                    return;
                }
                $currentProductID =  $req->input("detailtransaksi.$currentIndex.ProdukID");
                if(!isset($products[$currentProductID])) {
                    $fail("Invalid product selected");
                    return;
                }
                $currentProduct = $products[$currentProductID];
                if($value > $currentProduct->Stok) {
                    $fail("Jumlah barang yang di minta melebihi stok di database");
                    return;
                }
            }] // validasi apakah jumlah barang yang di inginkan melebihi stok yang tersedia !
        ]);
        // $requestProducts = $validated["detailtransaksi"];
        // return response()->json([
        //     "data" => $requestProducts
        // ], 200);
        // return response()->json([
        //     "message" => "validasi berhasil"
        // ]);
        // $customer = Pelanggan::where("PelangganID", $validated["PelangganID"])->first();
        // if(! $customer) {
        //     return redirect()->back()->withErrors([
        //         "message" => "data customer tidak ditemukan"
        //     ]);
        // }
        // // $transaction = $customer->penjualans()->create([
        // //     "TanggalPenjualan" => Carbon::now(),
        // //     "TotalHarga" => 0
        // // ]);
        // $detailtransactions = [];
        // foreach($validated["detailtransaksi"] as $detail) {
        //     $detailtransactions[] = [
        //         "ProdukID" => $detail["ProdukID"],
        //         "NamaProduk" => "Ngasal"
        //     ];
        // }
        // return $detailtransactions;
    }
}
