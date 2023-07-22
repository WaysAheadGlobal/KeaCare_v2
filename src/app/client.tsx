"use client"

import Footer from '@/components/Footer';
import Login from '@/components/Login';
import Navbar from '@/components/Navbar';
import Signup from '@/components/Signup';
import UserTypeContext from '@/context/UserType';
import React, { useMemo, useState, useEffect } from 'react'

export default function Client({ children }: { children: React.ReactNode }) {
    const [userType, setUserType] = useState<"careseeker" | "caregiver" | string>();
    const values = useMemo(() => ({ userType, setUserType }), [userType]);
    useEffect(() => {
        const val = sessionStorage.getItem("userType");
        setUserType(val ? val : "careseeker");
    }, []);

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
