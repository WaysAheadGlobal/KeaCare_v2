"use client"

import React, { useState, useEffect, useContext } from 'react'
import profilePic from '../../../../public/profilePic.png'
import Alert from '@/app/Alert';
import Subscription from './Subscription';
import PaymentHistory from './PaymentHistory';
import AlertContext from '@/app/AlertContext';

export default function Account() {
    const [userInfo, setUserInfo] = useState<any>();
    const [refreshData, setRefreshData] = useState<number>(0);

    useEffect(() => {
        async function getUserInfo(email: string) {
            if (email) {
                const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/account?email=${email}`);
                const data = await response.json();
                setUserInfo(data);
            }
        }
        const email = sessionStorage.getItem("email");
        getUserInfo(email ?? "");
    }, [refreshData]);

    const convertToBase64 = (image: Blob): Promise<string | ArrayBuffer | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.onerror = (error) => {
                reject(error);
            }
            reader.readAsDataURL(image);
        })
    }

    const { setAlert } = useContext(AlertContext);

    return (
        <>
            <div className='p-20 text-3xl font-semibold text-white bg-teal-500 text-center'>Your Account</div>
            <div className='sticky top-0 bg-transparent h-[1rem]'>
                <Alert />
            </div>
            <form id="careseeker_update_form" className='px-[2rem] md:px-[8rem] py-[2rem] flex flex-col lg:grid lg:grid-cols-[18rem_auto] grid-rows-1 gap-10 justify-center'
                onChange={(e) => {
                    setUserInfo({
                        ...userInfo,
                        [(e.target as any).name]: (e.target as any).value
                    });
                }}
                onSubmit={async (e) => {
                    e.preventDefault();
                    const response = await fetch("https://webapi.waysdatalabs.com/keacare/api/careseeker/updateAccount", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(userInfo)
                    })

                    const data = await response.json();
                    if (data?.success) {
                        setUserInfo(data);
                        setAlert({
                            message: "Profile Updated.",
                            open: true,
                            type: "success"
                        })
                    } else {
                        setUserInfo({
                            ...userInfo
                        });
                        setAlert({
                            message: "Couldn't update your profile.",
                            open: true,
                            type: "error"
                        })
                    }
                }}>
                <div className='flex flex-col gap-[2rem]'>
                    <div className='bg-teal-500 rounded-lg flex flex-col items-center justify-start gap-10 h-[17rem]'>
                        <div className='rounded-full bg-white'>
                            <div className='rounded-full aspect-square w-[7rem] bg-cover bg-no-repeat bg-center' style={{
                                backgroundImage: `url(${userInfo?.imageUrl ? userInfo?.imageUrl : profilePic.src})`
                            }}></div>
                        </div>
                        <p className='text-white font-semibold'>{userInfo?.fname + " " + userInfo?.lname}</p>
                        <div className='relative bottom-[-1.5rem] bg-white border-[1px] rounded-lg border-black p-3 font-semibold cursor-pointer'>
                            <label htmlFor='updatePhoto' className='cursor-pointer'>Update Profile Photo</label>
                            <input type="file" name="updatePhoto" id="updatePhoto" className='invisible w-0'
                                onChange={async (e) => {
                                    if (e.currentTarget.files && e.currentTarget.files[0].size > 2 * 1048576) {
                                        setAlert({
                                            message: "Profile Photo size too big.",
                                            type: "warning",
                                            open: true
                                        })
                                    } else {
                                        setUserInfo({
                                            ...userInfo,
                                            imageUrl: e.currentTarget.files ? URL.createObjectURL(e.currentTarget.files[0]) : userInfo?.imageURL,
                                            image: e.currentTarget.files ? await convertToBase64(e.currentTarget.files[0]) : undefined
                                        })
                                    }
                                }} />
                        </div>
                    </div>
                    <button type='button' className='bg-teal-500 p-3 text-white font-semibold rounded-lg hover:bg-teal-600 transition-all duration-200'
                        onClick={(e) => {
                            e.preventDefault();
                            const subscription = document.getElementById("subscription") as HTMLDivElement;
                            const form = document.getElementById("form") as HTMLDivElement;
                            const paymentHistory = document.getElementById("paymentHistory") as HTMLDivElement;
                            subscription.classList.remove("flex");
                            subscription.classList.add("hidden");
                            paymentHistory.classList.remove("flex");
                            paymentHistory.classList.add("hidden");
                            form.classList.add("flex");
                            form.classList.add("md:grid");
                            form.classList.remove("hidden");
                        }}
                    >My Account</button>
                    <button type='button' className='bg-teal-500 p-3 text-white font-semibold rounded-lg hover:bg-teal-600 transition-all duration-200'
                        onClick={(e) => {
                            e.preventDefault();
                            const subscription = document.getElementById("subscription") as HTMLDivElement;
                            const form = document.getElementById("form") as HTMLDivElement;
                            const paymentHistory = document.getElementById("paymentHistory") as HTMLDivElement;
                            subscription.classList.add("flex");
                            subscription.classList.remove("hidden");
                            paymentHistory.classList.remove("flex");
                            paymentHistory.classList.add("hidden");
                            form.classList.remove("flex");
                            form.classList.remove("md:grid");
                            form.classList.add("hidden");
                        }}
                    >Subscriptions</button>
                    <button className='bg-teal-500 p-3 text-white font-semibold rounded-lg hover:bg-teal-600 transition-all duration-200'
                        onClick={(e) => {
                            e.preventDefault();
                            const subscription = document.getElementById("subscription") as HTMLDivElement;
                            const form = document.getElementById("form") as HTMLDivElement;
                            const paymentHistory = document.getElementById("paymentHistory") as HTMLDivElement;
                            subscription.classList.remove("flex");
                            subscription.classList.add("hidden");
                            paymentHistory.classList.add("flex");
                            paymentHistory.classList.remove("hidden");
                            form.classList.remove("flex");
                            form.classList.remove("md:grid");
                            form.classList.add("hidden");
                        }}
                    >Payment History</button>
                    <button disabled className='p-3 font-semibold rounded-lg border-2 transition-all duration-200 border-red-500 text-red-500 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white'>Delete My Account</button>
                </div>
                <Subscription id="subscription" className="p-2 text-sm md:text-base md:px-[3rem] md:py-[3rem] hidden flex-col border-2 border-black rounded-lg w-full lg:min-w-[700px]" />
                <PaymentHistory id="paymentHistory" className="p-2 text-sm md:text-base md:px-[3rem] md:py-[3rem] hidden flex-col border-2 border-black rounded-lg w-full lg:min-w-[700px]" />
                <div id="form" className='md:px-[5rem] md:py-[5rem] flex flex-col md:grid md:grid-cols-2 md:grid-rows-[auto] gap-[2rem] md:border-[1px] md:border-black rounded-lg h-fit w-full md:w-fit' >
                    <h1 className='col-[1/3] font-semibold text-2xl self-start sm:self-end'>Your Personal Information</h1>
                    <div className='flex flex-col col-[1/2]'>
                        <span>First Name*</span>
                        <input required type="text" name="fname" defaultValue={userInfo?.fname} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col col-[2/3]'>
                        <span>Last Name*</span>
                        <input required type="text" name='lname' defaultValue={userInfo?.lname} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Date of Birth*</span>
                        <input required type="date" name='dob' defaultValue={userInfo?.dob} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Gender*</span>
                        <select required name="gender" value={userInfo?.gender} className='p-3 border-[1px] border-black rounded-lg'>
                            <option value="" disabled>Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Phone Number*</span>
                        <input required type="text" pattern='^[0-9]{10}$' name='mobile' defaultValue={userInfo?.mobile} className='border-[1px] border-black p-3 rounded-lg' minLength={10} maxLength={10} />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Email*</span>
                        <input required type="email" name='email' defaultValue={userInfo?.email} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Address*</span>
                        <input required type="text" name='address' defaultValue={userInfo?.address} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Province*</span>
                        <select required value={userInfo?.province} name='province' className="border-[1px] p-3 border-black rounded-lg"
                            onChange={(e) => setUserInfo({
                                ...userInfo,
                                province: e.currentTarget.value
                            })}
                        >
                            <option value="" disabled>Select</option>
                            <option value="Alberta">Alberta</option>
                            <option value="British Columbia">British Columbia</option>
                            <option value="Manitoba" >Manitoba</option>
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
                        <input required type="text" name='city' defaultValue={userInfo?.city} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Zip Code*</span>
                        <input required type="text"
                            pattern='^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z][ ]?[0-9][ABCEGHJ-NPRSTV-Z][0-9]$'
                            name='zipcode' defaultValue={userInfo?.zipcode} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='col-[1/3] flex flex-row justify-between'>
                        <button type='submit' className='bg-teal-500 text-white font-semibold px-[3rem] py-[1rem] rounded-xl'>Update</button>
                        <button className='text-teal-500 font-semibold hover:bg-gray-200 focus:bg-gray-200  px-[3rem] py-[1rem] rounded-xl' onClick={(e) => {
                            e.preventDefault();
                            (document.getElementById("careseeker_update_form") as HTMLFormElement).reset();
                            setRefreshData(prev => prev + 1);
                        }}>Disgard Changes</button>
                    </div>
                </div>
            </form>
        </>
    )
}
