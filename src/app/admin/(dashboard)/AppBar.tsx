"use client"

import React, { useEffect } from 'react'
import logo from "../../../../public/logo.png"
import Image from 'next/image'
import { MdAccountCircle } from 'react-icons/md';
import { FaBell } from 'react-icons/fa'
import { Menu, MenuItem } from '@mui/material';
import { BsChevronDown } from "react-icons/bs"
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCookies } from '@/Hooks/useCookies';
export default function AppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const router = useRouter();
    const cookies = useCookies();

    useEffect(() => {
        if (!cookies.getCookie("adminToken")) {
            router.push("/admin/login");
        }
    })

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <nav className='flex flex-row items-center justify-between py-[1rem] px-[3rem] shadow-lg bg-white'>
            <Image src={logo} width={logo.width} height={logo.height} alt={"logo"} className='w-[5rem] h-[5rem] object-contain object-center' />
            <div className='flex flex-row gap-[1rem] items-center justify-center'>
                <FaBell className='text-2xl text-gray-300' />
                <MdAccountCircle className='text-3xl text-gray-300' />
                <div>
                    <button
                        className='flex items-center justify-center gap-2'
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Admin
                        <BsChevronDown />
                    </button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem className='sm:hidden' onClick={handleClose}>
                            <Link href="/admin/dashboard">
                                Dashboard
                            </Link>
                        </MenuItem>
                        <MenuItem className='sm:hidden' onClick={handleClose}>
                            <Link href="/admin/vettinglist">
                                Vetting List
                            </Link>
                        </MenuItem>
                        <MenuItem className='sm:hidden' onClick={handleClose}>
                            <Link href={"/payments"}>
                                Payments
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        </nav>
    )
}
