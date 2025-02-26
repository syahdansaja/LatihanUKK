<?php

namespace App\Http\Controllers;

use App\Models\DetailPenjualan;
use App\Models\Penjualan;
use App\Models\Pelanggan;
use App\Models\Produk;
use App\Rules\fieldInObjectOnArray;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index () {
        return Inertia::render("TransactionPage", [
            "transactions" => Penjualan::orderBy("TanggalPenjualan")->with("pelanggan")->get(),
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
        DB::beginTransaction();
        $products = (function () {
            $array = [];
            foreach(Produk::all() as $produk){
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
            "detailtransaksi.*.jumlahproduk" => ["required","integer", function ($attribute, $value , $fail) use ($products, $req) {
                $currentIndex = explode(".", $attribute)[1] ?? null;
                if(!isset($currentIndex)){
                    $fail("Invalid index in request field");
                    return;
                }
                $currentProductID =  $req->input("detailtransaksi.$currentIndex.ProdukID");
                if(!isset($products[$currentProductID])) {
                    $fail("Invalid product selected");
                    return;
                }
                $currentProduct = $products[$currentProductID];
                if($value > $currentProduct->Stok) {
                    $fail("the number of item desired is more than stock in database (Stock Ready = $currentProduct->Stok , request number of item = $value, ProductID = $currentProduct->ProdukID, Product Name = $currentProduct->NamaProduk)");
                    return;
                }
            }] // validasi apakah jumlah barang yang di inginkan melebihi stok yang tersedia !
        ]);

        $customer = Pelanggan::where("PelangganID", $validated["PelangganID"])->first();
        if(! $customer) {
            return redirect()->back()->withErrors([
                "message" => "data customer tidak ditemukan"
            ]);
        }

        try {
        $requestTransactionDetails = $req->only("detailtransaksi")["detailtransaksi"];
        $transaction = $customer->penjualans()->create([
            "TanggalPenjualan" => Carbon::now(),
            "TotalHarga" => 0
        ]);
        $detailtransactions = []; // tambah untuk pengurangan stok produk ! resiko database overhead sudah teratasi
        $updatingProducts = "";
        $updatingProductIDs = "";
        $total_harga = 0;
        foreach($requestTransactionDetails as $detail) {
            $a = $products[$detail["ProdukID"]];
            $detailtransactions[] = [
                "ProdukID" => $detail["ProdukID"],
                "JumlahProduk" => $detail["jumlahproduk"],
                "Subtotal" => $detail["jumlahproduk"] * $a->Harga
            ];
            $total_harga += $a->Harga * $detail["jumlahproduk"];
            $updatingProducts .= "WHEN ProdukID = " . $detail["ProdukID"] . " THEN Stok - " . $detail["jumlahproduk"] . " ";
            $updatingProductIDs .= $detail["ProdukID"] . ",";
        }
        $length = strlen($updatingProductIDs);
        $updatingProductIDsQuery = substr($updatingProductIDs, 0 , $length - 1);
        DB::update("
            UPDATE produks SET Stok = CASE
               " . $updatingProducts . "
            END
            WHERE ProdukID IN (" . $updatingProductIDsQuery . ")
        ");
        $transaction->detailPenjualans()->createMany($detailtransactions);
        $transaction->TotalHarga = $total_harga;
        $transaction->save();
        $details = DetailPenjualan::where("PenjualanID", $transaction->PenjualanID)->get();
        DB::commit();
        return response()->json([
            "message" => "Create transaksi berhasil",
            "transaction" => [
                "ID_transaksi" => $transaction->PenjualanID,
                "Tanggal_Transaksi" => $transaction->TanggalPenjualan,
                "Total_Harga" => $transaction->TotalHarga,
                "Nama_Pembeli" => $transaction->pelanggan->NamaPelanggan,
                "Detail_Transaksi" => $details
            ]
        ]);
        }catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                "message" => "Inertnal server error"
            ]);
        }
    }
    public function getTransactionDetails(Request $req, $id) {
        $transaction = Penjualan::where("PenjualanID", $id)->with(["detailPenjualans", "pelanggan"])->first();
        if(! $transaction) {
            return response()->json([
                "message" => "Data not found"
            ], 404);
        }
        return Inertia::render("DetailTransaction", [
            "transaction" => $transaction
        ]);
    }
    public function deleteTransaction(Request $req, $id) {
        $transaction = Penjualan::where("PenjualanID", $id)->with(["detailPenjualans"])->first();
        if(! $transaction) {
            return response()->json([
                "message" => "Data not found"
            ], 404);
        }
        try{
            $transaction->detailPenjualans()->delete();
            $transaction->delete();
            return response()->json([
                "message" => "Data berhasl di hapus"
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "errors" => "Internal server error" . $e->getMessage()
            ], 500);
        }
    }
}
