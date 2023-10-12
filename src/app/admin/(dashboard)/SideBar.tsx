"use client"

import React from 'react'
import { MdSpaceDashboard, MdPayment, MdAccountCircle } from "react-icons/md"
import { RiUserSearchLine } from "react-icons/ri"
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function SideBar() {
    const pathname = usePathname();

    return (
        <section className="bg-teal-500 py-[2rem] hidden sm:block">
            <div className='sticky top-16'>
                <div className='self-center flex flex-col gap-2 items-center justify-center text-white'>
                    <MdAccountCircle className='text-[5rem]' />
                    <p className='text-lg'>Administrative</p>
                    <p className='text-lg'>KeaCare</p>
                </div>
                <Link href="/admin/dashboard" className={`flex p-2 px-[2rem] items-center gap-2 mt-[1.5rem] ${pathname === "/admin/dashboard" ? "bg-white text-teal-500" : "text-white"}`}>
                    <MdSpaceDashboard className='text-xl' />
                    <p>Dashboard</p>
                </Link>
                <Link href="/admin/vettinglist" className={`flex p-2 px-[2rem] items-center gap-2 ${pathname === "/admin/vettinglist" ? "bg-white text-teal-500" : "text-white"}`}>
                    <RiUserSearchLine className='text-xl' />
                    <p>Vetting List</p>
                </Link>
                <Link href={"/admin/payments"} className={`flex items-center p-2 px-[2rem] gap-2 ${pathname === "/admin/payments" ? "bg-white text-teal-500" : "text-white"}`}>
                    <MdPayment className='text-xl' />
                    <p>Payment</p>
                </Link>
            </div>
        </section>
    )
}
