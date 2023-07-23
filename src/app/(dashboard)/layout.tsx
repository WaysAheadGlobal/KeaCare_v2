"use client"

import Link from 'next/link';
import React from 'react'
import { AiFillHeart } from 'react-icons/ai';
import { BsPostcardFill, BsFillChatFill } from 'react-icons/bs';
import { IoDocuments } from 'react-icons/io5';
import { MdFilterListAlt } from 'react-icons/md';
import { TfiHeadphoneAlt } from 'react-icons/tfi';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <div className='flex flex-row flex-wrap gap-5 py-5 px-2 md:p-5 bg-teal-500 text-white text-lg items-center md:justify-evenly'>
                <Link href={"/mypostings"}>
                    <button className='flex gap-2 items-center justify-center border-2 border-white p-3 rounded-lg hover:bg-white hover:text-teal-500 focus:bg-white focus:text-teal-500'>
                        <BsPostcardFill />
                        <p className='text-sm md:text-base'>My Postings</p>
                    </button>
                </Link>
                <button className='flex gap-2 items-center justify-center border-2 border-white p-3 rounded-lg hover:bg-white hover:text-teal-500 focus:bg-white focus:text-teal-500'>
                    <AiFillHeart />
                    <p className='text-sm md:text-base'>Favourites</p>
                </button>
                <button className='flex gap-2 items-center justify-center border-2 border-white p-3 rounded-lg hover:bg-white hover:text-teal-500 focus:bg-white focus:text-teal-500'>
                    <IoDocuments />
                    <p className='text-sm md:text-base'>Appointments</p>
                </button>
                <button className='flex gap-2 items-center justify-center border-2 border-white p-3 rounded-lg hover:bg-white hover:text-teal-500 focus:bg-white focus:text-teal-500'>
                    <BsFillChatFill />
                    <p className='text-sm md:text-base'>Chat/Messages</p>
                </button>
                <button className='flex gap-2 items-center justify-center border-2 border-white p-3 rounded-lg hover:bg-white hover:text-teal-500 focus:bg-white focus:text-teal-500'>
                    <TfiHeadphoneAlt />
                    <p className='text-sm md:text-base'>Need Assistance</p>
                </button>
                <Link href={"/postjob"} >
                    <button className='flex gap-2 items-center justify-center p-3 px-5 rounded-lg bg-[#09371f]'>
                        <p>Post a Job</p>
                    </button>
                </Link>
                <button className='flex flex-col items-center md:hidden' onClick={() => {
                    document.getElementById("filters")?.classList.toggle("-translate-x-full");
                    document.getElementById("filters")?.classList.toggle("translate-x-0");
                }}>
                    <MdFilterListAlt className='text-xl text-white' />
                    <p>Filters</p>
                </button>
            </div>
            {children}
        </main>
    )
}
