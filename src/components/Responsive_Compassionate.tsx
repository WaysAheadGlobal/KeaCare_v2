import React from 'react'
import Image from 'next/image'
import seniorCare from '../../public/seniorCare.png'
import childCare from '../../public/childCare.png'
import mobile from '../../public/mobile.png'
import playstore from '../../public/playstore.png'


export default function Responsive_Compassionate() {
    return (
        <section id="responsive_compassionate" className='p-20'>
            <h1 className='text-teal-500 text-center text-3xl font-semibold mb-20'>Responsive & Compassionate</h1>
            <div className='flex flex-col md:flex-row gap-10 items-center justify-center'>
                <div className='rounded-xl w-[20rem] p-5 flex flex-col gap-5 shadow-md hover:shadow-xl'>
                    <Image src={seniorCare.src} width={seniorCare.width} height={seniorCare.height} alt='Senior Care' className='w-[10rem] self-center' />
                    <p className='font-bold text-teal-700'>Senior Care</p>
                    <p>We have specialist and trusted elderly care takers equipped to help you in your own home.</p>
                    <button className='border-2 hover:border-teal-500 hover:text-teal-500 hover:bg-white border-white bg-teal-500 text-white px-5 py-3 rounded-lg'>Book Now</button>
                </div>
                <div className='rounded-xl w-[20rem] p-5 flex flex-col gap-5 shadow-md hover:shadow-xl'>
                    <Image src={childCare.src} width={childCare.width} height={childCare.height} alt='Child Care' className='w-[10rem] self-center' />
                    <p className='font-bold text-teal-700'>Senior Care</p>
                    <p>We have specialist and trusted elderly care takers equipped to help you in your own home.</p>
                    <button className='border-2 hover:border-teal-500 hover:text-teal-500 hover:bg-white border-white bg-teal-500 text-white px-5 py-3 rounded-lg'>Book Now</button>
                </div>
            </div>
            <div className='flex flex-col xl:flex-row gap-10 mt-[5rem] items-center justify-center'>
                <Image src={mobile.src} width={mobile.width} height={mobile.height} alt='KeaCare Mobile App' className='w-[20rem]' />
                <div className='flex flex-col gap-5 w-full xl:w-[30rem]'>
                    <p className='text-5xl text-teal-500 font-semibold'>Join us on Mobile</p>
                    <p className='text-2xl'>Download our App from below</p>
                    <Image src={playstore.src} width={playstore.width} height={playstore.height} alt='Download the App' />
                </div>
            </div>
        </section>
    )
}
