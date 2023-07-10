"use client"

import React from 'react'
import Filter from '@/components/Filter'
import Caregivers from '@/components/Caregivers'

export default function Dashboard() {
    return (
        <section>
            <div className='relative grid grid-cols-1 md:grid-cols-[20rem_1fr] gap-5 px-10 pt-3 pb-3'>
                <Filter />
                <Caregivers />
            </div>
        </section>
    )
}
