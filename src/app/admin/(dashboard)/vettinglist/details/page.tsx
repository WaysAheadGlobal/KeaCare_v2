"use client"

import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react'
import Details from './Details';
import { useCookies } from '@/Hooks/useCookies';

export default function DetailsPage() {
    const searchParams = useSearchParams();
    const cookies = useCookies();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Details searchParams={{
                id: searchParams.get("id") ?? ""
            }} cookies={cookies} />
        </Suspense>
    )
}
