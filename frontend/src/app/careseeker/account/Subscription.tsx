"use client"

import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { useCookies } from '@/Hooks/useCookies';

export default function Subscription({ id, className }: { id: string, className: string }) {
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const cookies = useCookies();

    useEffect(() => {
        async function getSubscription() {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/getSubcription?email=${sessionStorage.getItem("email")}`, {
                headers: {
                    "Authorization": `${cookies.getCookie("token")}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setSubscriptions(data);
        }
        getSubscription();
    }, [])

    return (
        <div id={id} className={className}>
            <h1 className='font-semibold text-2xl mb-4'>Your Subscriptions</h1>
            <div className='flex flex-col gap-2 max-h-[500px] w-full overflow-y-auto'>
                <div className='grid grid-cols-[0.1fr_0.4fr_0.2fr_0.3fr] sticky top-0 bg-white'>
                    <p>Sl No.</p>
                    <p>Subscription Type</p>
                    <p>Price</p>
                    <p>Purchased On</p>
                </div>
                {
                    subscriptions?.map((subscription: any, index: number) => {
                        return (
                            <div key={subscription.id} className='grid grid-cols-[0.1fr_0.4fr_0.2fr_0.3fr] gap-1'>
                                <p>{index + 1}. </p>
                                <p>{subscription.type}</p>
                                <p className='font-semibold'>${subscription.price}</p>
                                <p>{dayjs(subscription.purchasedOn).format("DD/MM/YYYY")}</p>
                            </div>
                        )
                    })
                }
            </div>
            <span className='flex-grow'></span>
            <div className='flex flex-col gap-4 items-end justify-start'>
                <button className='bg-teal-500 hover:bg-teal-600 py-2 px-4 rounded-md text-white'
                    onClick={async (e) => {
                        e.preventDefault();
                        const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/portal?email=${sessionStorage.getItem("email")}`, {
                            headers: {
                                "Authorization": `${cookies.getCookie("token")}`,
                                "Content-Type": "application/json"
                            }
                        });
                        const data = await response.json();
                        window.location.assign(data.url);
                    }}
                >Manage Subscriptions</button>
            </div>
        </div>
    )
}
