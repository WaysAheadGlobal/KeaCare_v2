"use client"

import React, { useContext, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import UserTypeContext from '@/context/UserType'
import { useRouter } from 'next/navigation'
import Alert from './Alert'
import AlertContext from './AlertContext'
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google'

import { useCookies } from '@/Hooks/useCookies'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js/types'
import SingupAdsPicture from '../../public/SingupAdsPicture.png';


export default function Login() {
    const { userType } = useContext(UserTypeContext);
    const router = useRouter();
    const { setAlert } = useContext(AlertContext);
    const cookies = useCookies();
    const [phoneNo, setPhoneNo] = useState<E164Number>();

    async function handleGoogleLogin(credentials: CredentialResponse) {
        const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/${userType}/google-login`, {
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
        const phoneno = document.getElementById("phoneNo_login") as HTMLInputElement;

        if (!email.value && !phoneno.value.split(" ")[1]) {
            setAlert({
                type: "error",
                message: "Please enter either email or phone number.",
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
                "email": email.value,
                "phoneNo": phoneno.value.split(" ").length !== 1 ? phoneno.value.substring(phoneno.value.indexOf(" ") + 1).replaceAll(" ", "") : "",
                "countryCode": phoneno.value.substring(0, phoneno.value.indexOf(" "))
            });


            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/${userType}/login/otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: bodyContent
            });

            const data: any = await response.json();
            if (data?.otp) {
                setAlert({
                    type: "success",
                    message: "OTP sent please check your mail.",
                    open: true
                });
            }
            else if (data?.success) {
                setAlert({
                    type: "success",
                    message: "OTP sent please check your messages.",
                    open: true
                });
            }
            else if (data?.error) {
                setAlert({
                    type: "error",
                    message: data?.error,
                    open: true
                });
            }
        } catch (error) {
            setAlert({
                type: "error",
                message: "Couldn't send OTP please check your email address or phone number or try after some time.",
                open: true
            });
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const email = document.getElementById("email_login") as HTMLInputElement;
        const phoneno = document.getElementById("phoneNo_login") as HTMLInputElement;
        const otp = document.getElementById("otp_login") as HTMLInputElement;

        if (!email.value && !phoneno.value.split(" ")[1]) {
            setAlert({
                type: "error",
                message: "Please enter either email or phone number.",
                open: true
            });
            return;
        }

        const bodyContent = JSON.stringify({
            'email': email.value,
            'token': otp.value,
            "phoneNo": phoneno.value.split(" ").length !== 1 ? phoneno.value.substring(phoneno.value.indexOf(" ") + 1).replaceAll(" ", "") : "",
            "countryCode": phoneno.value.substring(0, phoneno.value.indexOf(" "))
        });

        const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/${userType}/login`, {
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
        <dialog id="login" className='rounded-lg backdrop:bg-black backdrop:bg-opacity-70 p-0 w-full sm:w-[40rem]'>
            <Alert />
               <div className='flex flex row '>
                <div className="hidden md:block">
  <img src={SingupAdsPicture.src} className="w-48 h-full" />
</div> 

            <div className='flex flex-col  gap-3 p-2 sm:w-[30rem]'>
                <IoClose className='self-end text-2xl relative z-10' onClick={() => {
                    (document.getElementById("login") as HTMLDialogElement).close();
                }} />
                <div className='flex flex-col  gap-3 -mt-10 p-5 '>
                    <h1 className=' font-semibold text-teal-600 m-auto text-2xl uppercase' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>JOIN US NOW AS A {userType}</h1>

                    <h1 className=' font-medium m-auto text-xl'>and touch details of thousands</h1>
                    <h1 className=' font-medium m-auto text-xl'>qualified  <span>{userType=== "careseeker" ? "Care giver" : "Care taker"}</span> profile</h1>
                    <h1 className=' font- text-gray-600 m-auto text-xl mtt-6' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>Create a new account. <span className='text-teal-500 cursor-pointer' onClick={() => {
                        (document.getElementById("login") as HTMLDialogElement).close();
                        (document.getElementById("signup") as HTMLDialogElement).showModal();
                    }}>Sign up</span></h1>
                    <div className='flex flex-col md:flex-row gap-2'>
                        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
                            <GoogleLogin 
                                onSuccess={handleGoogleLogin}
                                onError={() => { }}

                            />
                        </GoogleOAuthProvider>
                        <div>
                    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
                            <GoogleLogin 
                                onSuccess={handleGoogleLogin}
                                onError={() => { }}
                            />
                        </GoogleOAuthProvider>
                    </div>
                    </div>
            
                 
                    <p className='text-lg text-teal-500 self-center'>OR</p>
                    <form id="loginForm" className='flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-1'>
                            <span className='text-teal-500'>Email*</span>
                            <input id="email_login" type='email' placeholder='Enter your email address' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none focus:invalid:border-red-500' />
                        </div>
                        <p className='text-lg text-teal-500 self-center'>OR</p>
                        <div className='flex flex-col gap-1'>
                            <span className='text-teal-500'>Phone Number</span>
                            <PhoneInput
                                international
                                id="phoneNo_login"
                                placeholder="Enter phone number"
                                countryCallingCodeEditable={false}
                                defaultCountry="CA"
                                value={phoneNo}
                                onChange={setPhoneNo}
                                style={{
                                    border: "2px solid #38B2AC",
                                    borderRadius: "0.5rem",
                                    padding: "0.75rem",
                                    outline: "none",
                                    display: "grid",
                                    gridTemplateColumns: "2rem 1fr",
                                    gap: "1rem"
                                }}
                                limitMaxLength={true}
                            />
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
            </div>
        </dialog>
    )
}
