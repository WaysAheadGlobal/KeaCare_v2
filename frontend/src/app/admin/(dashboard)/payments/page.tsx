"use client"

import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'
import Payments from './Payments';
import { useCookies } from '@/Hooks/useCookies';

export default function PaymentsPage() {
    const searchParams = useSearchParams();
    const cookies = useCookies();
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Payments searchParams={{
                page: searchParams.get("page") ?? "1"
            }} cookies={cookies} />
        </Suspense>
    )
}
