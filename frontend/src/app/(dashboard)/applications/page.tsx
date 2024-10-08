"use client"

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import RecommendedCard from '../dashboard/RecommendedCard';
import { useCookies } from '@/Hooks/useCookies';

export default function Applications() {
    const searchParams = useSearchParams();
    const [applicants, setApplicants] = useState<any>([]);
    const [applicantsData, setApplicantsData] = useState<any>([]);
    const cookies = useCookies();

    useEffect(() => {
        async function getApplicantsById() {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/getapplicants?jobId=${searchParams.get("id")}`, {
                headers: {
                    "Authorization": `${cookies.getCookie("token")}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            setApplicants(data);
        }
        getApplicantsById();
    }, [])

    useEffect(() => {
        async function getCaregiverById(id: number) {
            if (id) {
                const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/getCaregiverInfo?id=${id}`, {
                    headers: {
                        "Authorization": `${cookies.getCookie("token")}`,
                        "Content-Type": "application/json"
                    },
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

    if (applicants.length !== 0) {
        return (
            <section className='flex flex-row flex-wrap gap-[1rem] justify-center p-[2rem]'>
                {
                    applicantsData.map((applicant: any) => {
                        return <RecommendedCard key={applicant?.id} caregiver={applicant} />
                    })
                }
            </section>
        )
    } else {
        return (
            <section className='flex items-center justify-center h-[40rem]'>
                <p className='text-lg text-slate-400'>No Applications Yet.</p>
            </section>
        )
    }
}
