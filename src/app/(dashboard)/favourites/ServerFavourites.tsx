import React from 'react'
import Favourite from './Favourite';

async function getFavourites(email: string) {
    if (email) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/keacare/api/careseeker/favourites?careseekerEmail=${email}`);
        const data = await response.json();
        return data;
    }
}

export default async function ServerFavourites({ email }: { email: string }) {
    const favourites = await getFavourites(email);
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
