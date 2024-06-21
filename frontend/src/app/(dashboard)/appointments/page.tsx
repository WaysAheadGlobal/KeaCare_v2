"use client"

import React, { Suspense, useEffect, useState } from 'react'
import LoadAppointments from './LoadAppointments'
import Loading from './Loading';
import { Container } from '@mui/material';
import { useCookies } from '@/Hooks/useCookies';

export default function Appointments() {
    const [email, setEmail] = useState<string | null>(null);
    const [token, setToken] = useState<string | undefined | null>(null);
    const cookies = useCookies();

    useEffect(() => {
        setEmail(sessionStorage.getItem("email"));
        setToken(cookies.getCookie("token"));
    }, []);

    return (
        <main>
            <Container maxWidth="lg" sx={{
                marginY: 5
            }}>
                <h1 className='text-3xl font-semibold text-teal-500'>Your Appointments</h1>
                <Suspense fallback={<Loading />}>
                    <LoadAppointments email={email} token={token} />
                </Suspense>
            </Container>
        </main>
    )
}