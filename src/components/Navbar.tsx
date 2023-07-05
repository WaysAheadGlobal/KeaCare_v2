"use client"

import React, { useContext } from 'react'
import Image from 'next/image'
import logo from '../../public/logo.png'
import { HiMenu } from 'react-icons/hi'
import UserTypeContext from '@/context/UserType'

export default function Navbar() {
    const { setUserType } = useContext(UserTypeContext);

    return (
        <header>
            <nav>
                <section className='flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-[3rem] justify-between px-8 pt-5 pb-1 h-[7rem] overflow-hidden'>
                    <Image src={logo.src} width={logo.width} height={logo.height} alt='KeaCare logo' className='w-[4rem]' />
                    <HiMenu className='text-3xl absolute right-8 top-8 block md:hidden' onClick={(e) => {
                        e.currentTarget.parentElement?.classList.toggle('h-[7rem]');
                        e.currentTarget.parentElement?.classList.toggle('h-full');
                    }} />
                    <div className='md:flex-grow'></div>
                    <ul className='flex flex-col md:flex-row gap-3'>
                        <li>Home</li>
                        <li onClick={() => {
                            document.getElementById("about")?.scrollIntoView({
                                behavior: "smooth",
                                inline: 'center'
                            })
                        }}>About Us</li>
                        <li onClick={() => {
                            document.getElementById("leaders")?.scrollIntoView({
                                behavior: "smooth",
                                inline: 'center'
                            })
                        }}>Leadership</li>
                        <li onClick={() => {
                            document.getElementById("working")?.scrollIntoView({
                                behavior: "smooth",
                                inline: 'center'
                            })
                        }}>How It Works</li>
                        <li onClick={() => {
                            document.getElementById("responsive_compassionate")?.scrollIntoView({
                                behavior: "smooth",
                                inline: 'center'
                            })
                        }}>Book a Service</li>
                    </ul>
                    <div className='flex flex-row gap-5'>
                        <button className='border-2 border-gray-500 text-gray-500 bg-inherit hover:border-white hover:bg-gray-500 hover:text-white px-5 py-3 rounded-lg' onClick={() => {
                            const dialog = document.getElementById("loginOption") as HTMLDialogElement;
                            if (dialog.open) {
                                dialog.close();
                            } else if (window.innerWidth <= 1280) {
                                dialog.showModal();
                            } else {
                                dialog.show();
                            }
                        }}>Log In/Sign up</button>
                        <dialog id="loginOption" className='rounded-lg font-semibold space-y-3 xl:left-[57rem] xl:top-[6rem] z-10'>
                            <p className='cursor-pointer' onClick={() => {
                                (document.getElementById("login") as HTMLDialogElement).showModal();
                                setUserType("careseeker");
                            }}>Careseeker</p>
                            <p className='cursor-pointer' onClick={() => {
                                (document.getElementById("login") as HTMLDialogElement).showModal();
                                setUserType("caregiver");
                            }}>Caregiver</p>
                        </dialog>
                        <button className='px-5 py-3 rounded-full bg-red-600 text-white'>SOS/Emergency</button>
                    </div>
                </section>
            </nav>
        </header>
    )
}
