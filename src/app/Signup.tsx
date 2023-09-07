"use client"

import React, { useContext, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { ImFacebook2 } from 'react-icons/im'
import { FcGoogle } from 'react-icons/fc'
import UserTypeContext from '@/context/UserType'
import { useRouter } from 'next/navigation'
import Otp from '@/interface/Otp'
import SignupResponse from '@/interface/SignupResponse'
import Alert from './Alert'
import AlertContext from './AlertContext'

export default function Signup() {
    const { userType } = useContext(UserTypeContext);
    const router = useRouter();
    const [Otp, setOtp] = useState<string>("");
    const { setAlert } = useContext(AlertContext);

    return (
        <dialog id="signup" className='rounded-lg backdrop:bg-black backdrop:bg-opacity-70 p-0'>
            <Alert />
            <div className='flex flex-col gap-3 p-2'>
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
                            <span className='text-teal-500'>Email*</span>
                            <input type='text' id="email" placeholder='Enter your email address' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none invalid:focus:border-red-500' required />
                        </div>
                        <p className='text-lg text-teal-500 self-center mt-3'>OR</p>
                        <div className='flex flex-col gap-1'>
                            <span className='text-teal-500'>Phone Number</span>
                            <input type='text' id="phoneno" placeholder='Enter your phone number' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none' />
                        </div>
                        <div className='flex flex-col md:flex-row gap-3 mt-3 items-center justify-start'>
                            <div className='flex flex-col gap-1'>
                                <span className='text-teal-500'>Zip Code</span>
                                <input id="zipcode" type='text' placeholder='Enter your zip code'
                                    pattern='^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z][ ]?[0-9][ABCEGHJ-NPRSTV-Z][0-9]$'
                                    className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none flex-grow' />
                            </div>
                            <button className='py-[0.8rem] px-8 bg-teal-500 rounded-lg mt-0 md:mt-7 text-white self-center hover:bg-white hover:text-teal-500 hover:outline hover:outline-teal-500 focus:bg-white focus:text-teal-500 focus:outline focus:outline-teal-500'
                                onClick={async (e) => {
                                    e.preventDefault();

                                    const email = document.getElementById("email") as HTMLInputElement;
                                    /* const phoneno = document.getElementById("phoneno") as HTMLInputElement; */

                                    if (!email.validity.valid) {
                                        email.focus();
                                        setAlert({
                                            type: "warning",
                                            message: "Please enter a valid email address.",
                                            open: true
                                        });
                                        return;
                                    }

                                    setAlert({
                                        type: "info",
                                        message: "Sending OTP. Please Wait.",
                                        open: true
                                    });

                                    try {
                                        const bodyContent = JSON.stringify({
                                            "email": email.value
                                        });

                                        const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/${userType}/signup/otp`, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: bodyContent
                                        });

                                        const data: Otp = await response.json();

                                        if (data?.otp) {
                                            setAlert({
                                                type: "success",
                                                message: "OTP sent please check your mail.",
                                                open: true
                                            });
                                            setOtp(data?.otp.toString());
                                        } else if (data?.error) {
                                            setAlert({
                                                type: "error",
                                                message: data?.error,
                                                open: true
                                            });
                                        }
                                    } catch (error) {
                                        setAlert({
                                            type: "error",
                                            message: "Couldn't send OTP please check your mail or try after some time.",
                                            open: true
                                        });
                                    }

                                }}>Send OTP</button>
                        </div>
                    </form>
                    <div className='flex flex-col gap-3 items-center justify-start mt-3'>
                        <input type='text' placeholder='Enter OTP' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none self-stretch' autoComplete='off' />
                        <button className='py-[0.8rem] px-8 bg-teal-500 rounded-lg text-white self-center hover:bg-white hover:text-teal-500 hover:outline hover:outline-teal-500 focus:bg-white focus:text-teal-500 focus:outline focus:outline-teal-500'
                            onClick={async (e) => {
                                const email = document.getElementById("email") as HTMLInputElement;
                                const otp_element = e.currentTarget.previousElementSibling as HTMLInputElement;

                                if (!Otp) {
                                    setAlert({
                                        type: "error",
                                        message: "Invalid OTP. Please try again",
                                        open: true
                                    });
                                    return;
                                }

                                const bodyContent = JSON.stringify({
                                    "email": email.value,
                                    "token": otp_element.value
                                });

                                const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/${userType}/signup`, {
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
                                    sessionStorage.setItem("email", email.value);
                                    sessionStorage.setItem("phoneno", (document.getElementById("phoneno") as HTMLInputElement).value);
                                    sessionStorage.setItem("zipcode", (document.getElementById("zipcode") as HTMLInputElement).value);
                                    sessionStorage.setItem("otp", Otp);
                                    if (userType === 'caregiver') {
                                        router.push("/caregiver/registration");
                                    } else {
                                        router.push("/pricing");
                                    }
                                } else if (data?.error) {
                                    setAlert({
                                        type: "error",
                                        message: data?.error,
                                        open: true
                                    });
                                }
                            }}>Sign Up</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}
