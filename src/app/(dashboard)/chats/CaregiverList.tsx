"use client"

import Link from 'next/link'
import React from 'react'
import defaultUser from '../../../../public/defaultUser.png'
import { useCookies } from '@/Hooks/useCookies'

function Button({ receiverId, fname, lname, imageUrl }: { receiverId: string, fname?: string, lname?: string, imageUrl?: string }) {
    return (
        <>
            <Link href={`/chats/chat?cw=${receiverId}`} className='w-full p-2 flex flex-row items-center gap-2 rounded-md bg-black bg-opacity-0 hover:bg-opacity-10'>
                <img
                    src={imageUrl ? imageUrl : defaultUser.src}
                    className='w-10 h-10 rounded-full'
                    alt="caregiver"
                />
                <p>{fname + " " + lname}</p>
            </Link>
            <hr />
        </>
    )
}

export default function CaregiverList() {
    const [contacts, setContacts] = React.useState<any>([]);
    const cookies = useCookies();

    React.useEffect(() => {
        getContacts();
    }, []);

    async function getContacts() {
        const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/contacts`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${cookies.getCookie("token")}`
            }
        });
        const data = await response.json();
        console.log(data);
        setContacts(data);
    }

    return (
        <div className='hidden sm:flex flex-col gap-2 pr-4 h-[35rem] overflow-y-auto'>
            {
                contacts?.map((contact: any) => (
                    <Button key={contact?.id} {...contact} />
                ))
            }
        </div>
    )
}
