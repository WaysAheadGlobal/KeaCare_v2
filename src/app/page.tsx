"use client"

import React from 'react'
import AboutUs from '@/components/AboutUs'
import HowItWorks from '@/components/HowItWorks'
import Introduction from '@/components/Introduction'
import Leaders from '@/components/Leaders'
import Responsive_Compassionate from '@/components/Responsive_Compassionate'
import ValueProposition from '@/components/ValueProposition'

export default function Home() {
    return (
        <>
            <Introduction />
            <AboutUs />
            <ValueProposition />
            <Leaders />
            <HowItWorks />
            <Responsive_Compassionate />

        </>
    )
}
