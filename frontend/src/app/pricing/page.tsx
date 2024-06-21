"use client"

import React, { useEffect, useState } from 'react'
import Card from './Card';

export default function Pricing() {
    const [products, setProducts] = useState<any[]>([]);
    useEffect(() => {
        async function getProducts() {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/getproducts`, {
                cache: "no-cache",
            });
            const data = await response.json();
            setProducts(data);
        }
        getProducts();
    }, [])
    return (
        <main className='my-20 p-4'>
            <h1 className='text-3xl text-teal-500 font-semibold text-center mb-4'>Find the Right Care Plan for You</h1>
            <h2 className='text-center mb-10 text-lg mx-auto max-w-screen-lg'>Whether you need occasional assistance or full-time support, we have a care plan that&apos;s perfect for your needs. Explore our options and choose the best fit for you or your loved one!</h2>
            <section className='flex flex-col xl:flex-row gap-10 items-center justify-center'>
                <div className='flex flex-col items-center gap-5'>
                    <h1 className='text-2xl text-teal-500 font-semibold'>Monthly Plans</h1>
                    <div className='flex flex-col md:flex-row gap-5'>
                        {
                            products.filter((product: any) => product.recurring?.interval === "month").map((product: any) => {
                                return <Card key={product?.id} duration={product.recurring.interval} id={product?.id} price={(product.unit_amount / 100).toLocaleString('en-US', { style: "currency", currency: "USD" })} heading={product?.nickname} />
                            })
                        }
                    </div>
                </div>
                <div className='flex flex-col items-center gap-5'>
                    <h1 className='text-2xl text-teal-500 font-semibold'>Annual Plans</h1>
                    <div className='flex flex-col md:flex-row gap-5'>
                        {
                            products.filter((product: any) => product.recurring?.interval === "year").map((product: any) => {
                                return <Card key={product?.id} id={product?.id} duration={product.recurring.interval} price={(product.unit_amount / 100).toLocaleString('en-US', { style: "currency", currency: "USD" })} heading={product?.nickname} />
                            })
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}
