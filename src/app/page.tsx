"use client"

import React, { useContext } from 'react'
import dynamic from "next/dynamic"
import { Menu } from '@mantine/core'
import UserTypeContext from '@/context/UserType'
import { BsRobot } from 'react-icons/bs'

const HowItWorks = dynamic(() => import('@/app/HowItWorks'));
const Leaders = dynamic(() => import('@/app/Leaders'));
const Responsive_Compassionate = dynamic(() => import('@/app/Responsive_Compassionate'));
const Introduction = dynamic(() => import('@/app/Introduction'));
const Banners = dynamic(() => import('@/app/banners'));
const ValueProposition = dynamic(() => import('@/app/ValueProposition'));
const AboutUs = dynamic(() => import('@/app/AboutUs'));
const Chat = dynamic(() => import('@/app/Chat'));
const Services = dynamic(()=> import('@/app/Services'));


export default function Home() {
    const { setUserType } = useContext(UserTypeContext);
    return (
        <>
            <Banners/>
            <Services/>
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
