"use client"

import { Divider } from '@mui/material';
import React from 'react';
import ListItem from './ListItem';
import Link from 'next/link';
import { useCookies } from '@/Hooks/useCookies';

export default function VettingList({ searchParams }: { searchParams: { [key: string]: string } }) {
    const [vettingList, setVettingList] = React.useState<any>(null);
    const cookies = useCookies();

    React.useEffect(() => {
        async function getVettingList(page?: string) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/keacare/api/admin/caregivers?page=${page ?? 1}`, {
                cache: "no-store",
                headers: {
                    "Authorization": `${cookies.getCookie("adminToken")}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            setVettingList(data);
        }
        getVettingList(searchParams.page);
    }, [searchParams.page]);

    return (
        <section className="overflow-y-auto h-[100%] p-4 flex flex-col gap-[1rem]">
            <h1 className="p-3 text-lg bg-teal-500 text-white">VETTING LIST</h1>
            <div className='shadow-lg'>
                <div className="p-4 hidden sm:grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4">
                    <p className='font-semibold'>Profile Photo</p>
                    <p className='font-semibold'>Name</p>
                    <p className='font-semibold'>Speciality</p>
                    <p className='font-semibold'>Status</p>
                </div>
                <Divider />
                {
                    vettingList?.map((item: any) => {
                        return (
                            <ListItem key={item.id} id={item.id} image={item.imageUrl} name={item.fname + " " + item.lname} speciality={item.speciality} />
                        )
                    })
                }
            </div>
            <div className='w-full flex justify-between px-5'>
                <Link href={`?page=${parseInt(searchParams.page ?? 1) - 1}`} passHref>
                    <button disabled={parseInt(searchParams.page ?? 1) - 1 <= 0} className='px-[2rem] py-2 bg-teal-100 border-2 border-teal-500 text-teal-700 rounded-full'>
                        Previous Page
                    </button>
                </Link>
                <Link href={`?page=${parseInt(searchParams.page ?? 1) + 1}`} passHref>
                    <button className='px-[2rem] py-2 bg-teal-100 border-2 border-teal-500 text-teal-700 rounded-full'>Next Page</button>
                </Link>
            </div>
        </section>
    )
}
