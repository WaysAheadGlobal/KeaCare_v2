"use client"

import UserTypeContext from "@/context/UserType";
import { useContext } from "react";

export default function Card({ price, heading, id, duration }: { price: string, heading: string, id: string, duration: string }) {
    const { setUserType } = useContext(UserTypeContext);
    return (
        <>
            <div className='rounded-xl w-[20rem] p-5 flex flex-col gap-10 transition-shadow shadow-lg hover:shadow-2xl bg-white'>
                <p className='font-bold text-teal-700'>{heading}</p>
                <div className='flex flex-col gap-2'>
                    <p className='text-teal-500 text-4xl font-light self-center'>{price}</p>
                    <p className='self-center text-sm'>Every {duration}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <p>8 Hours per Day</p>
                    <p>25 Days a Month</p>
                </div>
                <button className='border-2 hover:border-teal-500 hover:text-teal-500 hover:bg-white border-white bg-teal-500 text-white px-5 py-3 rounded-lg' onClick={async (e) => {
                    e.preventDefault();
                    if (!sessionStorage.getItem("email")) {
                        (document.getElementById("login") as HTMLDialogElement).showModal();
                        setUserType("careseeker");
                        sessionStorage.setItem("userType", "careseeker");
                        return;
                    }
                    sessionStorage.setItem("planType", heading);

                    const body = JSON.stringify({
                        priceId: id,
                        email: sessionStorage.getItem("email"),
                        planType: heading,
                        planDuration: duration,
                        planPrice: price,
                        redo: sessionStorage.getItem("pricing") === "redo"
                    });

                    const response = await fetch("https://webapi.waysdatalabs.com/keacare/api/careseeker/payment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: body
                    });

                    const data = await response.json();

                    sessionStorage.removeItem("pricing");

                    window.location.assign(data);
                }}>
                    Buy Now
                </button>
            </div>
        </>
    )
}