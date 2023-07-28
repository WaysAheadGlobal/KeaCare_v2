"use client"

import React, { useState } from 'react'
import Filter from '@/app/(dashboard)/dashboard/Filter'
import Caregivers from '@/app/(dashboard)/dashboard/Caregivers'


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

    return (
        <section>
            <div className='relative grid grid-cols-1 md:grid-cols-[20rem_1fr] gap-5 px-10 pt-3 pb-3'>
                <Filter filters={filters} setFilters={setFilters} />
                <Caregivers filters={filters} />
            </div>
        </section>
    )
}
