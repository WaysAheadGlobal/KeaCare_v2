"use client"

import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react'
import Details from './Details';

export default function DetailsPage() {
    const searchParams = useSearchParams();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Details searchParams={{
                id: searchParams.get("id") ?? ""
            }} />
        </Suspense>
    )
}
