import { usePage } from "@inertiajs/react";
import React from "react";

export default function DetailTransaction () {
    const transaction = usePage().props.transaction;
    const detailtransactions = transaction.detail_penjualans;
    console.log(transaction);
    return (
        <>
          <section className="h-[90vh] py-16 px-10">
            <div className="my-2 px-3">
                <span className="text-3xl font-bold">Detail Penjualan #{transaction.PenjualanID}</span>
            </div>
            <hr className="my-1 w-full border-2 border-gray-800"/>
            <div className="my-2 px-3">
                <span className="text-lg font-bold">Nama Pelanggan :  {transaction.pelanggan.NamaPelanggan}</span>
            </div>
            <div className="my-2 px-3">
                <span className="text-lg font-bold">Tanggal Transaksi : {transaction.TanggalPenjualan}</span>
            </div>
            <div className="my-2 px-3">
                <span className="text-lg font-bold">Total Harga : Rp.{transaction.TotalHarga},00</span>
            </div>
            <div className="my-2 px-3">
                <span className="text-xl font-extrabold">Barang yang di beli</span>
            </div>
          </section>
        </>
    )
}
