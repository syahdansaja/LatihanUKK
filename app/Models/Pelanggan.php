<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pelanggan extends Model
{
    protected $table = "pelanggans";
    protected $primaryKey =  "PelangganID";
    public $timestamps = false;
    protected $fillable = [
        "NamaPelanggan",
        "Alamat",
        "NomorTelepon"
    ];
    public function penjualans () {
        return $this->hasMany(Penjualan::class, "PelangganID");
    }
}
