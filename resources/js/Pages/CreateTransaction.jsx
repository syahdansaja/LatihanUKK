import { useForm, usePage } from "@inertiajs/react";
import Navbar from "../Layouts/Navbar";
import React from "react";
import {useState} from "react"

export default function CreateTransaction () {
    const customers = usePage().props.customers;
    const products = usePage().props.products;
    const {data, setData, message, errors , post , put , delete : destroy} = useForm({
        PelangganID: 0,
        detailtransaksi: []
    });
    const [totalHarga, setTotalHarga] = useState(0);
    const handleSelectChange = (e) => {
        setData({
            PelangganID: e.target.value
        })
    }
    const detailTransactionDetails = (e) => {
        const {name , value} = e.target;
        data.detailtransaksi.push({
        })
    }
    const handleAddRow = () => {
        return (
            <tr>

            </tr>
        )
    }
    return (
        <>
         <Navbar />
         <section className="h-[90vh] px-10 py-12">
            <h1 className="text-5xl font-extrabold">Form Tambah Transaksi</h1>
            <select className="rounded shadow-lg px-3 py-1.5 mt-5 active:shadow-blue-400 border border-black text-lg font-medium" value={data.PelangganID} onChange={handleSelectChange}>
                <option value={0}>-- Pilih pelanggan --</option>
                {customers && customers.map((pelanggan, index) => (
                    <option key={pelanggan.PelangganID} value={pelanggan.PelangganID}>{pelanggan.NamaPelanggan}</option>
                ))}
            </select>
            <hr className="border-black border-2 mt-10" ></hr>
            <h1 className="text-2xl font-semibold text-shadow ml-5 mt-2">Pilih Produk</h1>
            <table className="table-fixed rounded-xl w-full shadow-lg">
                <thead className="bg-teal-500">
                    <tr className="w-full gap-2">
                        <th className="py-1 px-2 text-xl font-bold text-center max-w-10 w-10    " style={{borderRadius: "5px 0px 0px 0px"}}>No</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center" >Nama Produk</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center">Jumlah</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center">Total Harga</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center" style={{ borderRadius: "0px 5px 0px 0px"}}>Action</th>
                    </tr>
                </thead>
                <tbody className>

                </tbody>
            </table>
         </section>
        </>
    )
}
