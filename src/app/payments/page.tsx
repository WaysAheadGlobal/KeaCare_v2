import Image from 'next/image'
import React from 'react'
import creditDebitCard from '../../../public/creditDebitCard.png'
import Link from 'next/link'

export default function Payments() {
    return (
        <section className='mb-[5rem]'>
            <h1 className='bg-teal-500 text-white font-bold text-3xl p-[5rem] text-center'>Checkout</h1>
            <h2 className='text-2xl p-[3rem] text-center font-semibold'>Payments Overview</h2>
            <div className='flex flex-row flex-wrap xl:flex-nowrap items-stretch justify-center gap-10 px-[2rem]'>
                <div className='p-[2rem] sm:px-[5rem] sm:py-[3rem] border-[1px] rounded-lg border-black flex flex-col items-center justify-center gap-[2rem]'>
                    <p className='text-xl font-semibold'>Debit/Credit Card</p>
                    <Image src={creditDebitCard.src} width={creditDebitCard.width} height={creditDebitCard.height} alt='credit debit card' className='w-[30rem]' />
                    <div className='w-full'>
                        <p>Name on Card</p>
                        <input type="text" name="" id="" placeholder='Name' className='w-full bg-inherit p-3 border-[1px] border-black rounded-lg' />
                    </div>
                    <div className='w-full'>
                        <p>Card Number</p>
                        <input type="text" name="" id="" placeholder='Name' className='w-full bg-inherit p-3 border-[1px] border-black rounded-lg' />
                    </div>
                    <div className='w-full'>
                        <p>Valid Upto</p>
                        <input type="text" name="" id="" placeholder='Name' className='w-full bg-inherit p-3 border-[1px] border-black rounded-lg' />
                    </div>
                    <div className='w-full'>
                        <p>CVV</p>
                        <input type="text" name="" id="" placeholder='Name' className='w-full bg-inherit p-3 border-[1px] border-black rounded-lg' maxLength={3} />
                    </div>
                    <div className='w-full flex justify-between'>
                        <Link href={"/careseeker/registration"} className='px-[2rem] sm:px-[5rem] py-3 bg-teal-500 text-white rounded-lg'>Pay</Link>
                        <button className='px-[2rem] sm:px-[5rem] py-3 text-teal-500'>Cancel</button>
                    </div>
                </div>
                <div className='bg-[#e5e5e5] p-[2rem] sm:px-[5rem] sm:py-[3rem] border-[1px] rounded-lg border-black flex flex-col gap-[2rem] w-[642px]'>
                    <p className='text-xl font-semibold self-center'>Order Summary</p>
                    <div>
                        <p>Plan Start Date</p>
                        <p className='font-semibold'>Sun, July 2, 2023</p>
                    </div>
                    <hr className='h-[1.5px] bg-black w-full' />
                    <div className='flex flex-row justify-between font-semibold'>
                        <p>Plan</p>
                        <p>Monthly Child Care</p>
                    </div>
                    <div className='flex flex-row justify-between font-semibold'>
                        <p>Duration</p>
                        <p>Until Cancelled</p>
                    </div>
                    <hr className='h-[1.5px] bg-black w-full' />
                    <div className='flex flex-row justify-between font-semibold'>
                        <p>Billed Monthly</p>
                        <p className='text-teal-500'>$30</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
