import { usePage, Link } from "@inertiajs/react";
import React, { useRef } from "react";
import Navbar from "../Layouts/Navbar";

export default function DetailTransaction () {
    const transaction = usePage().props.transaction;
    const detailtransactions = transaction.detail_penjualans;
    return (
        <>
        <title>Detail Transaksi</title>
        <Navbar className="no-print" />
          <section className="h-[90vh] py-14 px-10">
            <div className="my-2 px-3 flex justify-between">
                <span className="text-3xl font-bold">Detail Penjualan #{transaction.PenjualanID}</span>
                <Link href={"/penjualan/" + transaction.PenjualanID + "/print"} className="btn bg-sky-500">PRINT STRUK</Link>
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
            <table className="table-fixed rounded-xl w-full shadow-lg">
                <thead className="bg-teal-500">
                    <tr className="w-full gap-2">
                        <th className="py-1 px-2 text-xl font-bold text-center max-w-10 w-10    " style={{borderRadius: "5px 0px 0px 0px"}}>No</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center" >Nama Barang</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center" >Harga Satuan</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center">Jumlah barang</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center">Sub total</th>
                    </tr>
                </thead>
                <tbody>
                    {detailtransactions && detailtransactions.map((detail, index) => (
                        <tr key={index}>
                            <td className="text-lg text-center">{index + 1}</td>
                            <td className="text-lg text-center">{detail.produk.NamaProduk}</td>
                            <td className="text-lg text-center">Rp.{detail.produk.Harga},00</td>
                            <td className="text-lg text-center">{detail.JumlahProduk}</td>
                            <td className="text-lg text-center">Rp.{detail.Subtotal},00</td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </section>
        </>
    )
}
