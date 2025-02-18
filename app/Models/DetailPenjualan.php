<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailPenjualan extends Model
{
    protected $table = "detail_penjualans";
    protected $id = "DetailID";
    public $timestamps = false;
    protected $fillable = [
        "PenjualanID",
        "ProdukID",
        "JumlahProduk",
        "Subtotal"
    ];
    public function produk () {
        return $this->belongsTo(Produk::class, "ProdukID");
    }
    public function penjualan () {
        return $this->belongsTo(Penjualan::class,"PenjualanID");
    }
}
