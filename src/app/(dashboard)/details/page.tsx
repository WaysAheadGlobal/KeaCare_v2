"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import caregiverPerson from '../../../../public/caregiverPerson.jpg'
import { BsCalendarCheck, BsCalendar2Week, BsCalendar3Week, BsArrowLeft, BsStarFill } from 'react-icons/bs'
import specialityIcon from '../../../../public/specialityIcon.png'
import experienceIcon from '../../../../public/experienceIcon.png'
import multitaskIcon from '../../../../public/multitaskIcon.png'
import petsIcon from '../../../../public/petsIcon.png'
import { ImLocation } from 'react-icons/im'
import { MdOutlineReviews } from 'react-icons/md'
import { IoChatbubbles, IoClose, IoLanguage } from 'react-icons/io5'
import { LuEdit } from 'react-icons/lu'
import Review from '@/app/(dashboard)/details/Review'
import RecommendedCard from '@/app/(dashboard)/dashboard/RecommendedCard'
import { useSearchParams, useRouter } from 'next/navigation'
import Alert from '@/app/Alert'
import Appointment from './Appointment'
import { Divider, Rating, Container } from '@mui/material'
import AlertContext from './AlertContext'

export default function Details() {
    const router = useRouter();
    const [caregivers, setCaregivers] = useState<any>([]);
    const [caregiver, setCaregiver] = useState<any>();
    const [review, setReview] = useState<any>({});
    const [reviews, setReviews] = useState<any>({
        userReview: {},
        otherReviews: []
    });
    const [alert, setAlert] = useState<{ type: "info" | "warn" | "danger" | "success", message: string, translate_: "-translate-y-96" | "translate-y-0", key: number }>({
        type: "info",
        message: "",
        translate_: "-translate-y-96",
        key: 0
    });
    const searchParams = useSearchParams();

    useEffect(() => {
        async function getCaregivers() {
            const response = await fetch("https://webapi.waysdatalabs.com/keacare/api/careseeker/getCaregivers?page=1");
            const data = await response.json();
            setCaregivers(data);
        }
        getCaregivers();
    }, []);

    useEffect(() => {
        async function getReviews() {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/review?caregiverId=${searchParams.get("id")}&email=${sessionStorage.getItem("email")}`, {
                cache: "no-cache"
            });
            const data = await response.json();
            setReviews(data);
        }
        if (Object.keys(review).length === 0) {
            getReviews();
        }
    }, [searchParams, review])

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
        <AlertContext.Provider value={{ alert, setAlert }}>
            <div className='sticky top-0 bg-transparent w-full h-[1rem]'>
                <Alert type={alert.type} message={alert.message} translate_={alert.translate_} _key={alert.key} />
            </div>
            <Container maxWidth="lg" sx={{
                marginY: 5
            }}>
                <section className='md:flex md:flex-col w-full'>
                    <dialog key={searchParams.get("id") + "dialog"} id="reviewDialogBox" className='p-1 rounded-lg w-full md:max-w-[35rem]'>
                        <div className='flex flex-col w-full'>
                            <button className="p-2 self-end text-lg rounded-full hover:bg-black hover:bg-opacity-10" onClick={() => {
                                (document.getElementById("reviewDialogBox") as HTMLDialogElement).close();
                            }}>
                                <IoClose />
                            </button>
                            <form
                                className='p-[1rem] space-y-[1rem]'
                                onChange={(e) => {
                                    setReview({
                                        ...review,
                                        [(e.target as any).name]: (e.target as any).value
                                    });
                                }}
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const body = JSON.stringify({
                                        email: sessionStorage.getItem("email"),
                                        ...review,
                                        caregiverId: searchParams.get("id")
                                    });
                                    const response = await fetch("https://webapi.waysdatalabs.com/keacare/api/careseeker/review", {
                                        method: Object?.keys(reviews.userReview).length !== 0 ? "PUT" : "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: body
                                    });
                                    const data = await response.json();
                                    if (data?.success) {
                                        setReview({});
                                        (document.getElementById("review") as HTMLTextAreaElement).value = "";
                                        (document.getElementById("reviewDialogBox") as HTMLDialogElement).close();
                                        setAlert({
                                            type: "success",
                                            message: "Review Posted.",
                                            translate_: "translate-y-0",
                                            key: alert.key + 1
                                        });
                                    }
                                }}>
                                <div>
                                    <p>Rate this Caregiver.</p>
                                    <Rating
                                        name="rating"
                                        value={review?.rating ? parseInt(review.rating) : 0}
                                    />
                                </div>
                                <div className='space-y-1 w-full h-full'>
                                    <p>Write a Review.</p>
                                    <textarea name="review" id="review" rows={10} className="border-2 p-[0.75rem] border-teal-500 hover:ring-2 hover:ring-teal-300 focus:ring-2 focus:ring-teal-300 outline-none rounded-lg w-full h-[10rem]" placeholder="Write a Review" required></textarea>
                                </div>
                                <button className='bg-teal-500 text-white px-5 py-2 rounded-lg outline-none hover:bg-white hover:text-teal-500 hover:outline-teal-500 focus:bg-white focus:text-teal-500 focus:outline-teal-500'>Post Review</button>
                            </form>
                        </div>
                    </dialog>
                    <section className='flex flex-col w-full gap-3 mb-5 lg:mb-0'>
                        <p className='self-start cursor-pointer text-teal-500 font-semibold flex gap-2 items-center justify-center hover:underline' onClick={() => {
                            router.back();
                        }}>
                            <BsArrowLeft />
                            Back
                        </p>
                        <div className='flex flex-col w-full lg:flex-row justify-between'>
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
                                            <BsStarFill />
                                        </div>
                                        <p className='text-red-500 text-2xl font-bold'>${caregiver?.rate} <span className='text-sm font-light text-black'>(per hour)</span></p>
                                    </div>
                                </div>
                                <p>{caregiver?.bio}</p>
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
                                    <button className='bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 px-5 py-3 flex items-center justify-center gap-3' onClick={() => {
                                        if (document.getElementById("appointments")?.classList.contains("h-0")) {
                                            document.getElementById("appointments")?.classList.toggle("relative");
                                            document.getElementById("appointments")?.classList.toggle("-z-50");
                                            document.getElementById("appointments")?.classList.toggle("h-0");
                                            setTimeout(() => document.getElementById("appointments")?.classList.toggle("opacity-0"), 200);
                                        } else {
                                            document.getElementById("appointments")?.classList.toggle("opacity-0");
                                            document.getElementById("appointments")?.classList.toggle("relative");
                                            document.getElementById("appointments")?.classList.toggle("-z-50");
                                            setTimeout(() => document.getElementById("appointments")?.classList.toggle("h-0"), 200);
                                        }
                                    }}>
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
                    <section id="appointments" className="opacity-0 h-0 relative -z-50 transition-all duration-300 self-start w-full">
                        <Divider />
                        <Appointment price={caregiver?.rate} id={Number(searchParams.get("id"))} />
                    </section>
                    <hr className='h-[1.5px] bg-gray-300 w-full' />
                    <section className='grid grid-cols-1 lg:grid-cols-2 grid-rows-[auto] gap-5 my-5 px-[1rem] w-full'>
                        <div className='lg:col-[1/3] flex justify-between'>
                            <h1 className='text-3xl font-semibold text-teal-400'>Reviews</h1>
                            <h2 className='justify-self-end flex items-center gap-2 cursor-pointer text-teal-500 hover:underline focus:underline' onClick={() => {
                                (document.getElementById("reviewDialogBox") as HTMLDialogElement).showModal();
                            }}>
                                <LuEdit className='text-xl' />
                                {
                                    Object.keys(reviews.userReview).length !== 0 ? <p>Edit Review</p> : <p>Write a Review</p>
                                }
                            </h2>
                        </div>
                        {
                            Object.keys(reviews.userReview).length !== 0 ?
                                <div className='col-[1/3] space-y-2'>
                                    <h4 className='font-semibold text-xl'>Your Review</h4>
                                    {
                                        Object.keys(reviews.userReview).length !== 0 ? <Review review={reviews.userReview} /> : <></>
                                    }
                                </div> : <></>
                        }
                        <div className='col-[1/3] space-y-2'>
                            <h4 className='font-semibold text-xl'>Other Reviews and Ratings</h4>
                            <div className='flex flex-col md:flex-row gap-[1rem]'>
                                {
                                    reviews.otherReviews.length !== 0 ? reviews.otherReviews?.map((review: any) => <Review key={review.id} review={review} />) : <p className='text-lg text-slate-400'>No Reviews Yet.</p>
                                }
                            </div>
                        </div>
                    </section>
                    <hr className='h-[2px] bg-gray-300 w-full' />
                    <section className='mt-5 w-full'>
                        <p className='text-3xl font-bold text-teal-400'>Recomended for you</p>
                        <div className='flex flex-wrap gap-[2rem] justify-center md:justify-between'>
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
            </Container>
        </AlertContext.Provider>
    )
}
