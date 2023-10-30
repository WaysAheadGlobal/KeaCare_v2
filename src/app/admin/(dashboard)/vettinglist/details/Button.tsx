"use client"

import { useRouter } from 'next/navigation';
import React from 'react'

export default function Button({ type, id }: { type: "accept" | "decline", id: string }) {

    const router = useRouter();

    async function verifyCaregiver(id: string, action: "verify" | "not verify") {
        const res = await fetch(`https://webapi.waysdatalabs.com/keacare/api/admin/caregivers/verify?id=${id}&action=${action}`, {
            method: "PUT"
        });
        await res.json();
        //router.push("/admin/vettinglist");
    }

    return (
        <>
            {
                type === "accept" ? (
                    <button
                        className='px-[2rem] py-2 bg-teal-100 border-2 border-teal-500 text-teal-700 rounded-full'
                        onClick={() => {
                            verifyCaregiver(id, "verify");
                            window.location.assign("/admin/vettinglist");
                        }}
                    >Accept</button>
                ) : (
                    <button
                        className='px-[2rem] py-2 bg-red-100 border-2 border-red-500 text-red-700 rounded-full'
                        onClick={() => {
                            verifyCaregiver(id, "not verify");
                            window.location.assign("/admin/vettinglist");
                        }}
                    >Decline</button>
                )
            }
        </>
    )
}
