import React from 'react'
import { BsFillChatFill } from 'react-icons/bs'


export default function Chats() {
    return (
        <div className='grid place-content-center place-items-center'>
            <BsFillChatFill className='text-5xl text-slate-400' />
            <p className='text-slate-400 mt-8'>No Chats. Start messaging caregivers to see them here.</p>
        </div>
    )
}
