"use client"

import React, { useContext } from 'react'
import Image from 'next/image'
import specialityIcon from '../../../../public/specialityIcon.png'
import experienceIcon from '../../../../public/experienceIcon.png'
import multitaskIcon from '../../../../public/multitaskIcon.png'
import petsIcon from '../../../../public/petsIcon.png'
import { ImLocation } from 'react-icons/im'
import { IoLanguage } from 'react-icons/io5'
import { MdOutlineReviews } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'
import AlertContext from '../AlertContext'
import { BsStarFill } from "react-icons/bs"

/* export default function Favourite({ favourite }: { favourite: any }) {
    return (
        <div>{JSON.stringify(favourite)}</div>
    )
} */

export default function Favourite({ favourite }: { favourite: any }) {
    const { setAlert } = useContext(AlertContext);
    const speciality: any = {
        "child_care": "Child Care",
        "senior_care": "Senior Care"
    };
    return (
        <div id={"favourite" + favourite.id} className={`flex md:flex-row flex-col gap-5 justify-start md:items-center md:justify-center shadow-md hover:shadow-lg transition-shadow p-[1rem] rounded-lg`}>
            <Image src={favourite?.imageUrl} alt={'favourite'} width={100} height={100} className='rounded-lg w-full md:w-[300px] h-[300px] object-center object-cover' />
            <div className='flex-grow space-y-1'>
                <div className='flex flex-row justify-between items-center w-full'>
                    <p className='font-semibold text-lg'>{favourite?.fname + " " + favourite?.lname}</p>
                    <p className='flex flex-row text-red-500 text-xl gap-1 items-center justify-center'>{favourite?.rating} <BsStarFill className='text-base' /></p>
                </div>
                <p className='text-xl text-red-500'>${favourite?.rate} <span className='text-black text-base'>per Hrs</span></p>
            </div>
            <div className='flex flex-col gap-4 flex-grow'>
                <div className='flex flex-row gap-3 items-center justify-start'>
                    <Image src={specialityIcon.src} alt='experience' width={specialityIcon.width} height={specialityIcon.height} className='w-[1.3rem]' />
                    <p>Speciality: {speciality[favourite?.speciality]}</p>
                </div>
                <div className='flex flex-row gap-3 items-center justify-start'>
                    <Image src={experienceIcon.src} alt='experience' width={experienceIcon.width} height={experienceIcon.height} className='w-[1.3rem]' />
                    <p>Experience: {favourite?.experience} Years</p>
                </div>
                <div className="flex flex-row gap-3 items-center justify-start">
                    <Image src={petsIcon.src} alt='experience' width={petsIcon.width} height={petsIcon.height} className='w-[1.3rem]' />
                    <p>Comfortable with pets: {favourite?.comfortableWithPets ? "Yes" : "No"}</p>
                </div>
                <div className='flex flex-row gap-3 items-center justify-start'>
                    <Image src={multitaskIcon.src} alt='experience' width={multitaskIcon.width} height={multitaskIcon.height} className='w-[1.3rem]' />
                    <p>Can multitask: {(favourite?.task?.split(",").length > 1) ? "Yes" : "No"}</p>
                </div>
            </div>
            <div className='flex flex-col gap-4 justify-evenly items-center'>
                <div className='flex flex-col items-center justify-center'>
                    <MdOutlineReviews className='text-xl' />
                    <span>{favourite?.rating} Reviews</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <ImLocation className='text-xl' />
                    <span>{favourite?.distance} Kms</span>
                </div>
                <div className={`${(favourite?.languages?.split(",").length <= 1) && 'hidden'} flex flex-col items-center justify-center`}>
                    <IoLanguage className='text-xl' />
                    <span>Multilingual</span>
                </div>
            </div>
            <div className='flex-grow'>
                <button className='border-2 border-black rounded-lg w-full py-2 flex flex-row items-center justify-center gap-2'
                    onClick={async () => {
                        const bodyContent = {
                            careseekerEmail: sessionStorage.getItem("email"),
                            caregiverId: favourite?.caregiverId
                        };
                        const response = await fetch("https://webapi.waysdatalabs.com/keacare/api/careseeker/favourites", {
                            method: "DELETE",
                            body: JSON.stringify(bodyContent),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                        const data = await response.json();
                        if (data.success) {
                            setAlert({
                                type: "success",
                                message: "Removed from favourites.",
                                open: true
                            });
                            document.getElementById("favourite" + favourite.id)?.classList.add("hidden");
                        }
                    }}
                >
                    <AiFillDelete className='text-lg' />
                    Remove
                </button>
            </div>
        </div>
    )
}

