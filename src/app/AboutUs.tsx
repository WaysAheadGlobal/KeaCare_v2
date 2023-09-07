import React from 'react'
import seniorCare from '../../public/seniorCareAboutUs.jpg'
import Image from 'next/image'

export default function AboutUs() {
    return (
        <section id="about" className="flex flex-col h-[70rem] lg:h-auto lg:grid lg:grid-cols-2 gap-[5rem] p-[2rem] md:p-[5rem] bg-teal-500 bg-opacity-30">
            <div className='space-y-[1rem]'>
                <h1 className='text-4xl font-bold'>About Us</h1>
                <h2 className='text-2xl'>On-demand mobile and web platform of vetted Caregivers</h2>
                <p>
                    The platform would feature a portfolio of family care-related services for our members, including consumer matching services and consumer payments services. Through Kea.care, we are building &apos;hyperlocal care communities&apos;. The hyperlocal aspect applies to the stop-gap care arrangements wherein there is an urgency to avail the service and the families do not have the time to carry out very detailed evaluation/selection process to onboard a carer.
                </p>
                <p>
                    Our platform also enables caregivers to find jobs and manage their careers. Many of these employees are in the informal sector, they are women, immigrants , freelancers.
                </p>
                <p>
                    We use proprietary technology to deliver the most crucial ingredient in an on-demand service: Trust.
                </p>
            </div>
            <div className='rounded-lg relative overflow-hidden mr-[2rem] h-full w-full'>
                <Image id="seniorCare" src={seniorCare.src} width={seniorCare.width} height={seniorCare.height} alt='Child Care' className='absolute w-full h-full object-cover object-center' />
            </div>
        </section>
    )
}
