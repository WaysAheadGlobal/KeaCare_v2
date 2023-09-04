import React, { useEffect, useState } from 'react'

export default function Wallet({ id, className }: { id: string, className: string }) {
    const [wallet, setWallet] = useState<any[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        async function wallet() {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/caregiver/wallet?email=${sessionStorage.getItem("email")}`);
            const data: any[] = await response.json();
            setWallet(data);
            data?.forEach((element: any) => {
                setTotal(prev => prev + element.totalPrice);            
            });            
        }
        wallet();
    }, [])
    return (
        <section id={id} className={className}>
            <h1 className='font-semibold text-2xl mb-4'>Wallet</h1>
            <div className='flex flex-col gap-2 max-h-[500px] overflow-y-auto'>
                <div className='grid grid-cols-[0.1fr_0.4fr_0.2fr_0.3fr] sticky top-0 bg-white'>
                    <p>Sl No.</p>
                    <p>Description</p>
                    <p>Price</p>
                    <p>Dates</p>
                </div>
                {
                    wallet?.map((details: any, index: number) => {
                        return (
                            <div key={details.id} className='grid grid-cols-[0.1fr_0.4fr_0.2fr_0.3fr] gap-1'>
                                <p>{index + 1}. </p>
                                <p>Appointment - {details.careseekername}</p>
                                <p className='font-semibold'>${details.totalPrice}</p>
                                <p>{details.date?.replaceAll(";", ", ")}</p>
                            </div>
                        )
                    })
                }
            </div>
            <span className='flex-grow'></span>
            <div className='flex flex-col gap-4 items-end justify-start'>
                <p className='text-lg font-bold'>Total Money: ${total} </p>
                <button className='bg-teal-500 hover:bg-teal-600 py-2 px-4 rounded-md text-white'
                    onClick={(e) => {e.preventDefault()}}
                >Withdraw</button>
            </div>
        </section>
    )
}
