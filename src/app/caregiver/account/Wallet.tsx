import { useCookies } from '@/Hooks/useCookies';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Wallet({ id, className, stripe_account_id }: { id: string, className: string, stripe_account_id?: string | null }) {
    const [wallet, setWallet] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const cookies = useCookies();
    const router = useRouter();

    useEffect(() => {
        async function wallet() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/keacare/api/caregiver/wallet?email=${sessionStorage.getItem("email")}`, {
                headers: {
                    "Authorization": `${cookies.getCookie("token")}`,
                    "Content-Type": "application/json"
                }
            });
            const data: any[] = await response.json();
            setWallet(data);
            console.log(data);
            let total = 0;
            for (let i = 0; i < data.length; i++) {
                total += data[i].totalPrice;
            }
            setTotal(total);
        }
        wallet();
    }, []);

    async function createStripeAccount() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/keacare/api/caregiver/createStripeAccount`, {
            method: "POST",
            headers: {
                "Authorization": `${cookies.getCookie("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: sessionStorage.getItem("email")
            })
        });
        const data = await response.json();
        router.push(data.url);        
        console.log(data);
    }

    async function payout() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/keacare/api/caregiver/payout`, {
            method: "POST",
            headers: {
                "Authorization": `${cookies.getCookie("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                accountId: stripe_account_id,
                amount: total
            })
        });
        const data = await response.json();
        console.log(data);
    }

    async function withdraw(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        if (stripe_account_id) {
            await payout();
        } else {
            await createStripeAccount();
        }
    }

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
                    onClick={withdraw}
                >Withdraw</button>
            </div>
        </section>
    )
}
