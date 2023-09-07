"use client"

import Footer from '@/app/Footer';
import Login from '@/app/Login';
import Navbar from '@/app/Navbar';
import Signup from '@/app/Signup';
import UserTypeContext from '@/context/UserType';
import React, { useMemo, useState, useEffect } from 'react'
import AlertContext from './AlertContext';
import Alert from './Alert';

export default function Client({ children }: { children: React.ReactNode }) {
    const [userType, setUserType] = useState<string>();
    const values = useMemo(() => ({ userType, setUserType }), [userType]);
    useEffect(() => {
        const val = sessionStorage.getItem("userType");
        setUserType(val ?? "careseeker");
    }, []);

    const [alert, setAlert] = React.useState<{ type: "info" | "warning" | "error" | "success", message: string, open: boolean }>({
        type: "info",
        message: "",
        open: false
    });

    return (
        <>
            <UserTypeContext.Provider value={values} >
                <Navbar />
                <AlertContext.Provider value={{ alert, setAlert }}>
                    <main id="mainBody">
                        <Alert />
                        <Login />
                        <Signup />
                        {children}
                    </main>
                </AlertContext.Provider>
                <Footer />
            </UserTypeContext.Provider>
        </>
    )
}
