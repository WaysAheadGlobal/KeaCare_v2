"use client"

import { Button } from '@mui/material';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import RecommendedCard from '../dashboard/RecommendedCard';

export default function Applications() {
    const searchParams = useSearchParams();
    const [applicants, setApplicants] = useState<any>([]);
    const [applicantsData, setApplicantsData] = useState<any>([]);

    useEffect(() => {
        async function getApplicantsById() {
            const response = await fetch(`http://localhost:3004/keacare/api/careseeker/getapplicants?jobId=${searchParams.get("id")}`);

            const data = await response.json();

            setApplicants(data);
        }
        getApplicantsById();
    }, [])

    useEffect(() => {
        async function getCaregiverById(id: number) {
            if (id) {
                const response = await fetch(`http://localhost:3004/keacare/api/caregiver/getCaregiverInfo?id=${id}`, {
                    next: {
                        revalidate: 10
                    }
                });
                const data = await response.json();
                setApplicantsData((applicantsData: any) => [...applicantsData, data]);
            }
        }
        if (applicants.length !== 0) {
            applicants.forEach((applicant: any) => {
                getCaregiverById(applicant.applicantId)
            });
        }
    }, [applicants])

    return (
        <section className='flex flex-row flex-wrap gap-[1rem] justify-center p-[2rem]'>
            {
                applicantsData.map((applicant: any) => {
                    return <RecommendedCard caregiver={applicant} />
                })
            }
        </section>
    )
}
