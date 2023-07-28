"use client"

import React, { useContext } from 'react'
import HowItWorks from '@/app/HowItWorks'
import Leaders from '@/app/Leaders'
import Responsive_Compassionate from '@/app/Responsive_Compassionate'
import Introduction from '@/app/Introduction'
import ValueProposition from '@/app/ValueProposition'
import AboutUs from '@/app/AboutUs'
import Chat from '@/app/Chat'
import { Menu } from '@mantine/core'
import UserTypeContext from '@/context/UserType'
import { BsRobot } from 'react-icons/bs'


export default function Home() {
    const { setUserType } = useContext(UserTypeContext);
    return (
        <>
            <Introduction />
            <AboutUs />
            <ValueProposition />
            <Leaders />
            <HowItWorks />
            <Responsive_Compassionate />
            <Chat />
            <div className='sticky bottom-0 z-50 text-4xl text-white p-[1rem] flex justify-end'>
                <Menu trigger='click'>
                    <Menu.Target>
                        <button className='bg-teal-500 p-1 rounded-lg'>
                            <BsRobot />
                        </button>
                    </Menu.Target>
                    <Menu.Dropdown className='rounded-lg'>
                        <Menu.Item className='font-semibold text-base hover:bg-teal-500 hover:bg-opacity-60'>
                            <p onClick={() => {
                                (document.querySelector("#chatBox") as HTMLDialogElement).showModal();
                                setUserType("careseeker");
                            }}>Careseeker</p>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item className='font-semibold text-base hover:bg-teal-500 hover:bg-opacity-60'>
                            <p onClick={() => {
                                (document.querySelector("#chatBox") as HTMLDialogElement).showModal();
                                setUserType("caregiver");
                            }}>Caregiver</p>
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
        </>
    )
}
