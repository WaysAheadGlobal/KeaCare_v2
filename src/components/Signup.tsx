"use client"

import React, { useContext } from 'react'
import { IoClose } from 'react-icons/io5'
import { ImFacebook2 } from 'react-icons/im'
import { FcGoogle } from 'react-icons/fc'
import UserTypeContext from '@/context/UserType'
import { useRouter } from 'next/navigation'
import Otp from '@/interface/Otp'
import SignupResponse from '@/interface/SignupResponse'

export default function Signup() {
    const { userType } = useContext(UserTypeContext);
    const router = useRouter();

    return (
        <dialog id="signup" className='rounded-lg backdrop:bg-black backdrop:bg-opacity-70'>
            <div className='flex flex-col gap-3'>
                <IoClose className='self-end text-2xl relative z-10' onClick={() => {
                    (document.getElementById("signup") as HTMLDialogElement).close();
                }} />
                <div className='flex flex-col gap-3 -mt-10 p-5'>
                    <h1 className='text-xl font-semibold'>Signup as a {userType}</h1>
                    <h2 className='text-lg'>Already a Member? <span className='text-teal-500 cursor-pointer' onClick={() => {
                        (document.getElementById("signup") as HTMLDialogElement).close();
                        (document.getElementById("login") as HTMLDialogElement).showModal();
                    }}>Log In</span></h2>
                    <div className='flex flex-col md:flex-row gap-2'>
                        <button className='bg-[#4267b2] flex flex-row items-center justify-center px-3 py-2 gap-3 text-white rounded-lg'>
                            <ImFacebook2 className='text-xl' />
                            <p>Log in with Facebook</p>
                        </button>
                        <button className='bg-[#4285f4] flex flex-row items-center justify-center px-3 py-2 gap-3 text-white rounded-lg'>
                            <div className='p-1 bg-white rounded-full'>
                                <FcGoogle className='text-xl' />
                            </div>
                            <p>Log in with Google</p>
                        </button>
                    </div>
                    <p className='text-lg text-teal-500 self-center mt-3'>OR</p>
                    <form className='flex flex-col -mt-5'>
                        <div className='flex flex-col gap-1'>
                            <span className='text-teal-500'>Email</span>
                            <input type='text' id="email" placeholder='Enter your email address' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none' required />
                        </div>
                        <p className='text-lg text-teal-500 self-center mt-3'>OR</p>
                        <div className='flex flex-col gap-1'>
                            <span className='text-teal-500'>Phone Number</span>
                            <input type='text' id="phoneno" placeholder='Enter your email address' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none' />
                        </div>
                        <div className='flex flex-row gap-3 mt-3 items-center justify-start'>
                            <div className='flex flex-col gap-1'>
                                <span className='text-teal-500'>Zip Code</span>
                                <input type='text' placeholder='Enter your zip code' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none flex-grow' />
                            </div>
                            <button className='py-[0.8rem] px-8 bg-teal-500 rounded-lg mt-7 text-white self-center'
                                onClick={async (e) => {
                                    e.preventDefault();

                                    const email = document.getElementById("email") as HTMLInputElement;
                                    /* const phoneno = document.getElementById("phoneno") as HTMLInputElement; */

                                    const bodyContent = JSON.stringify({
                                        "email": email.value
                                    });

                                    const response = await fetch(`http://localhost:3001/api/${userType}/signup/otp`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: bodyContent
                                    });

                                    const data: Otp = await response.json();
                                    console.log(data);

                                    sessionStorage.setItem("otp", data?.otp.toString());

                                }}>Send OTP</button>
                        </div>
                    </form>
                    <div className='flex flex-col gap-3 items-center justify-start mt-3'>
                        <input type='text' placeholder='Enter OTP' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none self-stretch' />
                        <button className='py-[0.8rem] px-8 bg-teal-500 rounded-lg text-white self-center'
                            onClick={async (e) => {
                                const email = document.getElementById("email") as HTMLInputElement;
                                const otp_element = e.currentTarget.previousElementSibling as HTMLInputElement;

                                const bodyContent = JSON.stringify({
                                    "email": email.value,
                                    "token": otp_element.value
                                });

                                const response = await fetch(`http://localhost:3001/api/${userType}/signup`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: bodyContent
                                })

                                const data: SignupResponse = await response.json();

                                if (data?.success) {
                                    document.querySelectorAll("dialog").forEach(dialog => {
                                        dialog.close();
                                    });
                                    console.log(data);
                                    sessionStorage.setItem("email", email.value);
                                    if (userType === 'caregiver') {
                                        router.push("/caregiver/registration");
                                    } else {
                                        router.push("/pricing");
                                    }
                                }
                            }}>Sign Up</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}
