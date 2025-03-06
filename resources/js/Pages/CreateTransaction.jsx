import { useForm, usePage } from "@inertiajs/react";
import Navbar from "../Layouts/Navbar";
import React, { use } from "react"
import { useState, useEffect } from "react"

export default function CreateTransaction() {
    const customers = usePage().props.customers;
    const products = usePage().props.products;
    const [totalHarga, setTotalHarga] = useState(0);


    const { data, setData, message, errors, post, put, delete: destroy } = useForm({
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
    const handleSubmit = (e) => {
        e.preventDefault();
        post("/penjualan/create", {
            onSuccess: () => {
                alert("Input transaksi berhasil")
            }
        })
    }
    const cancelTransaction = () => {

    }
    const handleDateSelect = (e) => {
        setData({
            ...data,
            tanggalPembelian: e.target.value
        })
        console.log(data)
    }
    const handleSelectChange = (e) => {
        setData(data.PelangganID = e.target.value)
    }
    const handleInputChange = (index, field, value) => {
        const newItems = [...data.detailtransaksi];
        newItems[index][field] = value;

        if (field == "ProdukID") {
            const selectedProducts = products.find((product) => product.ProdukID == value);
            if (selectedProducts) {
                newItems[index].Subtotal = selectedProducts.Harga * newItems[index].jumlahproduk;
            }
        }

        if (field == "jumlahproduk") {
            const selectedProducts = products.find((product) => product.ProdukID == newItems[index].ProdukID);
            if (selectedProducts) {
                newItems[index].Subtotal = selectedProducts.Harga * value;
            }
        }
        setData("detailtransaksi", newItems);
    }
    useEffect(() => {
        const totalSubtotal = data.detailtransaksi.map((item) => item.Subtotal).reduce((acc, cur) => acc + cur, 0);
        setTotalHarga(totalSubtotal);
    }, [handleInputChange]);
    const handleAddRow = () => {
        setData("detailtransaksi", [...data.detailtransaksi, { ProdukID: "", jumlahproduk: 1, Subtotal: 0 }]);
    }
    const handleDeleteRow = (index) => {
        const currentItems = data.detailtransaksi.filter((_, i) => i !== index); //belum paham code ini
        setData("detailtransaksi", currentItems);
    }
    return (
        <>
            <Navbar />
            <section className="h-[90vh] px-10 py-12">
                <h1 className="text-5xl font-extrabold">Form Tambah Transaksi</h1>
                <div className="flex justify-between">
                    <div>
                        <select className="rounded shadow-lg px-3 py-1.5 mt-5 active:shadow-blue-400 border border-black text-lg font-medium" value={data.PelangganID} onChange={handleSelectChange}>
                            <option value={0}>-- Pilih pelanggan --</option>
                            {customers && customers.map((pelanggan, index) => (
                                <option key={pelanggan.PelangganID} value={pelanggan.PelangganID}>{pelanggan.NamaPelanggan}</option>
                            ))}
                        </select>
                        <input type="date" name="tanggalPembelian" className="ml-4 rounded shadow-lg px-3 py-1.5 mt-5 active:shadow-blue-400 border border-black text-lg font-medium" id="" onChange={handleDateSelect} value={data.tanggalPembelian} />
                        <h1 className="text-red-600 text-3xl font-light">Total Harga = Rp.{totalHarga},00</h1>
                    </div>
                    <div>
                        <button className="btn bg-sky-400" onClick={(e) => handleSubmit(e)}>SUBMIT</button> <br/>
                        <span className="text-red-500 text-md font-light">{errors.message && errors.message}{errors.messages && JSON.stringify(errors.messages)}</span>
                    </div>
                </div>
                <hr className="border-black border-2 mt-10" ></hr>
                <h1 className="text-2xl font-semibold text-shadow ml-5 mt-2">Pilih Produk</h1>
                <table className="table-fixed rounded-xl w-full shadow-lg">
                    <thead className="bg-teal-500">
                        <tr className="w-full gap-2">
                            <th className="py-1 px-2 text-xl font-bold text-center max-w-10 w-10    " style={{ borderRadius: "5px 0px 0px 0px" }}>No</th>
                            <th className="py-1 px-3 text-lg font-semibold text-center" >Nama Produk</th>
                            <th className="py-1 px-3 text-lg font-semibold text-center">Jumlah</th>
                            <th className="py-1 px-3 text-lg font-semibold text-center">Total Harga</th>
                            <th className="py-1 px-3 text-lg font-semibold text-center" style={{ borderRadius: "0px 5px 0px 0px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody id="table-details">
                        {data.detailtransaksi.map((value, index) => (
                            <tr key={index}>
                                <td className="text-lg font-bold  text-center">{index + 1}</td>
                                <td style={{ justifyContent: "center", justifyItems: "center", alignContent: "center", alignItems: "center" }}>
                                    <select value={value.ProdukID} onChange={(e) => handleInputChange(index, "ProdukID", e.target.value)} className="px-2 py-1,5 text-lg font-semibold">
                                        <option className="shadow-lg shadow-gray-600 text-lg font-semibold rounded-xl" value={''}>--- Pilih Produk ---</option>
                                        {products.map((value) => (
                                            <option key={value.ProdukID} className="shadow-lg shadow-gray-600 text-lg font-semibold rounded-xl" value={value.ProdukID}>{value.NamaProduk}</option>
                                        ))}
                                    </select>
                                    <span className="text-red-500 ml-1 text-sm font-extralight">{errors?.[`detailtransaksi.${index}.ProdukID`] && "Pilih Produk"}</span>
                                </td>
                                <td className="px-5" style={{ alignContent: "center", justifyItems: "center" }}>
                                    <input type="number" min="1" className="text-md font-semibold border border-black rounded w-[30%] px-2" required value={value.jumlahproduk} onChange={(e) => handleInputChange(index, "jumlahproduk", e.target.value)}></input>
                                    <span className="text-red-500 text-sm font-extralight ml-2">{errors?.[`detailtransaksi.${index}.jumlahproduk`] && "jumlah barang tidak tersedia"}</span>
                                </td>
                                <td>Rp.{value.Subtotal},00</td>
                                <td className="flex justify-center">
                                    <button className="rounded-xl cursor-pointer px-2 py-1.5 bg-red-600 text-lg font-bold shadow-2xl" onClick={() => handleDeleteRow(index)}>HAPUS</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-start py-3 px-14">
                    <button className="btn bg-green-500 hover:bg-green-700" onClick={handleAddRow}>TAMBAH PRODUK</button>
                </div>
            </section>
        </>
    )
}
