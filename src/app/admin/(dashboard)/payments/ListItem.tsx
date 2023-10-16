"use client"

import React from 'react'
import Image from 'next/image'
import { Divider } from '@mui/material'

export default function ListItem({ id, image, name, speciality, amount }: { id: string, image: string, name: string, speciality: string, amount: string }) {
    return (
        <>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] items-center gap-4">
                <Image src={image} width={500} height={500} alt="image" className='aspect-square w-[4rem] rounded-md object-cover object-center' />
                <article className='flex gap-1'>
                    <p className='sm:hidden'>Name:</p>
                    <p>{name}</p>
                </article>
                <article className='flex gap-1'>
                    <p className='sm:hidden'>Speciality:</p>
                    <p>{speciality}</p>
                </article>
                <article className='flex gap-1'>
                    <p className='sm:hidden'>Amount:</p>
                    <p className='font-medium'>$&nbsp;{amount ?? 0}</p>
                </article>
                <div className='flex flex-wrap gap-4'>
                    <button className='px-[2rem] py-2 bg-teal-100 border-2 border-teal-500 text-teal-700 rounded-full'>Pay</button>
                </div>
            </div>
            <Divider />
        </>
    )
}