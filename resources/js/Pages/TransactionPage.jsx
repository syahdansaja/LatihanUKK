import { usePage } from "@inertiajs/react";
import React from "react";

export default function TransactionPage () {
    const transactions = usePage().props.transactions;
    return(
        <>
          {transactions && JSON.stringify(transactions)}
        </>
    )
}
