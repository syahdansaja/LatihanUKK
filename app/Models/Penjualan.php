<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penjualan extends Model
{
    protected $table = "penjualans";
    protected $id = "PenjualanID";
    public $timestamps = false;
    protected $fillable = [
        "TanggalPenjualan",
        "TotalHarga",
        "PelangganID"
    ];
    public function detailPenjualans() {
        return $this->hasMany(DetailPenjualan::class, "PenjualanID");
    }
    public function pelanggan () {
        return $this->belongsTo(Pelanggan::class, "PelangganID");
    }
}
