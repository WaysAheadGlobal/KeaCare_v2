import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react'
import { HiDocumentText } from 'react-icons/hi2'
import { PiMedalFill } from 'react-icons/pi'

export default function JobPostings({ id, speciality, postedOn, rate, views, status }: { id: number, speciality: string, postedOn: Date, rate: number, views: number, status: string }) {
    const Speciality: any = {
        child_care: "Child Care",
        senior_care: "Senior Care",
        child_senior_care: "Child and Senior Care"
    };
    return (
        <div className={`flex flex-col gap-5 xl:flex-row ${status === "inactive" && "grayscale"} transition-shadow shadow-md hover:shadow-xl rounded-lg p-5 xl:w-full w-fit justify-between select-none`}>
            <div className='bg-teal-500 text-white rounded-lg w-[16rem] p-[20px] flex flex-col justify-center gap-5'>
                <p className='text-center text-lg'>Service Type</p>
                <hr />
                <p className='text-center text-3xl font-bold'>{Speciality[speciality]}</p>
                <p className='text-center'>{status.toUpperCase()}</p>
            </div>
            <div className='flex flex-col gap-2 xl:gap-16 justify-center items-start'>
                <div className='flex gap-2 items-center justify-center'>
                    <HiDocumentText className='text-xl' />
                    <div>
                        <p>Posted On</p>
                        <p>{dayjs(postedOn).format("DD/MM/YYYY")}</p>
                    </div>
                </div>
                <div className='flex gap-2 items-center justify-center'>
                    <PiMedalFill className='text-xl' />
                    <p>Price: <span className='text-red-500 font-semibold'>${rate}</span> Per Hour</p>
                </div>
            </div>
            <div className='flex flex-col gap-2 items-center justify-center'>
                <p>Job Applicants</p>
                <p className='text-6xl text-teal-500'>{views}</p>
                <Link href={{
                    pathname: "/applications",
                    query: {
                        id: id
                    }
                }} className='text-teal-500 underline'>View Details</Link>
            </div>
            <div className='flex flex-col gap-1 xl:w-[20rem] justify-center'>
                <Link href={{
                    pathname: "/jobdetails",
                    query: {
                        id: id
                    }
                }} role='button' className='p-3 border-[1px] border-black rounded-lg flex justify-center'>Edit/View Details</Link>
                <button className='p-3 border-[1px] border-black rounded-lg'>Renew</button>
                <button className='p-3 border-[1px] border-black rounded-lg'>Remove</button>
            </div>
        </div>
    )
}
