"use client"

import Link from 'next/link'
import React from 'react'
import { HiMail } from 'react-icons/hi'
import { BsInstagram } from 'react-icons/bs'
import { SiLinkedin } from 'react-icons/si'
import { ImFacebook2 } from 'react-icons/im'
import { FaTwitterSquare } from 'react-icons/fa'
import { usePathname, useRouter } from 'next/navigation'

export default function Footer() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <footer className="bg-teal-500 flex flex-col md:flex-row flex-wrap gap-10 items-start md:items-center justify-between p-10 text-white bg-[url('../../public/worldMap.png')] bg-no-repeat bg-cover bg-center min-h-[36.2rem]">
            <div className='w-full md:w-[27rem] space-y-5'>
                <h1 className='text-3xl font-bold'>KEA.CARE</h1>
                <p className='text-2xl font-semibold'>HYPERLOCAL PLATFORM FOR ON DEMAND CARE FOR SERVICES</p>
            </div>
            <div className='text-lg'>
                <p className='text-3xl font-semibold mb-5'>Menu</p>
                <ul className='space-y-3'>
                    <li className='cursor-pointer hover:text-red-500' onClick={() => {
                        if (pathname !== "/") {
                            router.push("/");
                        }
                        document.querySelector("body")?.scrollIntoView({
                            behavior: "smooth",
                            inline: 'start'
                        });
                    }}>Home</li>
                    <li className='cursor-pointer hover:text-red-500' onClick={() => {
                        if (pathname !== "/") {
                            router.push("/#about");
                        }
                        document.getElementById("about")?.scrollIntoView({
                            behavior: "smooth",
                            inline: 'center'
                        })
                    }}>About Us</li>
                    <li className='cursor-pointer hover:text-red-500' onClick={() => {
                        if (pathname !== "/") {
                            router.push("/#leaders");
                        }
                        document.getElementById("leaders")?.scrollIntoView({
                            behavior: "smooth",
                            inline: 'center'
                        })
                    }}>Leadership</li>
                    <li className='cursor-pointer hover:text-red-500' onClick={() => {
                        if (pathname !== "/") {
                            router.push("/#working");
                        }
                        document.getElementById("working")?.scrollIntoView({
                            behavior: "smooth",
                            inline: 'center'
                        })
                    }}>How It Works</li>
                    <li className='cursor-pointer hover:text-red-500' onClick={() => {
                        if (pathname !== "/") {
                            router.push("/#responsive_compassionate");
                        }
                        document.getElementById("responsive_compassionate")?.scrollIntoView({
                            behavior: "smooth",
                            inline: 'center'
                        })
                    }}>Book a Service</li>
                </ul>
            </div>
            <div className='text-lg'>
                <p className='text-3xl font-semibold mb-5'>Social</p>
                <ul className='flex flex-col gap-3'>
                    <li>
                        <Link href={'https://www.facebook.com/profile.php?id=100089051234163'} target='_blank' className='flex gap-3 items-center justify-start'>
                            <ImFacebook2 />
                            Facebook
                        </Link>
                    </li>
                    <li>
                        <Link href={'http://twitter.com/'} target='_blank' className='flex gap-3 items-center justify-start'>
                            <FaTwitterSquare />
                            Twitter
                        </Link>
                    </li>
                    <li>
                        <Link href={'http://instagram.com/'} target='_blank' className='flex gap-3 items-center justify-start'>
                            <BsInstagram />
                            Instagram
                        </Link>
                    </li>
                    <li>
                        <Link href={'https://www.linkedin.com/company/keacare/'} target='_blank' className='flex gap-3 items-center justify-start'>
                            <SiLinkedin />
                            LinkedIn
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='text-lg space-y-3'>
                <p className='text-3xl font-semibold mb-5'>Contact</p>
                <p>4170 Still Creek Dr, Burnaby, BC, Canada, V5C 6C6</p>
                <p className='flex flex-row gap-3 items-center justify-start'>
                    <HiMail />
                    contact@KeaCare.com
                </p>
            </div>
        </footer>
    )
}
