import React from 'react'
import Image from 'next/image'
import { BsStarFill } from 'react-icons/bs'

export default function Review({ review }: { review: any }) {
    return (
        <div className='p-[1rem] w-full md:w-[25rem] flex flex-col gap-[1.5rem] bg-teal-500 bg-opacity-50 rounded-lg hover:shadow-lg transition-shadow'>
            <div className='flex gap-5 items-center justify-start'>
                <Image src={review.careseekerImageUrl} alt={review.fname + " " + review.lname} width={100} height={100} className='w-[4rem] aspect-square rounded-full object-cover object-top' />
                <p className='font-bold'>{review.fname + " " + review.lname}</p>
                <div className='flex-grow'></div>
                <div className=' flex gap-1 text-red-500 items-center justify-center'>
                    <p className='text-xl'>{review.rating}</p>
                    <BsStarFill />
                </div>
            </div>
            <p>{review.review?.substring(0, 200)}</p>

        </div>
    )
}
