"use client"

import JobPostings from '@/app/(dashboard)/mypostings/JobPostings'
import React, { useState, useEffect } from 'react'

export default async function MyPostings({ email, token }: { email: string | null, token: any }) {

    const [posts, setPosts] = useState<any>([]);

    useEffect(() => {
        async function getPostings(email: string | null, token: any) {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/posts?email=${email}`, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setPosts(data);
        }
        getPostings(email, token);
    }, [email, token]);

    if (posts?.length !== 0) {
        return (
            <section className='py-10 px-[3rem] lg:px-[7rem]'>
                <h1 className='text-3xl font-semibold text-teal-500'>Your Job Posts</h1>
                <div className='mt-8 flex flex-row flex-wrap xl:flex-col gap-5 items-center justify-center'>
                    {
                        posts?.map((post: any) => {
                            return <JobPostings key={post?.id} id={post?.id} postedOn={post?.createdOn} rate={post?.hourlyRate} speciality={post?.speciality} views={post?.responses} status={post?.status} />
                        })
                    }
                </div>
            </section>
        )
    } else {
        return (
            <section className='py-10 px-[3rem] lg:px-[7rem]'>
                <h1 className='text-3xl font-semibold text-teal-500'>Your Job Posts</h1>
                <div className='text-gray-500 flex items-center justify-center h-[30rem] text-lg'>
                    <p>Start posting to see your job posts here.</p>
                </div>
            </section>
        )
    }
}
