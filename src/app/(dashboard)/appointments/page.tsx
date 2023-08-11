"use client"

import React, { Suspense, useEffect, useState } from 'react'
import LoadAppointments from './LoadAppointments'
import Loading from './Loading';

export default function Appointments() {
    const [email, setEmail] = useState<string | null>(null);
    useEffect(() => { setEmail(sessionStorage.getItem('email')) }, []);
    return (
        <Suspense fallback={<Loading />}>
            <LoadAppointments email={email} />
        </Suspense>
    )
}