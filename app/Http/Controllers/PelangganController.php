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
    public function createNewCustomer(Request $request) {
        $validated = $request->validate([
            "NamaPelanggan" => "required|string|max:255",
            "Alamat" => "nullable|string",
            "NomorTelepon" => "required|string|max:15"
        ]);
        try{
            $pelanggan = Pelanggan::updateOrCreate([
                "NamaPelanggan" => $validated["NamaPelanggan"],
                "Alamat" => $validated["Alamat"] ? $validated["Alamat"] : null,
                "NomorTelepon" => $validated["NomorTelepon"]
            ]);
            return redirect()->back()->with([
                "message" => "Create data successfull"
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                "errors" => [
                    "server" => "Internal server error" . $e->getMessage()
                ]
            ]);
        }
    }
    public function updateData(Request $req, $id) {
        $customer = Pelanggan::where("PelangganID", $id)->first();
        if(! $customer) {
            return redirect()->back()->withErrors([
                "errors" => [
                    "client" => "Data not found"
                ]
            ]);
        }
        $validated = $req->validate([
            "NamaPelanggan" => "required|string|max:255",
            "Alamat" => "nullable|string",
            "NomorTelepon" => "required|string|max:15"
        ]);
        try {
            $customer->NamaPelanggan = $validated["NamaPelanggan"];
            $customer->Alamat = $validated["Alamat"] ? $validated["Alamat"] : null;
            $customer->NomorTelepon = $validated["NomorTelepon"];
            $customer->save();
            return redirect()->back()->with([
                "message" => "Data udpate successfull"
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                "errors" => [
                    "server" => "Internal server error" . $e->getMessage()
                ]
            ]);
        }
    }
    public function delete($id) {
        $customer = Pelanggan::where("PelangganID", $id)->first();
        if(! $customer) {
            return redirect()->back()->withErrors([
                "errors" => [
                    "client" => "Data not found"
                ]
            ]);
        }
        try {
            $customer->delete();
            return redirect()->back()->with([
                "message" => "Delete data successfull"
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                "errors" => [
                    "server" => "Internal server error" . $e->getMessage()
                ]
            ]);
        }
    }
}
