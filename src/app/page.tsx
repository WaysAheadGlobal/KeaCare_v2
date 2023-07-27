"use client"

import React, { useContext } from 'react'
import AboutUs from '@/components/AboutUs'
import HowItWorks from '@/components/HowItWorks'
import Introduction from '@/components/Introduction'
import Leaders from '@/components/Leaders'
import Responsive_Compassionate from '@/components/Responsive_Compassionate'
import ValueProposition from '@/components/ValueProposition'
import Introduction_New from '@/components/Introduction_New'
import ValueProposition_New from '@/components/ValueProposition_New'
import AboutUs_New from '@/components/AboutUs_New'
import Chat from '@/components/Chat'
import { Menu } from '@mantine/core'
import UserTypeContext from '@/context/UserType'
import { BsRobot } from 'react-icons/bs'


export default function Home() {
    const { setUserType } = useContext(UserTypeContext);
    return (
        <>
            {/* <Introduction /> */}
            <Introduction_New />
            {/* <AboutUs /> */}
            <AboutUs_New />
            {/* <ValueProposition /> */}
            <ValueProposition_New />
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
