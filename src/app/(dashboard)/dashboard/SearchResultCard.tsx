import React from 'react'
import Image from 'next/image'
import caregiverPerson from '../../../../public/caregiverPerson.jpg'
import { FaStar } from 'react-icons/fa'
import { IoLanguage } from 'react-icons/io5'
import { ImLocation } from 'react-icons/im'
import { MdOutlineReviews } from 'react-icons/md'
import { HiMiniVideoCamera } from 'react-icons/hi2'
import specialityIcon from '../../../../public/specialityIcon.png'
import experienceIcon from '../../../../public/experienceIcon.png'
import multitaskIcon from '../../../../public/multitaskIcon.png'
import petsIcon from '../../../../public/petsIcon.png'
import Link from 'next/link'

export default function SearchResultCard() {
    return (
        <div className='flex flex-row gap-3 p-2 bg-white rounded-lg w-fit'>
            <div>
                <Image src={caregiverPerson.src} width={caregiverPerson.width} height={caregiverPerson.height} alt='caregiver' className='w-[20rem] rounded-lg' />
                <Link href={"/details"}>
                    <p className='text-teal-500 font-semibold underline text-center my-3'>Learn More</p>
                </Link>
            </div>
            <div className='flex flex-col gap-[1rem] mt-5'>
                <div className='flex flex-row gap-3 items-center justify-between w-full'>
                    <p className='font-semibold'>Name</p>
                    <FaStar className='text-red-500' />
                </div>
                <button className='bg-teal-500 text-white rounded-md flex items-center justify-center gap-3 p-3'>
                    <HiMiniVideoCamera />
                    <p>See Introductory Video!</p>
                </button>
                <p className='text-red-500 text-2xl'>$15</p>
            </div>
            <div className='flex flex-col gap-5 p-2 mt-5'>
                <div className='flex flex-row gap-3 items-center justify-start'>
                    <Image src={specialityIcon.src} alt='experience' width={specialityIcon.width} height={specialityIcon.height} className='w-[1.3rem]' />
                    <p>Speciality: Senior Care</p>
                </div>
                <div className='flex flex-row gap-3 items-center justify-start'>
                    <Image src={experienceIcon.src} alt='experience' width={experienceIcon.width} height={experienceIcon.height} className='w-[1.3rem]' />
                    <p>Experience: 8 Years</p>
                </div>
                <div className='flex flex-row gap-3 items-center justify-start'>
                    <Image src={petsIcon.src} alt='experience' width={petsIcon.width} height={petsIcon.height} className='w-[1.3rem]' />
                    <p>Comfortable with pets</p>
                </div>
                <div className='flex flex-row gap-3 items-center justify-start'>
                    <Image src={multitaskIcon.src} alt='experience' width={multitaskIcon.width} height={multitaskIcon.height} className='w-[1.3rem]' />
                    <p>Can multitask</p>
                </div>
            </div>
            <div className='flex flex-col gap-[2rem] mt-5 mr-5'>
                <div className='flex flex-col items-center justify-center'>
                    <MdOutlineReviews className='text-xl' />
                    <span>Reviews</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <ImLocation className='text-xl' />
                    <span>Location</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <IoLanguage className='text-xl' />
                    <span>Multilingual</span>
                </div>
            </div>
        </div>
    )
}
