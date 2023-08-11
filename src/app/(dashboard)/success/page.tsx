"use client"

import React, { useEffect } from 'react'
import { Container } from "@mui/material"
import appointmentSuccess from '../../../../public/appointmentSuccess.png'
import Image from 'next/image'
import { useRouter } from "next/navigation"

export default function Success() {
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => router.push("/appointments"), 1000);
    }, [])
    return (
        <Container maxWidth="lg" className='h-[40rem] flex flex-col items-center justify-center'>
            <h1 className='text-3xl font-semibold'>Appointment Scheduled Successfully</h1>
            <Image src={appointmentSuccess} width={appointmentSuccess.width} height={appointmentSuccess.height} alt={'Appointment Success'} />
        </Container>
    )
}
