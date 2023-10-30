import React from 'react'
import Image from 'next/image'
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

export default function RecommendedCard({ caregiver }: { caregiver: any }) {
    const speciality: any = {
        child_care: "Child Care",
        senior_care: "Senior Care",
        child_senior_care: "Child and Senior Care"
    };

    return (
        <div className='flex flex-col p-2 rounded-lg bg-white transition-shadow shadow-lg hover:shadow-2xl gap-3'>
            <Image src={caregiver?.imageUrl} width={300} height={300} alt='caregiver' className='flex-grow w-full sm:w-[300px] h-[300px] rounded-lg object-cover object-center' />
            <div className='flex flex-row justify-between px-2 items-center'>
                <p className='font-semibold'>{caregiver?.fname + " " + caregiver?.lname}</p>
                <div className='flex flex-row gap-2 items-center justify-center text-red-500'>
                    <p className='text-lg'>{caregiver?.rating}</p>
                    <FaStar />
                </div>
            </div>
            <div className='flex flex-row justify-evenly items-center'>
                <div className='flex flex-col items-center justify-center'>
                    <MdOutlineReviews className='text-xl' />
                    <span>{caregiver?.reviews} Reviews</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <ImLocation className='text-xl' />
                    <span>{caregiver?.distance} Kms</span>
                </div>
                <div className={`${(caregiver?.languages?.split(",").length <= 1) && 'hidden'} flex flex-col items-center justify-center`}>
                    <IoLanguage className='text-xl' />
                    <span>Multilingual</span>
                </div>
            </div>
            <Link href={{
                pathname: "/details",
                query: {
                    id: caregiver?.id
                }
            }} className='bg-teal-500 text-white rounded-md flex items-center justify-center gap-3 p-3'>
                <HiMiniVideoCamera />
                <p>See Introductory Video!</p>
            </Link>
            <div className='flex flex-col gap-2 p-2'>
                <div className='flex flex-row gap-3 items-center justify-start'>
                    <Image src={specialityIcon.src} alt='experience' width={specialityIcon.width} height={specialityIcon.height} className='w-[1.3rem]' />
                    <p>Speciality: {speciality[caregiver?.speciality]}</p>
                </div>
                <div className='flex flex-row gap-3 items-center justify-start'>
                    <Image src={experienceIcon.src} alt='experience' width={experienceIcon.width} height={experienceIcon.height} className='w-[1.3rem]' />
                    <p>Experience: {caregiver?.experience} Years</p>
                </div>
                <div className="flex flex-row gap-3 items-center justify-start">
                    <Image src={petsIcon.src} alt='experience' width={petsIcon.width} height={petsIcon.height} className='w-[1.3rem]' />
                    <p>Comfortable with pets: {caregiver?.comfortableWithPets ? "Yes" : "No"}</p>
                </div>
                <div className='flex flex-row gap-3 items-center justify-start'>
                    <Image src={multitaskIcon.src} alt='experience' width={multitaskIcon.width} height={multitaskIcon.height} className='w-[1.3rem]' />
                    <p>Can multitask: {(caregiver?.task?.split(",").length > 1) ? "Yes" : "No"}</p>
                </div>
            </div>
            {/* <div className='flex-grow'></div> */}
            <div className='flex items-center justify-between p-2'>
                <Link href={{
                    pathname: "/details",
                    query: {
                        id: caregiver?.id
                    }
                }} className='font-semibold text-xl text-teal-500 hover:underline'>Learn More</Link>
                <p className='text-red-500 text-2xl'>${caregiver?.rate}</p>
            </div>
        </div>
    )
}
