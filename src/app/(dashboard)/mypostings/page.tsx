import JobPostings from '@/components/JobPostings'
import React from 'react'

export default function MyPostings() {
    return (
        <section className='py-10 px-[3rem] lg:px-[7rem]'>
            <h1 className='text-3xl font-semibold text-teal-500'>Your Job Posts</h1>
            <p className='text-gray-500 text-sm'>Your job postings will expire in 30 days, you can always renew and edit your jobs.</p>
            <div className='mt-8 flex flex-row flex-wrap xl:flex-col gap-5 items-center justify-center'>
                <JobPostings />
                <JobPostings /> 
             </div>
        </section>
    )
}
