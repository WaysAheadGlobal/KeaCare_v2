"use client"

import React from 'react'
import AboutUs from '@/components/AboutUs'
import HowItWorks from '@/components/HowItWorks'
import Introduction from '@/components/Introduction'
import Leaders from '@/components/Leaders'
import Responsive_Compassionate from '@/components/Responsive_Compassionate'
import ValueProposition from '@/components/ValueProposition'
import Introduction_New from '@/components/Introduction_New'
import ValueProposition_New from '@/components/ValueProposition_New'


export default function Home() {
    return (
        <>
            {/* <Introduction /> */}
            <Introduction_New />
            <AboutUs />
            {/* <ValueProposition /> */}
            <ValueProposition_New />
            <Leaders />
            <HowItWorks />
            <Responsive_Compassionate />
        </>
    )
}
