"use client"

import React, { use, useContext, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaPaperPlane } from 'react-icons/fa';
import { useCookies } from '@/Hooks/useCookies';
import UserTypeContext from '@/context/UserType';

function ChatBubble({ message, isSender }: { message: string, isSender: boolean }) {
    return (
        <div className={`flex flex-row gap-2 items-center ${isSender ? "justify-end" : "justify-start"}`}>
            <div className={`flex flex-col gap-1 p-2 px-4 rounded-lg ${isSender ? "bg-teal-500 text-white" : "bg-gray-200 text-black"}`}>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default function Chat() {
    const searchParams = useSearchParams();
    const [chats, setChats] = useState<any[]>([]);
    const [message, setMessage] = useState("");
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const cookies = useCookies();
    const [caregiver, setCaregiver] = useState<any>({});
    const { userType } = useContext(UserTypeContext);

    useEffect(() => {
        async function getCaregiverById() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/keacare/api/caregiver/getCaregiverInfo?id=${searchParams.get("cw")}`, {
                cache: "no-store",
                headers: {
                    "Authorization": `${cookies.getCookie("token")}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setCaregiver(data);
        }
        getCaregiverById();
    }, [searchParams])

    useEffect(() => {
        setChats([]);
        setMessage("");
        async function getAllChats() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/keacare/api/careseeker/chats/all/${searchParams.get("cw")}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': cookies.getCookie("token") as string,
                }
            });
            const data = await response.json();
            setChats(data);
        }
        getAllChats();
    }, [searchParams.get("cw")]);

    useEffect(() => {
        chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
    }, [chats])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message) return;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/keacare/api/careseeker/chats`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookies.getCookie("token") as string,
            },
            body: JSON.stringify({
                message: message,
                receiverId: searchParams.get("cw"),
            }),
            method: "POST"
        });

        setChats([...chats, { id: Math.random(), message: message, senderType: userType }]);
        setMessage("");
    }

    return (
        <section className='pl-4 flex flex-col gap-2'>
            <div className='flex flex-row gap-4 items-center w-full bg-teal-500 p-2 rounded-lg'>
                <img
                    src={caregiver?.imageUrl ? caregiver?.imageUrl : "/defaultUser.png"}
                    className='w-12 h-12 rounded-full'
                    alt="customer"
                />
                <p className='text-white'>{caregiver?.fname ? (caregiver?.fname + " " + caregiver?.lname) : ""}</p>
            </div>
            <div ref={chatContainerRef} id={"chat_container"} className='flex-grow h-[15rem] overflow-y-auto flex flex-col gap-1'>
                {
                    chats.map(({ id, message, senderType }) => (
                        <ChatBubble key={id} message={message} isSender={senderType === userType} />
                    ))
                }
                <div id="lastItem"></div>
            </div>
            <form className='flex flex-row gap-2' onSubmit={handleSubmit}>
                <input type="text" value={message} placeholder="Type a message" className='w-full p-2 rounded-lg border-2 border-teal-300 focus:outline-none focus:border-teal-500' onChange={(e) => { setMessage(e.currentTarget.value) }} />
                <button className='bg-teal-500 p-4 text-white text-xl rounded-lg transition-all hover:bg-teal-600'>
                    <FaPaperPlane />
                </button>
            </form>
        </section>
    )
}
