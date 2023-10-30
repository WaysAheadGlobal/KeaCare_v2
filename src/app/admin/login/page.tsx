"use client"

import React from 'react'
import adminLoginBackground from '../../../../public/adminLoginBackground.jpg'
import logo from "../../../../public/logo.png"
import Image from 'next/image'
import { useCookies } from '@/Hooks/useCookies'
import { useRouter } from 'next/navigation'

type FormData = {
    name: string;
    email: string;
    password: string;
};

export default function Login() {
    const [formData, setFormData] = React.useState<FormData>({} as FormData);
    const router = useRouter();
    const cookies = useCookies();

    React.useEffect(() => {
        async function verifyToken(token: string) {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/admin/verify-token`, {
                method: "POST",
                headers: {
                    "Authorization": `${token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (data.success) {
                router.push("/admin/dashboard");
            } else {
                cookies.deleteCookie("adminToken");
            }
        }

        const token = cookies.getCookie("adminToken");

        if (token) {
            verifyToken(token);
        }
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        cookies.setCookie("adminToken", data.token, 1, "/admin");
        router.push("/admin/dashboard");
    }

    return (
        <main
            className='bg-center bg-cover h-[100dvh] flex items-center justify-center p-4'
            style={{
                backgroundImage: `url('${adminLoginBackground.src}')`
            }}
        >
            <form
                className='p-[2rem] md:p-[3rem] flex flex-col gap-4 items-center justify-center rounded-lg shadow-lg w-full md:w-auto'
                onChange={(e) => {
                    setFormData({
                        ...formData,
                        [(e.target as any).name]: (e.target as any).value
                    })
                }}
                onSubmit={handleSubmit}
            >
                <Image src={logo} width={logo.width} height={logo.height} alt={"Logo"} className='w-[7rem] h-[9rem]' />
                <h1 className="text-3xl font-semibold">Admin Login</h1>
                <div className='flex flex-col gap-1 w-full'>
                    <span>Email</span>
                    <input type="email" name="email" required className='border-2 hover:border-teal-700 hover:ring-2 hover:ring-teal-500 focus:border-teal-700 focus:ring-2 focus:ring-teal-500 p-2 outline-none w-full md:w-[30rem] rounded-md' />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <span>Password</span>
                    <input type="password" name="password" required className='border-2 hover:border-teal-700 hover:ring-2 hover:ring-teal-500 focus:border-teal-700 focus:ring-2 focus:ring-teal-500 p-2 outline-none w-full md:w-[30rem] rounded-md' />
                </div>
                <span className='flex-grow'></span>
                <button className='bg-teal-500 text-white hover:bg-teal-600 px-[2rem] py-[1rem] rounded-lg'>Login</button>
            </form>
        </main>
    )
}
