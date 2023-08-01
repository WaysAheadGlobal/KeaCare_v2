"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import caregiverPerson from '../../../../public/caregiverPerson.jpg'
import Link from 'next/link'
import { BsCalendarCheck, BsCalendar2Week, BsFillStarFill, BsCalendar3Week, BsArrowLeft } from 'react-icons/bs'
import specialityIcon from '../../../../public/specialityIcon.png'
import experienceIcon from '../../../../public/experienceIcon.png'
import multitaskIcon from '../../../../public/multitaskIcon.png'
import petsIcon from '../../../../public/petsIcon.png'
import { ImLocation } from 'react-icons/im'
import { MdOutlineReviews } from 'react-icons/md'
import { IoChatbubbles, IoLanguage } from 'react-icons/io5'
import Review from '@/app/(dashboard)/details/Review'
import RecommendedCard from '@/app/(dashboard)/dashboard/RecommendedCard'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function Details() {
    const router = useRouter();
    const [caregivers, setCaregivers] = useState<any>([]);
    const [caregiver, setCaregiver] = useState<any>();
    const searchParams = useSearchParams();
    useEffect(() => {
        async function getCaregivers() {
            const response = await fetch("https://webapi.waysdatalabs.com/keacare/api/careseeker/getCaregivers?page=1", {
                next: {
                    revalidate: 10
                }
            });
            const data = await response.json();
            setCaregivers(data);
        }
        getCaregivers();
    }, []);

    useEffect(() => {
        async function getCaregiverById() {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/caregiver/getCaregiverInfo?id=${searchParams.get("id")}`, {
                cache: "no-cache"
            });
            const data = await response.json();
            setCaregiver(data);
        }
        getCaregiverById();
    }, [searchParams])

    const speciality: any = {
        child_care: "Child Care",
        senior_care: "Senior Care",
        child_senior_care: "Child and Senior Care"
    };

    return (
        <section className='md:flex md:flex-col items-center px-[1rem] lg:px-[5rem]'>
            <section className='flex flex-col gap-3 mt-5 mb-5 lg:mb-0'>
                <p className='self-start cursor-pointer text-teal-500 font-semibold flex gap-2 items-center justify-center hover:underline' onClick={() => {
                    router.back();
                }}>
                    <BsArrowLeft />
                    Back
                </p>
                <div className='flex flex-col lg:flex-row gap-[2rem] lg:gap-[5rem] w-full'>
                    <div className='flex flex-col gap-5'>
                        <Image src={caregiver?.imageUrl} alt='caregiver' width={caregiverPerson.width} height={caregiverPerson.height} className='w-[35rem] h-[30rem] rounded-lg object-cover object-center' />
                        <div className='flex flex-col gap-3 md:flex-row justify-between'>
                            <div>
                                <div className='flex flex-row items-center justify-start gap-3 font-semibold'>
                                    <BsCalendarCheck />
                                    <p>Availability ({caregiver?.daysAWeek} Days a week)</p>
                                </div>
                                {/* left to configure  */}
                                <ul className='list-disc list-inside mb-[2rem]'>
                                    <li className='list-item'>Monday</li>
                                    <li className='list-item'>Tuesday</li>
                                    <li className='list-item'>Wednesday</li>
                                    <li className='list-item'>Friday</li>
                                </ul>
                            </div>
                            <div>
                                {/* left to configure  */}
                                <div className='flex flex-row gap-3 items-center justify-start font-semibold'>
                                    <BsCalendar2Week />
                                    <p>Working Hours</p>
                                </div>
                                <p>10 am to 5 pm</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='space-y-2'>
                                <p className='text-lg font-bold'>{caregiver?.fname + " " + caregiver?.lname}</p>
                                <button className='bg-teal-500 text-white px-5 py-3 rounded-lg'>See Introductory Video</button>
                            </div>
                            <div className='flex flex-col gap-3 items-end'>
                                <div className='flex flex-row gap-2 items-center justify-center text-red-500'>
                                    <p className='text-lg'>{caregiver?.rating}</p>
                                    <BsFillStarFill />
                                </div>
                                <p className='text-red-500 text-2xl font-bold'>${caregiver?.rate} <span className='text-sm font-light text-black'>(per hour)</span></p>
                            </div>
                        </div>
                        <p className=''>{caregiver?.bio}</p>
                        <p className='font-semibold'>Other Information</p>
                        <div className='flex flex-row gap-[5rem]'>
                            <div className='flex flex-col gap-2 p-2'>
                                <div className='flex flex-row gap-3 items-center justify-start'>
                                    <Image src={specialityIcon.src} alt='experience' width={specialityIcon.width} height={specialityIcon.height} className='w-[1.3rem]' />
                                    <p>Speciality: {speciality[caregiver?.speciality]}</p>
                                </div>
                                <div className='flex flex-row gap-3 items-center justify-start'>
                                    <Image src={experienceIcon.src} alt='experience' width={experienceIcon.width} height={experienceIcon.height} className='w-[1.3rem]' />
                                    <p>Experience: {caregiver?.experience} Years</p>
                                </div>
                                <div className='flex flex-row gap-3 items-center justify-start'>
                                    <Image src={petsIcon.src} alt='experience' width={petsIcon.width} height={petsIcon.height} className='w-[1.3rem]' />
                                    <p>Comfortable with pets: {caregiver?.comfortableWithPets ? "Yes" : "No"}</p>
                                </div>
                                <div className='flex flex-row gap-3 items-center justify-start'>
                                    <MdOutlineReviews className='text-xl' />
                                    <span>{caregiver?.rating} Reviews</span>
                                </div>
                                <div className='flex flex-row gap-3 items-center justify-start'>
                                    <ImLocation className='text-xl text-teal-500' />
                                    <p>{caregiver?.distance} Kms away</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className='flex flex-row gap-3 items-center justify-start'>
                                        <IoLanguage className='text-xl' />
                                        <span>Languages</span>
                                    </div>
                                    <ul className='list-disc list-inside pl-[2rem]'>
                                        {
                                            caregiver?.languages?.split(",").map((language: string) => {
                                                return <li key={language}>{language}</li>
                                            })
                                        }
                                    </ul>
                                </div>
                                <div>
                                    <div className='flex flex-row gap-3 items-center justify-start'>
                                        <Image src={multitaskIcon.src} alt='experience' width={multitaskIcon.width} height={multitaskIcon.height} className='w-[1.3rem]' />
                                        <p>Can multitask</p>
                                    </div>
                                    <ul className='list-disc list-inside pl-[2rem]'>
                                        {
                                            caregiver?.task?.split(",").map((work: string) => {
                                                return <li key={work}>{work.charAt(0).toUpperCase() + work.substring(1)}</li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row gap-3 justify-between w-full'>
                            <button className='border-[1px] rounded-lg border-black px-5 py-3 flex items-center justify-center gap-3'>
                                <BsCalendar3Week className="text-xl" />
                                Book an Appointment
                            </button>
                            <button className='border-[1px] rounded-lg border-black px-5 py-3 flex items-center justify-center gap-3'>
                                <IoChatbubbles className='text-xl' />
                                Chat/Message
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <hr className='h-[2px] bg-gray-300 w-full' />
            <section className='grid grid-cols-1 lg:grid-cols-2 grid-rows-[auto] gap-5 my-5 px-[1rem] max-w-[75rem]'>
                <h1 className='text-3xl font-bold text-teal-400 lg:col-[1/3]'>Reviews</h1>
                <Review />
                <Review />
                <Review />
                <Review />
            </section>
            <hr className='h-[2px] bg-gray-300 w-full' />
            <section className='mt-5 max-w-[75rem]'>
                <p className='text-3xl font-bold text-teal-400'>Recomended for you</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-rows-[auto] gap-5 my-5 px-[1rem]'>
                    {
                        caregivers.map((caregiver: any) => {
                            if (searchParams.get("id") !== caregiver?.id.toString() && caregiver?.fname) {
                                return <RecommendedCard key={caregiver?.id} caregiver={caregiver} />
                            }
                        })
                    }
                </div>
            </section>
        </section>
    )
}
