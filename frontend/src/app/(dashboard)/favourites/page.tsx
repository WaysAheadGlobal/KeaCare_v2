"use client"

import { Container } from '@mui/material'
import React, { Suspense, useEffect, useState } from 'react'
import ServerFavourites from './ServerFavourites'
import Loading from './Loading';
import { useCookies } from '@/Hooks/useCookies';


export default function Favourites() {
    const [email, setEmail] = useState<string>("");
    const [token, setToken] = useState<string | undefined | null>(null);
    const cookies = useCookies();

    useEffect(() => {
        setEmail(sessionStorage.getItem("email") as string);
        setToken(cookies.getCookie("token"));
    }, []);

    return (
        <Container maxWidth="lg" sx={{
            marginY: 5,
            minHeight: "450px"
        }}>
            <h1 className='text-3xl font-semibold text-teal-500 mb-8'>Favourites</h1>
            <Suspense fallback={<Loading />}>
                <ServerFavourites email={email} token={token} />
            </Suspense>
        </Container>
    )
}
