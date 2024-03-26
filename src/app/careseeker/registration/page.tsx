"use client"

import { useCookies } from '@/Hooks/useCookies';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Registration() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [autoFill, setAutoFill] = useState<{ [key: string]: string | null }>({});
    const cookies = useCookies();

    useEffect(() => {
        setAutoFill({
            email: sessionStorage.getItem("email"),
            phoneno: sessionStorage.getItem("phoneno")
        })
    }, [])

    return (
        <form className='pb-20' onSubmit={async (e) => {
            e.preventDefault();

            const fname = (document.getElementById("fname") as HTMLInputElement).value;
            const lname = (document.getElementById("lname") as HTMLInputElement).value;
            const mobile = (document.getElementById("mobile") as HTMLInputElement).value;
            const email = (document.getElementById("email_careseeker") as HTMLInputElement).value;
            const dob = (document.getElementById("dob") as HTMLInputElement).value;
            const gender = (document.getElementById("gender") as HTMLSelectElement).value;
            const address = (document.getElementById("address") as HTMLInputElement).value;
            const city = (document.getElementById("city") as HTMLInputElement).value;
            const province = (document.getElementById("province") as HTMLSelectElement).value;
            const zipcode = (document.getElementById("zipcode_regis") as HTMLInputElement).value;

            const bodyContent = JSON.stringify({
                fname: fname,
                lname: lname,
                email: email,
                mobile: mobile,
                dob: dob,
                gender: gender,
                address: address,
                city: city,
                province: province,
                zipcode: zipcode,
                device_type: "web"
            });

            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/registration`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${cookies.getCookie("token")}`
                },
                body: bodyContent
            });

            setLoading(true);

            const data = await response.json();

            if (data?.success) {
                setLoading(false);
                router.push("/dashboard");
            } else {
                setLoading(false);
            }
        }}>
            <div className='p-10 bg-teal-500'>
                <h1 className='text-center text-3xl font-semibold text-white'>Complete your Registration</h1>
            </div>
            <div className='flex flex-col items-center justify-center bg-[#F3FDFD]'>
                <div className='flex flex-col lg:grid lg:grid-rows-[auto] lg:grid-cols-2 gap-[2rem] mt-10 w-full p-5 lg:w-[60rem]'>
                    <p className='col-[1/3] row-[1/2] lg:self-end text-2xl'>Personal Information</p>
                    <div className='flex flex-col'>
                        <span>First Name*</span>
                        <input id="fname" required type="text" className='border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Last Name*</span>
                        <input id="lname" required type="text" className='border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Date of Birth*</span>
                        <input id="dob" required type="date" className='border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Gender*</span>
                        <select id='gender' required className='p-3 border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none rounded-lg'>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Phone Number*</span>
                        <input id='mobile' defaultValue={autoFill?.phoneno ?? undefined} required type="text" pattern='^[0-9]{10}$' className='border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none p-3 rounded-lg' minLength={10} maxLength={10} />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Email*</span>
                        <input id='email_careseeker' required type="email" defaultValue={autoFill?.email ?? undefined} className='border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Address*</span>
                        <input id='address' required type="text" className='border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Province*</span>
                        <select id='province' required className="border-2 p-3 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none rounded-lg" >
                            <option value="">Select</option>
                            <option value="Alberta">Alberta</option>
                            <option value="British Columbia">British Columbia</option>
                            <option value="Manitoba">Manitoba</option>
                            <option value="New Brunswick">New Brunswick</option>
                            <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                            <option value="Northwest Territories">Northwest Territories</option>
                            <option value="Nova Scotia">Nova Scotia</option>
                            <option value="Nunavut">Nunavut</option>
                            <option value="Ontario">Ontario</option>
                            <option value="Prince Edward Island">Prince Edward Island</option>
                            <option value="Quebec">Quebec</option>
                            <option value="Saskatchewan">Saskatchewan</option>
                            <option value="Yukon">Yukon</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <span>City*</span>
                        <input id='city' required type="text" className='border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Zip Code*</span>
                        <input id='zipcode_regis'
                            defaultValue={autoFill?.zipcode ?? undefined}
                            pattern='^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z][ ]?[0-9][ABCEGHJ-NPRSTV-Z][0-9]$'
                            required type="text" className='border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none p-3 rounded-lg'
                        />
                    </div>
                    <button disabled={loading} className='px-[2rem] py-4 bg-teal-500 hover:bg-teal-600 text-white row-[9/10] rounded-lg flex items-center justify-center gap-4 self-start w-fit disabled:bg-teal-700 disabled:text-opacity-60'>
                        Submit
                        {
                            loading && <CircularProgress size={24} sx={{
                                color: "white"
                            }} />
                        }
                    </button>
                </div>
            </div>
        </form>
    )
}
