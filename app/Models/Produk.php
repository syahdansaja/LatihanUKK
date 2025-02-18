<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    protected $table = "produks";
    protected $primaryKey = "ProdukID";
    public $timestamps = false;
    protected $fillable = [
        "NamaProduk",
        "Harga",
        "Stok"
    ];
    public function detailPenjualans() {
        return $this->hasMany(DetailPenjualan::class, "ProdukID");
    }
}
