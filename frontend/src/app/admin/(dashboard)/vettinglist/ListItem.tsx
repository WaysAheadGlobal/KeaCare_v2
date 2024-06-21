"use client"

import React from 'react';
import { Divider } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useCookies } from '@/Hooks/useCookies';

export default function ListItem({ id, image, name, speciality }: { id: string, image: string, name: string, speciality: string }) {

    const refDiv = React.useRef<HTMLDivElement>(null);
    const refDivider = React.useRef<HTMLHRElement>(null);
    const cookies = useCookies();

    async function verifyCaregiver(id: string, action: "verify" | "not verify") {
        const res = await fetch(`https://webapi.waysdatalabs.com/keacare/api/admin/caregivers/verify?id=${id}&action=${action}`, {
            method: "PUT",
            headers: {
                "Authorization": `${cookies.getCookie("adminToken")}`,
                "Content-Type": "application/json"
            }
        });
        await res.json();
    }

    return (
        <>
            <div ref={refDiv} className="p-4 grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] items-center gap-4">
                <Image src={image} width={500} height={500} alt="image" className='aspect-square w-[4rem] rounded-md object-cover object-center' />
                <p>{name}</p>
                <p>{speciality.replaceAll("_", " ")}</p>
                <div className='flex flex-wrap gap-4'>
                    {/* <button
                        className='px-[2rem] py-2 bg-teal-100 border-2 border-teal-500 text-teal-700 rounded-full'
                        onClick={() => {
                            verifyCaregiver(id, "verify");
                            refDiv.current?.remove();
                            refDivider.current?.remove();
                        }}
                    >Accept</button>
                    <button
                        className='px-[2rem] py-2 bg-red-100 border-2 border-red-500 text-red-700 rounded-full'
                        onClick={() => {
                            verifyCaregiver(id, "not verify");
                            refDiv.current?.remove();
                            refDivider.current?.remove();
                        }}
                    >Decline</button> */}

                    <Link href={`/admin/vettinglist/details?id=${id}`}>
                        <button
                            className='px-[2rem] py-2 bg-teal-100 border-2 border-teal-500 text-teal-700 rounded-full'
                        >View</button>
                    </Link>
                </div>
            </div>
            <Divider ref={refDivider} />
        </>
    )
}