import { Divider } from '@mui/material';
import React from 'react';
import ListItem from './ListItem';
import Link from 'next/link';

async function getPaymentInfo(page?: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/keacare/api/admin/caregivers/payment?page=${page ?? 1}`);
    const data = await response.json();
    return data;
}

export default async function Payments({ searchParams }: { searchParams: { [key: string]: string } }) {
    const caregivers = await getPaymentInfo(parseInt(searchParams.page ?? 1));

    return (
        <section className="overflow-y-auto h-[100%] p-4 flex flex-col gap-[1rem]">
            <h1 className="p-3 text-lg bg-teal-500 text-white">PAYMENTS</h1>
            <div className='shadow-lg'>
                <div className="p-4 font-semibold hidden sm:grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4">
                    <p>Profile Photo</p>
                    <p>Name</p>
                    <p>Speciality</p>
                    <p>Amount</p>
                    <p>Action</p>
                </div>
                <Divider />
                {
                    caregivers?.map((caregiver: any) => <ListItem key={caregiver.id} id={caregiver.id} amount={caregiver.amount} image={caregiver.imageUrl} name={caregiver.name} speciality={caregiver.speciality.replaceAll("_", " ")} />)
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
