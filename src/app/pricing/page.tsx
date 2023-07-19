import Link from 'next/link'
import React from 'react'

function Card({ price, heading }: { price: string, heading: string }) {
    return (
        <>
            <div className='rounded-xl w-[20rem] p-5 flex flex-col gap-10 transition-shadow shadow-lg hover:shadow-2xl bg-white'>
                <p className='font-bold text-teal-700'>{heading}</p>
                <div className='flex flex-col gap-2'>
                    <p className='text-teal-500 text-7xl font-light self-center'>{price}</p>
                    <p className='self-center text-sm'>Every Month</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <p>8 Hours per Day</p>
                    <p>25 Days a Month</p>
                </div>
                <button className='border-2 hover:border-teal-500 hover:text-teal-500 hover:bg-white border-white bg-teal-500 text-white px-5 py-3 rounded-lg'>
                    <Link href={"/payments"}>
                        Buy Now
                    </Link>
                </button>
            </div>
        </>
    )
}

export default function Pricing() {
    return (
        <>
            <section className='flex flex-col xl:flex-row gap-10 my-20 items-center justify-center'>
                <div className='flex flex-col items-center gap-5'>
                    <h1 className='text-3xl text-teal-500 font-semibold'>Monthly Plans</h1>
                    <div className='flex flex-col md:flex-row gap-5'>
                        <Card price='$30' heading='Monthly Senior Care' />
                        <Card price='$30' heading='Monthly Child Care' />
                    </div>
                </div>
                <div className='flex flex-col items-center gap-5'>
                    <h1 className='text-3xl text-teal-500 font-semibold'>Anuual Plans</h1>
                    <div className='flex flex-col md:flex-row gap-5'>
                        <Card price='$100' heading='Anuual Senior Care' />
                        <Card price='$100' heading='Anuual Child Care' />
                    </div>
                </div>
            </section>
        </>
    )
}
