<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use App\Models\Pelanggan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdukController extends Controller
{
    public function  index() {
        return Inertia::render("Product", [
            "products" => Produk::orderBy("NamaProduk")->get()
        ]);
    }
    public function createProductData (Request $req) {
        $valdiated = $req->validate([
            "NamaProduk" => "required|string|max:255|unique:produks,NamaProduk",
            "Harga" => "required|numeric",
            "Stok" => "nullable|integer"
        ]);
        try {
            $newProducts = Produk::updateOrCreate([
                "NamaProduk" => $valdiated["NamaProduk"],
                "Harga" => $valdiated["Harga"],
                "Stok" => $valdiated["Stok"] ? $valdiated["Stok"] : 1
            ]);
            return redirect()->back()->with([
                "message" => "Update data successfull"
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                "errors" => [
                    "server" => "Internal Server Error" . $e->getMessage()
                ]
            ]);
        }
    }
    public function updateProductData (Request $req, $id) {
        $product = Produk::where("ProdukID", $id)->first();
        if(!$product) {
            return redirect()->back()->withErrors([
                "errors" => [
                    "client" => "Product not found"
                ]
            ]);
        }
        $validated = $req->validate([
            "NamaProduk" => "required|string|max:255",
            "Harga" => "required|numeric",
            "Stok" => "nullable|integer"
        ]);
        try {
            $product->NamaProduk = $validated["NamaProduk"];
            $product->Harga = $validated["Harga"];
            $product->Stok = $validated["Stok"];
            $product->save();
            return redirect()->back()->with([
                "message" => "Update data successfull"
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                "errors" => [
                    "server" => "Internal Server Error" . $e->getMessage()
                ]
            ]);
        }
    }
    public function deleteProductData (Request $req,$id) {
        $product = Produk::where("ProdukID", $id)->first();
        if(!$product) {
            return redirect()->back()->withErrors([
                "existing" => "Product data not found"
            ]);
        }
        try {
            $product->delete();
            return redirect()->back()->with([
                "message" => "Delete data successfull"
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                "server" => "Internal server error" . $e->getMessage()
            ]);
        }
    }
}
