import React from 'react'
import CaregiverList from './CaregiverList'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className='grid sm:grid-cols-[15rem_1fr] p-4 md:grid-cols-[20rem_1fr] transition-all'>
            <CaregiverList />
            {children}
        </section>
    )
}
