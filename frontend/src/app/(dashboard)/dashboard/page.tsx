"use client"

import React, { useState, useEffect } from 'react'
import Filter from '@/app/(dashboard)/dashboard/Filter'
import Caregivers from '@/app/(dashboard)/dashboard/Caregivers'
import { useRouter } from 'next/navigation';
import { useCookies } from '@/Hooks/useCookies';


export default function Dashboard() {
    const [filters, setFilters] = useState<any>({
        speciality: "",
        pet: "",
        rate: "",
        experience: "",
        daysAWeek: "",
        hrs: "",
        gender: "",
        age: "",
        languages: "",
        addservices: "",
        rating: ""
    });
    const [careseeker, setCareseeker] = useState<any>();
    const router = useRouter();
    const cookies = useCookies();

    useEffect(() => {
        async function getUserInfo(email: string) {
            if (email) {
                const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/account?email=${email}`, {
                    headers: {
                        "Authorization": `${cookies.getCookie("token")}`,
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                setCareseeker(data);
            }
        }
        const email = sessionStorage.getItem("email");
        getUserInfo(email ?? "");
    }, []);

    useEffect(() => {
        if (careseeker) {
            if (careseeker.status === "incomplete") {
                sessionStorage.setItem("pricing", "redo");
                router.push("/pricing");
            } else if (careseeker.status === "inactive") {
                router.push("/careseeker/registration");
            }
        }
    }, [careseeker]);

    return (
        <section>
            <div className='relative grid grid-cols-1 md:grid-cols-[20rem_1fr] gap-5 px-10 pt-3 pb-3'>
                <Filter filters={filters} setFilters={setFilters} />
                <Caregivers filters={filters} />
            </div>
        </section>
    )
}
