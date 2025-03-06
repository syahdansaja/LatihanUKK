import React from "react";
import { Link } from "@inertiajs/react";
export default function Navbar(props) {
    return (
        <>
        <nav className={`flex justify-between px-8 py-4 gap-4 bg-sky-600 ${props.className}`}>
          <h1 className="gap-2 text-2xl font-extrabold my-auto">Aplikasi Penjualan</h1>
          <ul className="flex gap-2 justify-start">
              <li className="px-4 py-2 text-lg hover:[text-shadow:_0_2px_4px_rgb(99_102_241_/_0.8)] hover:text-sky-400 rounded-xl">
                <Link href="/produk" className="block">Produk</Link>
              </li>
              <li className="px-4 py-2 text-lg hover:[text-shadow:_0_2px_4px_rgb(99_102_241_/_0.8)] hover:text-sky-400 rounded-xl">
                <Link href="/pelanggan" className="block">Pelanggan</Link>
              </li>
              <li className="px-4 py-2 text-lg hover:[text-shadow:_0_2px_4px_rgb(99_102_241_/_0.8)] hover:text-sky-400 rounded-xl">
                <Link href="/penjualan" className="block">Penjualan</Link>
              </li>
          </ul>
        </nav>
      </>
    )
}
