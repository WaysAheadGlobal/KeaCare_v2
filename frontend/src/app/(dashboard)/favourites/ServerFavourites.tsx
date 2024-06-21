"use client"

import React, { useState, useEffect } from 'react'
import Favourite from './Favourite';

export default async function ServerFavourites({ email, token }: { email: string, token: any }) {
    
    const [favourites, setFavourites] = useState<any>([]);

    useEffect(() => {
        async function getFavourites(email: string, token: any) {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/favourites?careseekerEmail=${email}`, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setFavourites(data);
        }
        getFavourites(email, token);
    }, [email, token]);


    if (favourites?.length === 0) {
        return (
            <section className='flex flex-col w-full h-[450px] text-xl items-center justify-center text-gray-500'>
                No favourites.
            </section>
        )

    } else {
        return (
            <section className='flex flex-col gap-4'>
                {
                    favourites?.map((favourite: any) => <Favourite key={favourite.id} favourite={favourite} />)
                }
            </section>
        )
    }
}
