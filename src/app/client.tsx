"use client"

import Footer from '@/components/Footer';
import Login from '@/components/Login';
import Navbar from '@/components/Navbar';
import Signup from '@/components/Signup';
import UserTypeContext from '@/context/UserType';
import React, { useMemo, useState } from 'react'

export default function Client({ children }: { children: React.ReactNode }) {
    const [userType, setUserType] = useState<"careseeker" | "caregiver">("careseeker");
    const values = useMemo(() => ({ userType, setUserType }), [userType]);

    return (
        <>
            <UserTypeContext.Provider value={values} >
                <Navbar />
                <Login />
                <Signup />
                {children}
                <Footer />
            </UserTypeContext.Provider>
        </>
    )
}
