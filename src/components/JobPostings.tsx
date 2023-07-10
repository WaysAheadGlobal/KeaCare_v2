import React from 'react'
import { HiDocumentText } from 'react-icons/hi2'
import { PiMedalFill } from 'react-icons/pi'

export default function JobPostings() {
    return (
        <div className='flex flex-col gap-5 xl:flex-row bg-white shadow-lg rounded-lg p-5 xl:w-full w-fit justify-between'>
            <div className='bg-teal-500 text-white rounded-lg w-[16rem] p-[20px] flex flex-col justify-center gap-5'>
                <p className='text-center text-lg'>Service Type</p>
                <hr />
                <p className='text-center text-3xl font-bold'>Child Care</p>
                <p className='text-center'>ACTIVE</p>
            </div>
            <div className='flex flex-col gap-2 xl:gap-16 justify-center items-start'>
                <div className='flex gap-2 items-center justify-center'>
                    <HiDocumentText className='text-xl' />
                    <div>
                        <p>Posted On</p>
                        <p>2023-07-04 08:33:36</p>
                    </div>
                </div>
                <div className='flex gap-2 items-center justify-center'>
                    <PiMedalFill className='text-xl' />
                    <p>Price: <span className='text-red-500 font-semibold'>$10</span> Per Hour</p>
                </div>
            </div>
            <div className='flex flex-col gap-2 items-center justify-center'>
                <p>Job Applicants</p>
                <p className='text-6xl text-teal-500'>30</p>
                <p className='text-teal-500 underline'>view details</p>
            </div>
            <div className='flex flex-col gap-1 xl:w-[20rem] justify-center'>
                <button className='p-3 border-[1px] border-black rounded-lg'>Edit/View Details</button>
                <button className='p-3 border-[1px] border-black rounded-lg'>Renew</button>
                <button className='p-3 border-[1px] border-black rounded-lg'>Remove</button>
            </div>
        </div>
    )
}
