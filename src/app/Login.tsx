"use client"

import React, { useContext, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import UserTypeContext from '@/context/UserType'
import { useRouter } from 'next/navigation'
import Otp from '@/interface/Otp'
import Alert from './Alert'
import AlertContext from './AlertContext'
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google'
import { useCookies } from '@/Hooks/useCookies'

export default function Login() {
    const { userType } = useContext(UserTypeContext);
    const router = useRouter();
    const [Otp, setOtp] = useState<string>("");
    const { setAlert } = useContext(AlertContext);
    const cookies = useCookies();

    async function handleGoogleLogin(credentials: CredentialResponse) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/keacare/api/${userType}/google-login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "token": credentials.credential
            })
        });
        const data = await response.json();
        if (data.error) {
            setAlert({
                type: "error",
                message: data.error,
                open: true
            });
        }
    }

    async function requestOTP(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        const email = document.getElementById("email_login") as HTMLInputElement;
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

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/keacare/api/${userType}/login/otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: bodyContent
            });

            const data: Otp = await response.json();
            if (data.otp) {
                setAlert({
                    type: "success",
                    message: "OTP sent please check your mail.",
                    open: true
                });
                setOtp(data?.otp.toString());
            } else if (data.error) {
                setAlert({
                    type: "error",
                    message: data.error,
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
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const email = document.getElementById("email_login") as HTMLInputElement;
        /* const phoneNo = document.getElementById("phoneNo_login") as HTMLInputElement; */
        const otp = document.getElementById("otp_login") as HTMLInputElement;

        const bodyContent = JSON.stringify({
            'email': email.value,
            'token': otp.value
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/keacare/api/${userType}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyContent
        });

        const data: any = await response.json();

        cookies.setCookie("token", data?.jwtToken, 365, "/");

        switch (data?.status) {
            case "incomplete":
                document.querySelectorAll("dialog").forEach(dialog => {
                    dialog.close();
                });
                sessionStorage.setItem("email", data?.email.toString());
                router.push(`/${userType}/registration`);
                break;

            case "inactive":
                document.querySelectorAll("dialog").forEach(dialog => {
                    dialog.close();
                });
                sessionStorage.setItem("email", data?.email.toString());
                sessionStorage.setItem("pricing", "redo");
                router.push("/pricing");
                break;

            case "active":
                document.querySelectorAll("dialog").forEach(dialog => {
                    dialog.close();
                });
                sessionStorage.setItem("email", data?.email.toString());
                if (userType === "careseeker") {
                    router.push("/dashboard");
                } else {
                    router.push("/caregiver/account");
                }
                break;

        }
        if (data?.error) {
            setAlert({
                type: "error",
                message: data.error,
                open: true
            });
        }
    }


    return (
        <dialog id="login" className='rounded-lg backdrop:bg-black backdrop:bg-opacity-70 p-0 w-full sm:w-[30rem]'>
            <Alert />
            <div className='flex flex-col gap-3 p-2 sm:w-[30rem]'>
                <IoClose className='self-end text-2xl relative z-10' onClick={() => {
                    (document.getElementById("login") as HTMLDialogElement).close();
                }} />
                <div className='flex flex-col gap-3 -mt-10 p-5'>
                    <h1 className='text-xl font-semibold'>Login as a {userType}</h1>
                    <h2 className='text-lg'>Create a new account. <span className='text-teal-500 cursor-pointer' onClick={() => {
                        (document.getElementById("login") as HTMLDialogElement).close();
                        (document.getElementById("signup") as HTMLDialogElement).showModal();
                    }}>Sign up</span></h2>
                    <div className='flex flex-col md:flex-row gap-2'>
                        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => { }}

                            />
                        </GoogleOAuthProvider>
                    </div>
                    <p className='text-lg text-teal-500 self-center'>OR</p>
                    <form id="loginForm" className='flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-1'>
                            <span className='text-teal-500'>Email*</span>
                            <input id="email_login" type='email' placeholder='Enter your email address' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none focus:invalid:border-red-500' required />
                        </div>
                        <p className='text-lg text-teal-500 self-center'>OR</p>
                        <div className='flex flex-col gap-1'>
                            <span className='text-teal-500'>Phone Number</span>
                            <input id="phoneNo_login" type='text' pattern='[0-9]{10}' placeholder='Enter your phone number' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none' maxLength={10} minLength={10} />
                        </div>
                        <button type="button" className='py-4 px-8 bg-teal-500 rounded-lg mt-5 text-white self-center hover:bg-white hover:text-teal-500 hover:outline hover:outline-teal-500 focus:bg-white focus:text-teal-500 focus:outline focus:outline-teal-500' onClick={requestOTP}>Send OTP</button>
                    </form>
                    <div className='flex flex-col gap-3 items-center justify-center mt-3'>
                        <input id="otp_login" type='text' placeholder='Enter OTP' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none self-stretch' autoComplete='off' />
                        <button type="submit" className='py-[15px] px-8 bg-teal-500 rounded-lg text-white self-center hover:bg-white hover:text-teal-500 hover:outline hover:outline-teal-500 focus:bg-white focus:text-teal-500 focus:outline focus:outline-teal-500' onClick={() => {
                            const form = document.querySelector("#loginForm") as HTMLFormElement;
                            form?.requestSubmit();
                        }}>Log In</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}
