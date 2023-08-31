"use client"

import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';

export default function Subscription({ id, className }: { id: string, className: string }) {
    const [subscriptions, setSubscriptions] = useState<any[]>([]);

    useEffect(() => {
        async function getSubscription() {
            const response = await fetch(`http://localhost:3004/keacare/api/careseeker/getSubcription?email=${sessionStorage.getItem("email")}`);
            const data = await response.json();
            setSubscriptions(data);
        }
        getSubscription();
    }, [])

    return (
        <div id={id} className={className}>
            <h1 className='font-semibold text-2xl mb-4'>Your Subscriptions</h1>
            <div className='flex flex-col gap-2 max-h-[500px] overflow-y-auto'>
                <div className='grid grid-cols-[0.1fr_0.5fr_0.1fr_0.3fr] sticky top-0 bg-white'>
                    <p>Sl No.</p>
                    <p>Subscription Type</p>
                    <p>Price</p>
                    <p>Purchased On</p>
                </div>
                {
                    subscriptions?.map((subscription: any, index: number) => {
                        return (
                            <div key={subscription.id} className='grid grid-cols-[0.1fr_0.5fr_0.1fr_0.3fr]'>
                                <p>{index + 1}. </p>
                                <p>{subscription.type}</p>
                                <p className='font-semibold'>${subscription.price}</p>
                                <p>{dayjs(subscription.purchasedOn).format("DD/MM/YYYY")}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
