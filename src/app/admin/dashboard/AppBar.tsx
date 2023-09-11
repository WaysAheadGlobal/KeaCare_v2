"use client"

import React from 'react'
import logo from "../../../../public/logo.png"
import Image from 'next/image'
import { FiMenu } from 'react-icons/fi';
import { MdAccountCircle } from 'react-icons/md';
import { FaBell } from 'react-icons/fa'
import { Menu, MenuItem } from '@mui/material';
import { BsChevronDown } from "react-icons/bs"

export default function AppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <nav className='flex flex-row items-center justify-between py-[1rem] px-[3rem] shadow-lg'>
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
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        </nav>
    )
}
