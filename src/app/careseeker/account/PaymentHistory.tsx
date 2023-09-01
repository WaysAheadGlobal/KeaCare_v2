"use client"

import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';

export default function PaymentHistory({ id, className }: { id: string, className: string }) {
    const [paymentHistory, setPaymentHistory] = useState<any[]>([]);

    useEffect(() => {
        async function getPaymentHistory() {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/paymentHistory?email=${sessionStorage.getItem("email")}`);
            const data = await response.json();
            setPaymentHistory(data);
        }
        getPaymentHistory();
    }, [])

    return (
        <div id={id} className={className}>
            <h1 className='font-semibold text-2xl mb-4'>Your Payment History</h1>
            <div className='flex flex-col gap-2 max-h-[500px] overflow-y-auto'>
                <div className='grid grid-cols-[0.1fr_0.4fr_0.2fr_0.3fr] sticky top-0 bg-white'>
                    <p>Sl No.</p>
                    <p>Description</p>
                    <p>Price</p>
                    <p>Purchased On</p>
                </div>
                {
                    paymentHistory?.map((history: any, index: number) => {
                        return (
                            <div key={history.id} className='grid grid-cols-[0.1fr_0.4fr_0.2fr_0.3fr] gap-1'>
                                <p>{index + 1}. </p>
                                <p>{history.description}</p>
                                <p className='font-semibold'>${history.price}</p>
                                <p>{dayjs(history.purchasedOn).format("DD/MM/YYYY")}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
