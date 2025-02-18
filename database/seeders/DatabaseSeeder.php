<?php

namespace Database\Seeders;

use App\Models\Pelanggan;
use App\Models\User;
use App\Models\DetailPenjualan;
use App\Models\Produk;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $pelanggan = Pelanggan::create([
            "NamaPelanggan" => "Syahdan",
            "Alamat" => "Kalibeber",
            "NomorTelepon" => "081234567890"
        ]);
        $penjualan = $pelanggan->penjualans()->create([
            "TanggalPenjualan" => Date::now(),
            "TotalHarga" => 0
        ]);
        $produk = Produk::create([
            "NamaProduk" => "Mouse Logitech",
            "Harga" => 100000,
            "Stok" => 10
        ]);
        $detail = $penjualan->detailPenjualans()->create([
            "ProdukID" => $produk->ProdukID,
            "JumlahProduk" => 2,
            "Subtotal" => $produk->Harga * 2
        ]);
        $detail2 = $penjualan->detailPenjualans()->create([
            "ProdukID" => $produk->ProdukID,
            "JumlahProduk" => 3,
            "Subtotal" => $produk->Harga * 3
        ]);
        $penjualan->TotalHarga = $penjualan->TotalHarga + $detail->Subtotal;
        $penjualan->TotalHarga = $penjualan->TotalHarga + $detail2->Subtotal;
        $penjualan->save();
        $produk->Stok = $produk->Stok - $detail->JumlahProduk;
        $produk->Stok = $produk->Stok - $detail2->JumlahProduk;
        $produk->save();
    }
}
