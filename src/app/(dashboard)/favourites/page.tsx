"use client"

import { Container } from '@mui/material'
import React, { Suspense, useEffect, useState } from 'react'
import ServerFavourites from './ServerFavourites'
import Loading from './Loading';
import { useCookies } from '@/Hooks/useCookies';


export default function Favourites() {
    const [email, setEmail] = useState<string>("");
    const cookies = useCookies();

    useEffect(() => {
        setEmail(sessionStorage.getItem("email") + "")
    }, []);

    return (
        <Container maxWidth="lg" sx={{
            marginY: 5,
            minHeight: "450px"
        }}>
            <h1 className='text-3xl font-semibold text-teal-500 mb-8'>Favourites</h1>
            <Suspense fallback={<Loading />}>
                <ServerFavourites email={email} cookies={cookies} />
            </Suspense>
        </Container>
    )
}
