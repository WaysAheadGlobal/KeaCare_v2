import React from 'react'
import { BsPostcardFill, BsFillChatFill } from 'react-icons/bs'
import { AiFillHeart } from 'react-icons/ai'
import { IoDocuments } from 'react-icons/io5'
import { TfiHeadphoneAlt } from 'react-icons/tfi'

export default function Dashboard() {
    return (
        <section>
            <div className='flex flex-row gap-5 p-5 bg-teal-500 text-white text-lg items-center justify-evenly'>
                <button className='flex gap-2 items-center justify-center border-2 border-white p-3 rounded-lg'>
                    <BsPostcardFill />
                    My Postings
                </button>
                <button className='flex gap-2 items-center justify-center border-2 border-white p-3 rounded-lg'>
                    <AiFillHeart />
                    Favourites
                </button>
                <button className='flex gap-2 items-center justify-center border-2 border-white p-3 rounded-lg'>
                    <IoDocuments />
                    Appointments
                </button>
                <button className='flex gap-2 items-center justify-center border-2 border-white p-3 rounded-lg'>
                    <BsFillChatFill />
                    Chat/Messages
                </button>
                <button className='flex gap-2 items-center justify-center border-2 border-white p-3 rounded-lg'>
                    <TfiHeadphoneAlt />
                    Need Assistance
                </button>
                <button className='flex gap-2 items-center justify-center p-3 px-5 rounded-lg bg-[#09371f]'>
                    Post a Job
                </button>
            </div>
            <div className='grid grid-cols-[0.3fr_1fr] px-10 pt-3 pb-3'>
                <div id="filters" className='flex flex-col items-start gap-4 bg-gray-200 border-2 border-black rounded-lg p-5'>
                    <p className='self-center text-lg font-semibold'>FILTER PROFILES</p>  
                    <p className='self-end text-xs font-semibold text-red-600'>RESET FILTERS</p>                  
                </div>
                <div id="contents">

                </div>
            </div>
        </section>
    )
}
