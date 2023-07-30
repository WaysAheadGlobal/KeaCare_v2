import React from 'react'
import userReview from '../../../../public/userReview.jpg'
import Image from 'next/image'
import { BsFillStarFill } from 'react-icons/bs'

export default function Review() {
    return (
        <div className='flex flex-col lg:flex-row gap-3 p-3 w-full bg-[#e5e5e5] rounded-lg shadow-lg'>
            <Image src={userReview.src} width={userReview.width} height={userReview.height} alt="User Review" className='rounded-full aspect-square w-[10rem]' />
            <div className='flex flex-col gap-2 items-stretch justify-center'>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <p>Sam Anderson</p>
                    </div>
                    <div>
                        <BsFillStarFill className='text-red-500' />
                    </div>
                </div>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim laborum nam, suscipit nesciunt quod obcaecati, fugiat dolores a sint in repellendus. Numquam vel itaque placeat
                </p>
                <p className='text-teal-500 underline font-semibold'>Learn More</p>
            </div>
        </div>
    )
}
