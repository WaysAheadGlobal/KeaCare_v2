"use client"

import React, { Suspense, useEffect, useState } from "react"
import MyPostings from "./MyPostings"
import Loading from "./Loading";

export default function MyPostingsClient() {
    const [email, setEmail] = useState<string | null>(null);
    useEffect(() => {
        setEmail(sessionStorage.getItem("email"));
    }, [])
    return (
        <section className="min-h-[500px]">
            <Suspense fallback={<Loading />}>
                <MyPostings email={email} />
            </Suspense>
        </section>
    )
}
