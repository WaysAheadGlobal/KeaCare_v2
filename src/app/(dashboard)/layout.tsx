"use client"

import React from 'react'
import { AiFillHeart } from 'react-icons/ai';
import { BsPostcardFill, BsFillChatFill } from 'react-icons/bs';
import { IoDocuments } from 'react-icons/io5';
import { MdFilterListAlt } from 'react-icons/md';
import { TfiHeadphoneAlt } from 'react-icons/tfi';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <div className='sticky top-0 z-20 flex flex-row flex-wrap gap-5 py-5 px-2 md:p-5 bg-teal-500 text-white text-lg items-center md:justify-evenly'>
                <button className='flex flex-row gap-2 items-center justify-center border-2 border-white p-3 rounded-lg'>
                    <BsPostcardFill />
                    <p className='text-sm md:text-base'>My Postings</p>
                </button>
                <button className='flex gap-2 items-center justify-center border-2 border-white p-3 rounded-lg'>
                    <AiFillHeart />
                    <p className='text-sm md:text-base'>Favourites</p>
                </button>
                <button className='flex gap-2 items-center justify-center border-2 border-white p-3 rounded-lg'>
                    <IoDocuments />
                    <p className='text-sm md:text-base'>Appointments</p>
                </button>
                <button className='flex gap-2 items-center justify-center border-2 border-white p-3 rounded-lg'>
                    <BsFillChatFill />
                    <p className='text-sm md:text-base'>Chat/Messages</p>
                </button>
                <button className='flex gap-2 items-center justify-center border-2 border-white p-3 rounded-lg'>
                    <TfiHeadphoneAlt />
                    <p className='text-sm md:text-base'>Need Assistance</p>
                </button>
                <button className='flex gap-2 items-center justify-center p-3 px-5 rounded-lg bg-[#09371f]'>
                    <p>Post a Job</p>
                </button>
                <button className='flex flex-col items-center' onClick={() => {
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
