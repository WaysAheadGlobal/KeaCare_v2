import React from 'react'
import Favourite from './Favourite';

async function getFavourites(email: string, cookies: any) {
    if (email) {
        const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/favourites?careseekerEmail=${email}`, {
            headers: {
                "Authorization": `${cookies.getCookie("token")}`,
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data;
    }
}

export default async function ServerFavourites({ email, cookies }: { email: string, cookies: any }) {
    const favourites = await getFavourites(email, cookies);
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
