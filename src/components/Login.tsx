"use client"

import React, { useContext } from 'react'
import { IoClose } from 'react-icons/io5'
import { ImFacebook2 } from 'react-icons/im'
import { FcGoogle } from 'react-icons/fc'
import UserTypeContext from '@/context/UserType'

export default function Login() {
    const { userType } = useContext(UserTypeContext);
    
    return (
        <dialog id="login" className='rounded-lg'>
            <div className='flex flex-col gap-3'>
                <IoClose className='self-end text-2xl relative z-10' onClick={() => {
                    (document.getElementById("login") as HTMLDialogElement).close();
                }} />
                <div className='flex flex-col gap-3 -mt-10 p-5'>
                    <h1 className='text-3xl font-semibold'>Login as a {userType}</h1>
                    <h2 className='text-2xl'>Create a new account. <span className='text-teal-500 cursor-pointer' onClick={() => {
                        (document.getElementById("login") as HTMLDialogElement).close();
                        (document.getElementById("signup") as HTMLDialogElement).showModal();
                    }}>Sign up</span></h2>
                    <div className='flex flex-row gap-2'>
                        <button className='bg-[#4267b2] flex flex-row items-center justify-center px-5 py-3 gap-3 text-white rounded-lg'>
                            <ImFacebook2 className='text-3xl' />
                            <p className='text-xl'>Log in with Facebook</p>
                        </button>
                        <button className='bg-[#4285f4] flex flex-row items-center justify-center px-5 py-3 gap-3 text-white rounded-lg'>
                            <div className='p-1 bg-white rounded-full'>
                                <FcGoogle className='text-3xl' />
                            </div>
                            <p className='text-xl'>Log in with Google</p>
                        </button>
                    </div>
                    <p className='text-xl text-teal-500 self-center mt-3'>OR</p>
                    <form action="" className='flex flex-col'>
                        <div className='flex flex-col gap-1'>
                            <span className='text-teal-500'>Email</span>
                            <input type='text' placeholder='Enter your email address' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-4 outline-none' />
                        </div>
                        <p className='text-xl text-teal-500 self-center mt-5'>OR</p>
                        <div className='flex flex-col gap-1'>
                            <span className='text-teal-500'>Phone Number</span>
                            <input type='text' placeholder='Enter your email address' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-4 outline-none' />
                        </div>
                        <button className='py-4 px-8 bg-teal-500 rounded-lg mt-5 text-white self-center'>Send OTP</button>
                    </form>
                    <div className='flex flex-row gap-3 items-center justify-center mt-3'>
                        <input type='text' placeholder='Enter OTP' className='border-2 border-teal-500 rounded-lg hover:ring-2 hover:ring-teal-400 p-3 outline-none self-center' />
                        <button className='py-[15px] px-8 bg-teal-500 rounded-lg text-white self-center'>Log In</button>
                    </div>
                </div>
            </div>
        </dialog >
    )
}
