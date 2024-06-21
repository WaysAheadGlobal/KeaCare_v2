"use client"

import React, { Suspense, useEffect, useState } from "react"
import MyPostings from "./MyPostings"
import Loading from "./Loading";
import { useCookies } from "@/Hooks/useCookies";

export default function MyPostingsClient() {
    const [email, setEmail] = useState<string | null>(null);
    const [token, setToken] = useState<string | undefined | null>(null);
    const cookies = useCookies();

    useEffect(() => {
        setEmail(sessionStorage.getItem("email"));
        setToken(cookies.getCookie("token"));
    }, []);

    return (
        <section className="min-h-[500px]">
            <Suspense fallback={<Loading />}>
                <MyPostings email={email} token={token} />
            </Suspense>
        </section>
    )
}
