## hati hati dengan validasi object on array di dalam request valdiation karena akan menyebabkan database overhead (terlalu sering tektok dengan database)



ada suatu case ,apabila ada validasi input request itu harus dicocokan atau di komparasikan dengan data yang ada di dalam database , tetapi request input yang di maksud itu bertipe multiple object (object di dalam array) dengan keterangan lanjut sebagai berikut beserta dengan validation specs

```
// request body specs for transaction
@post("/penjualan/create")
{
    "ProdukID": 1,                      #is required , integer , and exist in database
    "TanggalPenjualan": "dd-MM-yyyy"    #is required , must be format of following
    "detailtransaksi": [
        {
            "ProdukID": 1,              #is required, integer , and exist in database
            "jumlahbarang": 1           #less or equal than tb_produk.stok
        },
        {
            "ProdukID": 2, 
            "jumlahbarang": 1
        }
    ]
}
```

nah biasanya kita akan menyelasikan validasi dengan code sebagai berikut

```
  public function createTransaction(Request $req) {
    $validated = $req->validate([
        "ProdukID" => "required|integer|exist:tb_pelanggans,ProdukID",
        "tanggalpenjualan" => "required|date"
        "detailtransaksi" => "required|array"
        "detailtransaksi.*.ProdukID" => "required|numeric|exist:tb_produks,ProdukID"
    ])
  }
```

tetapi dengan solusi di atas akan beresiko database overhead(atau dalam kata lain sering tektokkan dengan database yang nanti berat ke performa aplikasi)

karena kita memvalidasi setiap 1 field di dalam object detailtransaksi yang di dalam array / "detailtransaksi.*.ProdukID" dengan 1 query ke database, bayangkan jika detail transaksi yang di kirim client berjumlah 1000
