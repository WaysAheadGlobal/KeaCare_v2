"use client"

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function JobDetails() {
    const searchParams = useSearchParams();
    const [job, setJob] = useState<any>();

    useEffect(() => {
        async function getJobById() {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/getjob?id=${searchParams.get("id")}`);

            const data = await response.json();

            setJob(data);
        }
        getJobById();
    }, [])

    return (
        <div>{JSON.stringify(job)}</div>
    )
}
