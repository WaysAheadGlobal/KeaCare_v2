"use client";

import { useSearchParams } from 'next/navigation';
import React from 'react'
import Details from './Details';
import { useCookies } from '@/Hooks/useCookies';

export default function DetailsPage() {
    const searchParams = useSearchParams();
    const cookies = useCookies();

    return (
        <Details searchParams={{
            id: searchParams.get("id") ?? ""
        }} cookies={cookies} />
    )
}
