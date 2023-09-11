import React from 'react'
import AppBar from './AppBar'
import { Roboto } from 'next/font/google'
import SideBar from './SideBar';

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"]
});

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className='h-full'>
            <header className={`${roboto.className} sticky top-0`}>
                <AppBar />
            </header>
            <section className={`${roboto.className} grid grid-cols-[20rem_1fr]`}>
                <SideBar />
                {children}
            </section>
        </section>
    )
}
