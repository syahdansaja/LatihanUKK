import { useForm, usePage } from "@inertiajs/react";
import Navbar from "../Layouts/Navbar";
import React from "react"
import { useState, useEffect } from "react"

export default function CreateTransaction () {
    const customers = usePage().props.customers;
    const products = usePage().props.products;
    const {data, setData, message, errors , post , put , delete : destroy} = useForm({
        PelangganID: 0,
        tanggalPembelian: (() => {
            const today = new Date();
            let yyyy = today.getFullYear();
            let MM = today.getMonth() + 1;
            let dd = today.getDate();

            MM = MM < 10 ? `0${MM}` : MM;
            dd = dd < 10 ? `0${dd}` : dd;

            const formattedToday = `${yyyy}-${MM}-${dd}`;
            return formattedToday;
        })(),
        detailtransaksi: []
    });
    const handleDateSelect = (e) => {
        // setData(data.tanggalPembelian = e.target.value)
        setData({
            ...data,
            tanggalPembelian: e.target.value
        })
        console.log(data)
    }
    const [totalHarga, setTotalHarga] = useState(0);
    const handleSelectChange = (e) => {
        setData(data.PelangganID = e.target.value)
    }
    const detailTransactionDetails = (e) => {
        const {name , value} = e.target;
        // setData({
        //     ...data,
        //     detailtransaksi.push
        // })
    }
    const handleAddRow = () => {
        const table = document.getElementById("table-details");
        const row = table.insertRow();

        row.innerHTML = `
          <td style="justify-items: center; text-align: center;">No</td>
          <td style="justify-items:center; text-align:center;">
             <input style="" />
          </td>
        `
    }
    const handleDeleteRow = () => {
        document.getElementById
    }
    // const [searchItems , setSearchItems] = useState("");
    // const [filteredProducts , setFilteredProducts] = useState(products);
    // const handleSearchInput = () => {
    //     const searchTerm = e.target.value;
    //     setSearchItems(searchTerm);

    //     setFilteredProducts(products.filter((product) => {
    //         return product.NamaProduk.toLowerCase().includes(search)
    //     }))
    // }
    return (
        <>
         <Navbar />
         <section className="h-[90vh] px-10 py-12">
            <h1 className="text-5xl font-extrabold">Form Tambah Transaksi</h1>
            <div className="flex justify-start">
                <select className="rounded shadow-lg px-3 py-1.5 mt-5 active:shadow-blue-400 border border-black text-lg font-medium" value={data.PelangganID} onChange={handleSelectChange}>
                    <option value={0}>-- Pilih pelanggan --</option>
                    {customers && customers.map((pelanggan, index) => (
                        <option key={pelanggan.PelangganID} value={pelanggan.PelangganID}>{pelanggan.NamaPelanggan}</option>
                    ))}
                </select>
                <input type="date" name="tanggalPembelian" className="ml-4 rounded shadow-lg px-3 py-1.5 mt-5 active:shadow-blue-400 border border-black text-lg font-medium" id="" onChange={handleDateSelect} value={data.tanggalPembelian}/>
            </div>
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
                <tbody id="table-details">

                </tbody>

            </table>
            <div className="flex justify-start py-3 px-14">
                <button className="btn bg-green-500 hover:bg-green-700" onClick={handleAddRow}>TAMBAH PRODUK</button>
            </div>
         </section>
        </>
    )
}
