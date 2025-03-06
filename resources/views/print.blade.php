<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Print Transaction</title>
    @vite('resources/css/app.css')
</head>

<body>
    <section className="h-[90vh] py-14 px-10">
        <div className="my-2 px-3 flex justify-between">
            <span className="text-3xl font-bold text-center">Print Struk Penjualan #{{ $transaction->PenjualanID }}</span>
        </div>
        <hr className="my-1 w-full border-2 border-gray-800" />
        <div className="my-2 px-3">
            <span className="text-lg font-bold">Nama Pelanggan : {{ $transaction->pelanggan->NamaPelanggan }}</span>
        </div>
        <div className="my-2 px-3">
            <span className="text-lg font-bold">Tanggal Transaksi : {{ $transaction->TanggalPenjualan }}</span>
        </div>
        <div className="my-2 px-3">
            <span className="text-lg font-bold">Total Harga : Rp.{{ $transaction->TotalHarga }},00</span>
        </div>
        <div className="my-2 px-3">
            <span className="text-xl font-extrabold">Barang yang di beli</span>
        </div>
        <table className="table-fixed rounded-xl w-full shadow-lg">
            <thead className="bg-teal-500">
                <tr className="w-full gap-2">
                    <th className="py-1 px-2 text-xl font-bold text-center max-w-10 w-10"
                        style="border-radius: 5px 0px 0px 5px">No</th>
                    <th className="py-1 px-3 text-lg font-semibold text-center">Nama Barang</th>
                    <th className="py-1 px-3 text-lg font-semibold text-center">Harga Satuan</th>
                    <th className="py-1 px-3 text-lg font-semibold text-center">Jumlah barang</th>
                    <th className="py-1 px-3 text-lg font-semibold text-center">Sub total</th>
                </tr>
            </thead>
            <tbody>
                {{-- @foreach ($transaction->detail_penjualans as $detail)
                    <tr key={index}>
                    <td className="text-lg text-center">{{ $iteration }}</td>
                    <td className="text-lg text-center">{detail.p.NamaProduk}</td>
                    <td className="text-lg text-center">Rp.{detail.produk.Harga},00</td>
                    <td className="text-lg text-center">{detail.JumlahProduk}</td>
                    <td className="text-lg text-center">Rp.{detail.Subtotal},00</td>
                </tr>
                @endforeach --}}
                {{-- {detailtransactions && detailtransactions.map((detail, index) => (
                <tr key={index}>
                    <td className="text-lg text-center">{index + 1}</td>
                    <td className="text-lg text-center">{detail.produk.NamaProduk}</td>
                    <td className="text-lg text-center">Rp.{detail.produk.Harga},00</td>
                    <td className="text-lg text-center">{detail.JumlahProduk}</td>
                    <td className="text-lg text-center">Rp.{detail.Subtotal},00</td>
                </tr>
                ))} --}}
            </tbody>
        </table>
    </section>
    <script>
        window.print();
    </script>
</body>

</html>
