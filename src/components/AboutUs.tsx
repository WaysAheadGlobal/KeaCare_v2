import React from 'react'
import Card from './Card'
import efficient from '../../public/efficient.png'
import convenient from '../../public/convenient.png'
import affordable from '../../public/affordable.png'
import reliable from '../../public/reliable.png'


export default function AboutUs() {
    return (
        <section id="about" className='bg-teal-500 text-white py-10 px-2 md:px-[15rem] flex flex-col gap-[4rem]'>
            <h1 className='text-center text-3xl text-[#09371f] font-semibold'>About Us</h1>
            <div className='space-y-4'>
                <h2 className='text-center text-2xl font-semibold'>On-demand mobile and web platform of vetted Caregivers</h2>
                <p className='text-center'>
                    The platform would feature a portfolio of family care-related services for our members, including consumer matching services and consumer payments services. Through Kea.care, we are building &apos;hyperlocal care communities&apos;. The hyperlocal aspect applies to the stop-gap care arrangements wherein there is an urgency to avail the service and the families do not have the time to carry out very detailed evaluation/selection process to onboard a carer.
                </p>
                <p className='text-center'>
                    Our platform also enables caregivers to find jobs and manage their careers. Many of these employees are in the informal sector, they are women, immigrants , freelancers.
                </p>
                <p className='text-center'>
                    We use proprietary technology to deliver the most crucial ingredient in an on-demand service: Trust.
                </p>
            </div>
            <div className='flex flex-col items-center md:items-stretch md:flex-row gap-10'>
                <Card image={efficient} heading='Efficient' text='No site hoping, Customisable list of available candidates' />
                <Card image={convenient} heading='Convenient' text='Marketplace model, Easy comparisons & filters' />
                <Card image={reliable} heading='Reliable' text='Based on eWOM - Aggregating reviews and recommendations from users, Trust index for pre-vetted providers' />
                <Card image={affordable} heading='Affordable' text='Price Comparisons balanced with reviews, quality assurance within budget' />
            </div>
        </section>
    )
}
