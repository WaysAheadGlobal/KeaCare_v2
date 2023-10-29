"use client"

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '../../public/logo.png'
import { HiMenu } from 'react-icons/hi'
import UserTypeContext from '@/context/UserType'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu } from '@mantine/core';
import { MdAccountCircle, MdLogout, MdSpaceDashboard } from 'react-icons/md'
import { useCookies } from '@/Hooks/useCookies'

export default function Navbar() {
    const { userType, setUserType } = useContext(UserTypeContext);
    const pathname = usePathname();
    const router = useRouter();
    const [jwtToken, setJWTtoken] = useState<string | null>(null);
    const cookies = useCookies();

    useEffect(() => {
        setJWTtoken(cookies.getCookie("token") as string);
    }, [pathname, userType])

    useEffect(() => {
        document.querySelector("#mainBody")?.addEventListener("click", () => {
            if (document.getElementById("navSection")?.classList.contains('h-full')) {
                document.getElementById("navSection")?.classList.add('h-[7rem]');
                document.getElementById("navSection")?.classList.remove('h-full');
            }
        });
    }, [])

    return (
        <header className={`${pathname === "/" ? 'sticky' : 'relative'} top-0 z-50 bg-white ${pathname === "/" ? "bg-opacity-40" : "bg-opacity-100"} backdrop-blur-md ${pathname.includes("admin") && "hidden"}`}>
            <nav className='shadow-md'>
                <section id="navSection" className='flex flex-col lg:flex-row items-start lg:items-center gap-5 lg:gap-[3rem] justify-between px-8 pt-5 pb-[2rem] sm:pb-2 h-[7rem] overflow-hidden'>
                    <Link href={"/"}>
                        <Image src={logo.src} width={logo.width} height={logo.height} alt='KeaCare logo' className='w-[4rem]' />
                    </Link>
                    <HiMenu className='text-3xl absolute right-8 top-8 block lg:hidden cursor-pointer' onClick={(e) => {
                        e.currentTarget.parentElement?.classList.toggle('h-[7rem]');
                        e.currentTarget.parentElement?.classList.toggle('h-full');
                    }} />
                    <div className='md:flex-grow'></div>
                    <ul className='flex flex-col md:flex-row gap-3'>
                        <li className='cursor-pointer hover:text-red-500'>
                            <Link href={"/"} >
                                Home
                            </Link>
                        </li>
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
                        <li hidden={userType === "caregiver"} className='cursor-pointer hover:text-red-500' onClick={() => {
                            if (pathname !== "/") {
                                router.push("/#responsive_compassionate");
                            }
                            document.getElementById("responsive_compassionate")?.scrollIntoView({
                                behavior: "smooth",
                                inline: 'center'
                            })
                        }}>Book a Service</li>
                    </ul>
                    <div className='flex flex-row gap-5'>
                        <Menu trigger='click' shadow='lg' width={200}>
                            <Menu.Target>
                                <button className={`${jwtToken && 'hidden'} border-2 border-gray-500 text-gray-500 bg-inherit hover:border-white hover:bg-gray-500 hover:text-white px-5 py-3 rounded-lg`}>Join Now</button>
                            </Menu.Target>
                            <Menu.Dropdown className='rounded-lg'>
                                <Menu.Item className='font-semibold text-base hover:bg-teal-500 hover:bg-opacity-60'
                                    onClick={() => {
                                        (document.getElementById("login") as HTMLDialogElement).showModal();
                                        setUserType("careseeker");
                                        sessionStorage.setItem("userType", "careseeker");
                                        cookies.setCookie("userType", "careseeker", 365, "/");
                                    }}>
                                    <span>Careseeker</span>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item className='font-semibold text-base hover:bg-teal-500 hover:bg-opacity-60'
                                    onClick={() => {
                                        (document.getElementById("login") as HTMLDialogElement).showModal();
                                        setUserType("caregiver");
                                        sessionStorage.setItem("userType", "caregiver");
                                        cookies.setCookie("userType", "caregiver", 365, "/");
                                    }}
                                >
                                    <span>Caregiver</span>
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                        <Menu trigger='click' shadow="lg" width={200}>
                            <Menu.Target>
                                <button disabled={pathname === "/pricing" || pathname === "/caregiver/registration" || pathname === "/careseeker/registration"} className={`${!jwtToken && 'hidden'} border-2 border-gray-500 text-gray-500 bg-inherit hover:border-white hover:bg-gray-500 hover:text-white px-5 py-3 rounded-lg cursor-pointer disabled:bg-gray-400`}>My Account</button>
                            </Menu.Target>
                            <Menu.Dropdown className='rounded-lg'>
                                <Link href={"/dashboard"}>
                                    <Menu.Item className={`${(userType === 'caregiver') && 'hidden'} font-semibold hover:bg-teal-500 hover:bg-opacity-60`} icon={<MdSpaceDashboard className='text-xl' />}>
                                        <span>Dashboard</span>
                                    </Menu.Item>
                                </Link>
                                <Menu.Divider />
                                <Link href={`/${userType}/account`}>
                                    <Menu.Item className='font-semibold hover:bg-teal-500 hover:bg-opacity-60' icon={<MdAccountCircle className='text-xl' />}>
                                        <span>Profile</span>
                                    </Menu.Item>
                                </Link>
                                <Menu.Divider />
                                <Menu.Item className='font-semibold hover:bg-teal-500 hover:bg-opacity-60' icon={<MdLogout className='text-xl' />}>
                                    <div role='button' onClick={() => {
                                        cookies.deleteCookie("userType");
                                        cookies.deleteCookie("token");
                                        sessionStorage.removeItem("email");
                                        sessionStorage.removeItem("userType");
                                        sessionStorage.removeItem("planType");
                                        if (pathname === "/") {
                                            window.location.reload();
                                        } else {
                                            window.location.assign("/");
                                        }
                                        setUserType("careseeker")
                                    }}>Log out</div>
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                        <button className='px-5 py-3 rounded-full bg-red-600 text-white'>SOS/Emergency</button>
                    </div>
                </section>
            </nav>
        </header>
    )
}
