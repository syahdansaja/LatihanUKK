import { usePage, useForm } from "@inertiajs/react"
import { useState } from "react";
import React from "react";
import Navbar from "../Layouts/Navbar";

export default function Customer () {
    const customers = usePage().props.customers;
    const [showForm, setShowForm] = useState(false);
    const [isEdit , setIsEdit] = useState(false);
    const {data, setData, errors, message, post, put, delete: destroy} = useForm({
        PelangganID: null,
        NamaPelanggan: "",
        Alamat: "",
        NomorTelepon: "",
    })
    const handleDataChanges = (e) => {
        const {name , value} = e.target;
        setData({
            ...data,
            [name]:value
        })
    }
    const handleEdit = (value) => {
        setIsEdit(true);
        setShowForm(true);
        setData({
            PelangganID: value.PelangganID,
            NamaPelanggan: value.NamaPelanggan,
            Alamat: value.Alamat,
            NomorTelepon: value.NomorTelepon
        })
    }
    const clearForm = () => {
        setData({
            PelangganID: null,
            NamaPelanggan: "",
            Alamat: "",
            NomorTelepon: ""
        })
        setIsEdit(false);
        setShowForm(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isEdit == true) {
            console.log(data.PelangganID)
            put("/pelanggan/" + data.PelangganID ,{
                onSuccess: () => {
                    alert("Edit data berhasil")
                    clearForm();
                }
            });
        }
        else {
            post("/pelanggan", {
                onSuccess: () => {
                    alert("Input data berhasil")
                    clearForm();
                }
            })
        }
    }
    const handleDelete = (id) => {
        confirm("Apakah anda yakin ingin menghapus data ini ?");
        destroy("/pelanggan/" + id, {
            onSuccess: () => {
                alert("data berhasil di hapus")
            }
        })
    }
    return (
        <>
          <Navbar></Navbar>
          <section className="h-[90vh] px-10 py-12">
            <h1 className="text-4xl font-extrabold [text-shadow:_0_2px_4px_rgb(99_102_241_/_0.8)] mb-5">Daftar Pelanggan</h1>
            <hr className="border-black border mb-2"></hr>
            <div className="mb-3 mt-2 flex justify-start px-6">
                <button className="btn bg-green-500 text-2xl font-bold" onClick={() => {
                    setShowForm(!showForm);
                    setIsEdit(false);
                }}>Tambah Data Pelanggan</button>
            </div>
            <div className="w-[100%] flex justify-center">
            <table className="table-fixed rounded-xl w-full shadow-lg">
                <thead className="bg-teal-500">
                    <tr className="w-full gap-2">
                        <th className="py-1 px-2 text-xl font-bold text-center max-w-10 w-10    " style={{borderRadius: "5px 0px 0px 0px"}}>No</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center" >Nama Pelanggan</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center">Nomor Telepon</th>
                        <th className="py-1 px-3 text-lg font-semibold text-center" style={{ borderRadius: "0px 5px 0px 0px"}}>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {customers ? customers.map((customer, index) => (
                        <tr key={customer.PelangganID} className="border-b">
                            <td className="text-center max-w-10 w-10">{index + 1}</td>
                            <td className="px-1 py-2 text-center">{customer.NamaPelanggan}</td>
                            <td className="px-1 py-2 text-center">{customer.NomorTelepon}</td>
                            <td className="flex justify-center gap-2 py-2">
                                <button className="btn bg-yellow-500 px-2 py-1 cursor-pointer" onClick={() => {
                                    handleEdit(customer);
                                }}>EDIT</button>
                                <button className="btn bg-red-600 px-2 py-1 cursor-pointer" onClick={() => {
                                    handleDelete(customer.PelangganID)
                                }}>HAPUS</button>
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
            {showForm && (
                <div className="fixed inset-0 mx-auto my-auto bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-sky-50 px-5 py-7 rounded-2xl sm:w-[90%] md:w-[70%] xl:w-[40%] lg:w-[50%]">
                        <div>
                            <h1 className="text-3xl text-black font-extrabold text-center">{isEdit ? "Edit Data" : "Create Data"}</h1>
                        </div>
                        <hr className="border border-black mt-14 mb-16" />
                        <div className="w-full px-4 justify-center py-2 my-2">
                            <input className="rounded w-full px-4 py-2 border-2 border-gray-600 focus:border-sky-600" type="text" placeholder="Nama Pelanggan" value={data.NamaPelanggan} name="NamaPelanggan" onChange={handleDataChanges}>
                            </input>
                        </div>
                        <div className="w-full px-4 justify-center py-2 my-2">
                            <textarea className="rounded w-full px-4 py-2 border-2 border-gray-600 focus:border-sky-600" placeholder="Alamat" value={data.Alamat} name="Alamat" onChange={handleDataChanges}>
                            </textarea>
                        </div>
                        <div className="w-full px-4 justify-center py-2 my-2">
                            <input className="rounded w-full px-4 py-2 border-2 border-gray-600 focus:border-sky-600" type="text" maxLength="15" placeholder="Nomor Telepon" value={data.NomorTelepon} name="NomorTelepon" onChange={handleDataChanges}>
                            </input>
                        </div>
                        <div className="w-full flex px-16 justify-end gap-2">
                            <button className="btn bg-red-600 cursor-pointer" onClick={clearForm}>CANCEL</button>
                            <button className="btn bg-sky-600 cursor-pointer" onClick={handleSubmit}>SUBMIT</button>
                        </div>
                    </div>
                </div>
            )}
          </section>
        </>
    )
}
