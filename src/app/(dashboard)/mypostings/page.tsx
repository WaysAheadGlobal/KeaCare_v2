"use client"

import JobPostings from '@/components/JobPostings'
import React, { useState, useEffect } from 'react'

export default function MyPostings() {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        async function getPostings(email: string | null) {
            if (email) {
                const response = await fetch(`http://localhost:3001/api/careseeker/posts?email=${email}`);
                const data = await response.json();
                setPosts(data);
            } else {
                Promise.reject();
            }
        }
        getPostings(sessionStorage.getItem("email"));
    })

    return (
        <section className='py-10 px-[3rem] lg:px-[7rem]'>
            <h1 className='text-3xl font-semibold text-teal-500'>Your Job Posts</h1>
            <p className='text-gray-500 text-sm'>Your job postings will expire in 30 days, you can always renew and edit your jobs.</p>
            <div className='mt-8 flex flex-row flex-wrap xl:flex-col gap-5 items-center justify-center'>
                {
                    posts.map(post => {
                        return <JobPostings key={post?.id} postedOn={post?.createdOn} rate={post?.hourlyRate} speciality={post?.speciality} views={post?.responses} status={post?.status} />
                    })
                }
            </div>
        </section>
    )
}
