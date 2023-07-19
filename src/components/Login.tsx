"use client"

import React, { useContext } from 'react'
import { IoClose } from 'react-icons/io5'
import { ImFacebook2 } from 'react-icons/im'
import { FcGoogle } from 'react-icons/fc'
import UserTypeContext from '@/context/UserType'
import LoginResponse from '@/interface/LoginResponse'
import { useRouter } from 'next/navigation'
import Otp from '@/interface/Otp'

export default function Login() {
    const { userType } = useContext(UserTypeContext);
    const router = useRouter();

    return (
        <dialog id="login" className='rounded-lg backdrop:bg-black backdrop:bg-opacity-70'>
            <div className='flex flex-col gap-3'>
                <IoClose className='self-end text-2xl relative z-10' onClick={() => {
                    (document.getElementById("login") as HTMLDialogElement).close();
                }} />
                <div className='flex flex-col gap-3 -mt-10 p-5'>
                    <h1 className='text-xl font-semibold'>Login as a {userType}</h1>
                    <h2 className='text-lg'>Create a new account. <span className='text-teal-500 cursor-pointer' onClick={() => {
                        (document.getElementById("login") as HTMLDialogElement).close();
                        (document.getElementById("signup") as HTMLDialogElement).showModal();
                    }}>Sign up</span></h2>
                    <div className='flex flex-row gap-2'>
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
                    <p className='text-lg text-teal-500 self-center'>OR</p>
                    <form id="loginForm" className='flex flex-col gap-2' onSubmit={async (e) => {
                        e.preventDefault();

                        const email = document.getElementById("email_login") as HTMLInputElement;
                        /* const phoneNo = document.getElementById("phoneNo_login") as HTMLInputElement; */
                        const otp = document.getElementById("otp_login") as HTMLInputElement;

                        const bodyContent = JSON.stringify({
                            'email': email.value,
                            'token': otp.value
                        });

                        const response = await fetch(`http://localhost:3001/api/${userType}/login`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: bodyContent
                        });

                        const data: LoginResponse = await response.json();

                        if (data?.success) {
                            document.querySelectorAll("dialog").forEach(dialog => {
                                dialog.close();
                            });
                            sessionStorage.setItem("email", data?.email.toString());
                            console.log(data);
                            if (userType === "careseeker") {
                                router.push("/dashboard");
                            } else {
                                router.push("/account");
                            }
                        }
                    }}>
                        <div className='flex flex-col gap-1'>
                            <span className='text-teal-500'>Email</span>
                            <input id="email_login" type='email' placeholder='Enter your email address' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none' required />
                        </div>
                        <p className='text-lg text-teal-500 self-center'>OR</p>
                        <div className='flex flex-col gap-1'>
                            <span className='text-teal-500'>Phone Number</span>
                            <input id="phoneNo_login" type='text' pattern='[0-9]{10}' placeholder='Enter your phone number' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none' />
                        </div>
                        <button type="button" className='py-4 px-8 bg-teal-500 rounded-lg mt-5 text-white self-center' onClick={async (e) => {
                            e.preventDefault();

                            const email = document.getElementById("email_login") as HTMLInputElement;
                            /* const phoneno = document.getElementById("phoneno") as HTMLInputElement; */

                            const bodyContent = JSON.stringify({
                                "email": email.value
                            });

                            const response = await fetch(`http://localhost:3001/api/${userType}/login/otp`, {
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
                    </form>
                    <div className='flex flex-col gap-3 items-center justify-center mt-3'>
                        <input id="otp_login" type='text' placeholder='Enter OTP' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none self-stretch' />
                        <button type="submit" className='py-[15px] px-8 bg-teal-500 rounded-lg text-white self-center' onClick={() => {
                            const form = document.querySelector("#loginForm") as HTMLFormElement;
                            form?.requestSubmit();
                        }}>Log In</button>
                    </div>
                </div>
            </div>
        </dialog >
    )
}
