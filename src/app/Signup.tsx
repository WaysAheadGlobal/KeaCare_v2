"use client"

import React, { useContext, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import UserTypeContext from '@/context/UserType'
import { useRouter } from 'next/navigation'
import SignupResponse from '@/interface/SignupResponse'
import Alert from './Alert'
import AlertContext from './AlertContext'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js/types'

export default function Signup() {
    const { userType } = useContext(UserTypeContext);
    const router = useRouter();
    const { setAlert } = useContext(AlertContext);
    const [phoneNo, setPhoneNo] = useState<E164Number>();

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const email = document.getElementById("email_signup") as HTMLInputElement;
        const phoneno = document.getElementById("phoneNo_signup") as HTMLInputElement;
        const otp_element = e.currentTarget.previousElementSibling as HTMLInputElement;

        if (!email.value && !phoneno.value.split(" ")[1]) {
            setAlert({
                type: "error",
                message: "Please enter either email or phone number.",
                open: true
            });
            return;
        }

        const bodyContent = JSON.stringify({
            "email": email.value,
            "phoneNo": phoneno.value.split(" ").length !== 1 ? phoneno.value.substring(phoneno.value.indexOf(" ") + 1).replaceAll(" ", "") : "",
            "countryCode": phoneno.value.substring(0, phoneno.value.indexOf(" ")),
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
            sessionStorage.setItem("phoneno", (document.getElementById("phoneNo_signup") as HTMLInputElement).value);
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
    }

    const requestOTP = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const email = document.getElementById("email_signup") as HTMLInputElement;
        const phoneno = document.getElementById("phoneNo_signup") as HTMLInputElement;

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

            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/${userType}/signup/otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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
                message: "Couldn't send OTP please check your mail or try after some time.",
                open: true
            });
        }

    }

    return (
        <dialog id="signup" className='rounded-lg backdrop:bg-black backdrop:bg-opacity-70 p-0'>
            <Alert />
            <div className='flex flex-col gap-3 p-2 w-screen sm:w-[30rem]'>
                <IoClose className='self-end text-2xl relative z-10' onClick={() => {
                    (document.getElementById("signup") as HTMLDialogElement).close();
                }} />
                <div className='flex flex-col gap-3 -mt-10 p-5'>
                    <h1 className='text-xl font-semibold'>Signup as a {userType}</h1>
                    <h2 className='text-lg'>Already a Member? <span className='text-teal-500 cursor-pointer' onClick={() => {
                        (document.getElementById("signup") as HTMLDialogElement).close();
                        (document.getElementById("login") as HTMLDialogElement).showModal();
                    }}>Log In</span></h2>
                    <form className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-1'>
                            <span className='text-teal-500'>Email*</span>
                            <input type='text' id="email_signup" placeholder='Enter your email address' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none invalid:focus:border-red-500' required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <span className='text-teal-500'>Phone Number</span>
                            <PhoneInput
                                international
                                id="phoneNo_signup"
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
                        <div className='flex flex-col md:flex-row gap-3 items-center justify-center'>
                            <button className='py-[0.8rem] px-8 bg-teal-500 rounded-lg text-white self-center hover:bg-white hover:text-teal-500 hover:outline hover:outline-teal-500 focus:bg-white focus:text-teal-500 focus:outline focus:outline-teal-500' onClick={requestOTP}>Send OTP</button>
                        </div>
                    </form>
                    <div className='flex flex-col gap-3 items-center justify-start mt-3'>
                        <input type='text' placeholder='Enter OTP' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none self-stretch' autoComplete='off' />
                        <button className='py-[0.8rem] px-8 bg-teal-500 rounded-lg text-white self-center hover:bg-white hover:text-teal-500 hover:outline hover:outline-teal-500 focus:bg-white focus:text-teal-500 focus:outline focus:outline-teal-500' onClick={handleSubmit}>Sign Up</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}
