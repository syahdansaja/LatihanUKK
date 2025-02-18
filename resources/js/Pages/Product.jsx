import { usePage, useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import Navbar from "../Layouts/Navbar";
import { useState } from "react";

export default function Product () {
    const products = usePage().props.products;
    const [showForm,setShowForm] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    const {data, setData, post, processing, errors, put , delete: destroy} = useForm({
        id: null,
        NamaProduk: "",
        Harga: "",
        Stok: ""
    })
    const handleDataChanges = (e) => {
        const {name, value} = e.target;

        setData({
            ...data,
            [name]: value
        });
    }
    const handleEdit = (value) => {
        setShowForm(true);
        setIsEdit(true);
        setData({
            id: value.ProdukID,
            NamaProduk: value.NamaProduk,
            Harga: value.Harga,
            Stok: value.Stok
        })
    }
    const clearForm = () => {
        setIsEdit(false);
        setShowForm(false);
        setData({
            id: null,
            NamaProduk: "",
            Harga: "",
            Stok: ""
        });
    }
    const handleSubmit = (e) => {
        console.log(isEdit);
        console.log(data);
        if(isEdit === true) {
            put("/produk/" + data.id , {
                onSuccess: () => {
                    alert("Update data berhasil");
                    setShowForm(false);
                    setIsEdit(false);
                    clearForm();
                },
                onError: () => {
                    alert("Update data gagal");
                    clearForm();
                }
            })
        } else {
            console.log(data);
            post("/produk", {
                onSuccess: () => {
                    alert("Input data berhasil");
                    setIsEdit(false);
                    setShowForm(false);
                    clearForm();
                }
            });
        }
    }
    const handleDelete = (id) => {
        console.log(id);
        destroy("/produk/" + id, {
            onSuccess: () => {
                alert("delete data berhasil");
            },
            onError: () => {
                alert("delete data gagal");
            }
        })
    }
    return (
        <>
         <Navbar></Navbar>
         <section className="h-[90vh] px-10 py-12">
            <h1 className="text-4xl font-extrabold [text-shadow:_0_2px_4px_rgb(99_102_241_/_0.8)] mb-5">Daftar Produk</h1>
            <hr className="border-black border mb-2"></hr>
            <div className="mb-3 mt-2 flex justify-start px-6">
                <button className="btn bg-green-500 text-2xl font-bold" onClick={() => {
                    setShowForm(!showForm);
                    setIsEdit(false);
                }}>Tambah Produk</button>
            </div>
            <div className="w-[100%] flex justify-center">
            <table className="table-fixed rounded-xl w-full shadow-lg">
                <thead className="bg-teal-500">
                    <tr className="w-full gap-2">
                        <th className="py-1 px-2 text-xl font-bold text-center max-w-10 w-10    " style={{borderRadius: "5px 0px 0px 0px"}}>No</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center" >Nama Produk</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center">Harga Produk</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center">Stok</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center" style={{ borderRadius: "0px 5px 0px 0px"}}>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {products ? products.map((produk, index) => (
                        <tr key={produk.ProdukID} className="border-b">
                            <td className="text-center max-w-10 w-10">{index + 1}</td>
                            <td className="px-1 py-2 text-center">{produk.NamaProduk}</td>
                            <td className="px-1 py-2 text-center">{produk.Harga}</td>
                            <td className="px-1 py-2 text-center">{produk.Stok}</td>
                            <td className="flex justify-center gap-2 py-2">
                                <button className="btn bg-yellow-500 px-2 py-1 cursor-pointer" onClick={() => {
                                    handleEdit(produk);
                                }}>EDIT</button>
                                <button className="btn bg-red-600 px-2 py-1 cursor-pointer" onClick={() => {
                                    handleDelete(produk.ProdukID)
                                }}>HAPUS</button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td className="text-center text-2xl">Produk kosong</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
            {showForm && (
                <div className="fixed inset-0 mx-auto my-auto bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-sky-50 px-5 py-7 rounded-2xl sm:w-[90%] md:w-[70%] xl:w-[40%] lg:w-[50%]">
                        <div>
                            <h1 className="text-3xl text-black font-extrabold text-center">{isEdit ? "Edit Data" : "Create Data"}</h1>
                        </div>
                        <hr className="border border-black mt-14 mb-16" />
                        <div className="w-full px-4 justify-center py-2 my-2">
                            <input className="rounded w-full px-4 py-2 border-2 border-gray-600 focus:border-sky-600" type="text" placeholder="Nama Produk" value={data.NamaProduk} name="NamaProduk" onChange={handleDataChanges}>
                            </input>
                        </div>
                        <div className="w-full px-4 justify-center py-2 my-2">
                            <input className="rounded w-full px-4 py-2 border-2 border-gray-600 focus:border-sky-600" type="number" placeholder="Harga Produk" value={data.Harga} name="Harga" onChange={handleDataChanges}>
                            </input>
                        </div>
                        <div className="w-full px-4 justify-center py-2 my-2">
                            <input className="rounded w-full px-4 py-2 border-2 border-gray-600 focus:border-sky-600" type="number" placeholder="Jumlah Stok" value={data.Stok} name="Stok" onChange={handleDataChanges}>
                            </input>
                        </div>
                        <div className="w-full flex px-16 justify-end gap-2">
                            <button className="btn bg-red-600 cursor-pointer" onClick={() => clearForm()}>CANCEL</button>
                            <button className="btn bg-sky-600 cursor-pointer" onClick={() => handleSubmit()}>SUBMIT</button>
                        </div>
                    </div>
                </div>
            )}
          </section>
        </>
    )
}
