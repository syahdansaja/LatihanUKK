import React from "react";
import Navbar from "../Layouts/Navbar";

export default function Home () {
    return (
        <>
         <Navbar></Navbar>
         <section className="flex justify-center h-[90vh]" style={{alignItems: "center"}}>
            <h1 className="text-3xl font-extrabold">Selamat Datang</h1>
         </section>
        </>
    )
}
