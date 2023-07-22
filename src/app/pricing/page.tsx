"use client"

import React, { useEffect, useState } from 'react'
import Card from './Card';

export default function Pricing() {
    const [products, setProducts] = useState<any[]>([]);
    useEffect(() => {
        async function getProducts() {
            const response = await fetch("http://localhost:3001/api/careseeker/getproducts", {
                cache: "no-cache",
            });
            const data = await response.json();
            setProducts(data);
        }
        getProducts();
    }, [])
    return (
        <>
            <section className='flex flex-col xl:flex-row gap-10 my-20 items-center justify-center'>
                <div className='flex flex-col items-center gap-5'>
                    <h1 className='text-3xl text-teal-500 font-semibold'>Monthly Plans</h1>
                    <div className='flex flex-col md:flex-row gap-5'>
                        {
                            products.filter((product: any) => product.recurring.interval === "month").map((product: any) => {
                                return <Card key={product?.id} duration={product.recurring.interval} id={product?.id} price={(product.unit_amount / 100).toLocaleString('en-US', { style: "currency", currency: "CAD" })} heading={product?.nickname} />
                            })
                        }
                    </div>
                </div>
                <div className='flex flex-col items-center gap-5'>
                    <h1 className='text-3xl text-teal-500 font-semibold'>Anuual Plans</h1>
                    <div className='flex flex-col md:flex-row gap-5'>
                        {
                            products.filter((product: any) => product.recurring.interval === "year").map((product: any) => {
                                return <Card key={product?.id} id={product?.id} duration={product.recurring.interval} price={(product.unit_amount / 100).toLocaleString('en-US', { style: "currency", currency: "CAD" })} heading={product?.nickname} />
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
