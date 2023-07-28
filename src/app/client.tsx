"use client"

import Footer from '@/app/Footer';
import Login from '@/app/Login';
import Navbar from '@/app/Navbar';
import Signup from '@/app/Signup';
import UserTypeContext from '@/context/UserType';
import React, { useMemo, useState, useEffect } from 'react'

export default function Client({ children }: { children: React.ReactNode }) {
    const [userType, setUserType] = useState<string>();
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
