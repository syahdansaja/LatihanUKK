import { Link, router, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import Navbar from "../Layouts/Navbar";
export default function TransactionPage () {
    const transactions = usePage().props.transactions;
    return(
        <>
          <Navbar />
          <section className="h-[90vh] px-10 py-12">
            <h1 className="text-4xl font-extrabold [text-shadow:_0_2px_4px_rgb(99_102_241_/_0.8)] mb-5">Daftar Transaksi</h1>
            <hr className="border-black border mb-2"></hr>
            <div className="mb-3 mt-2 flex justify-start px-6">
                <Link className="btn bg-green-500 text-2xl font-bold" href="/penjualan/create">Tambah Transaksi</Link>
            </div>
            <div className="w-[100%] flex justify-center">
            <table className="table-fixed rounded-xl w-full shadow-lg">
                <thead className="bg-teal-500">
                    <tr className="w-full gap-2">
                        <th className="py-1 px-2 text-xl font-bold text-center max-w-10 w-10    " style={{borderRadius: "5px 0px 0px 0px"}}>No</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center" >Tanggal Transaksi</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center">Nama Pelanggan</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center">Total Harga</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center" style={{ borderRadius: "0px 5px 0px 0px"}}>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions ? transactions.map((transaksi, index) => (
                        <tr key={transaksi.PenjualanID} className="border-b">
                            <td className="text-center max-w-10 w-10">{index + 1}</td>
                            <td className="px-1 py-2 text-center">{transaksi.TanggalPenjualan}</td>
                            <td className="px-1 py-2 text-center">{transaksi.pelanggan.NamaPelanggan}</td>
                            <td className="px-3 py-2 text-center">Rp. {transaksi.TotalHarga},00</td>
                            <td className="flex justify-center gap-2 py-2">
                                <Link className="rounded-md px-4 py-2 shadow-lg text-sm font-semibold bg-yellow-500" href={"/penjualan/" + transaksi.PenjualanID + "/details"}>DETAILS</Link>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td className="text-center text-2xl">Belum ada Pelanggan</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
            {/* {transactions && JSON.stringify(transactions)} */}
          </section>
        </>
    )
}
