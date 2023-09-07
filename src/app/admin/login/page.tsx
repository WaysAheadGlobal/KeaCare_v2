import React from 'react'
import adminLoginBackground from '../../../../public/adminLoginBackground.jpg'
import logo from "../../../../public/logo.png"
import Image from 'next/image'

export default function Login() {
    return (
        <main
            className='bg-center bg-cover h-[100dvh] flex items-center justify-center p-4'
            style={{
                backgroundImage: `url('${adminLoginBackground.src}')`
            }}
        >
            <form className='p-[2rem] md:p-[3rem] flex flex-col gap-4 items-center justify-center rounded-lg shadow-lg w-full md:w-auto'>
                <Image src={logo} width={logo.width} height={logo.height} alt={"Logo"} className='w-[7rem] h-[9rem]' />
                <h1 className="text-3xl font-semibold">Admin Login</h1>
                <div className='flex flex-col gap-1 w-full'>
                    <span>Email</span>
                    <input type="email" required className='border-2 hover:border-teal-700 hover:ring-2 hover:ring-teal-500 focus:border-teal-700 focus:ring-2 focus:ring-teal-500 p-2 outline-none w-full md:w-[30rem] rounded-md' />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <span>Password</span>
                    <input type="password" required className='border-2 hover:border-teal-700 hover:ring-2 hover:ring-teal-500 focus:border-teal-700 focus:ring-2 focus:ring-teal-500 p-2 outline-none w-full md:w-[30rem] rounded-md' />
                </div>
                <span className='flex-grow'></span>
                <button className='bg-teal-500 text-white hover:bg-teal-600 px-[2rem] py-[1rem] rounded-lg'>Login</button>
            </form>
        </main>
    )
}
