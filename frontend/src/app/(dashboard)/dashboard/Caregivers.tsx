"use client"

import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic"
import { FiSearch } from 'react-icons/fi'
const RecommendedCard = dynamic(() => import('./RecommendedCard'));
import { useCookies } from '@/Hooks/useCookies'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';


export default function Caregivers({ filters }: { filters: any }) {
    const [caregivers, setCaregivers] = useState<any[]>([]);
    const [search, setSearch] = useState<string>("");
    const [heading, setHeading] = useState<string>("Recommended for you");
    const cookies = useCookies();
    const searchParams = useSearchParams();

    useEffect(() => {
        async function filter() {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/filters?speciality=${filters?.speciality}&pet=${filters?.pets}&rateStart=${filters?.rateStart ?? ""}&rateEnd=${filters?.rateEnd ?? ""}&experience=${filters?.experience}&daysAWeek=${filters?.daysAWeek}&hrs=${filters?.hrs}&gender=${filters?.gender}&age=${filters?.age}&languages=${filters?.languages}&addservices=${filters?.addservices}&rating=${filters?.rating}&page=${searchParams.get("page") ?? 1}`, {
                cache: "no-store",
                headers: {
                    "Authorization": `${cookies.getCookie("token")}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            console.log(data);
            setCaregivers(data);
        }
        filter();
        return () => {
            Promise.resolve();
        }
    }, [filters, searchParams.get("page")]);

    useEffect(() => {
        async function getCaregiverByName() {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/filterByName?name=${search}`, {
                headers: {
                    "Authorization": `${cookies.getCookie("token")}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setCaregivers(data);
        }
        let timeout: NodeJS.Timeout;
        timeout = setTimeout(() => {
            getCaregiverByName();
        }, 500);
        return () => {
            clearTimeout(timeout);
        }
    }, [search])

    return (
        <div id="contents" className='flex flex-col gap-8 w-full items-start -ml-5 sm:ml-0'>
            <div className='flex flex-col md:flex-row md:items-center gap-3 md:gap-10 w-full'>
                <select name="location" id="location" className='hidden p-3 bg-inherit border-[1px] border-black rounded-lg outline-none md:flex-grow'>
                    <option value="">Location</option>
                    <option value="1">Within 1 km</option>
                    <option value="2">Within 2 kms</option>
                    <option value="3">Within 3 kms</option>
                    <option value="4">Within 4 kms</option>
                    <option value="5">Within 5 kms</option>
                    <option value="6">Within 6 kms</option>
                    <option value="7">Within 7 kms</option>
                    <option value="8">Within 8 kms</option>
                    <option value="9">Within 9 kms</option>
                    <option value="10">Within 10 kms</option>
                </select>
                <div className='flex items-center md:flex-grow-[10]'>
                    <input type="text" className='p-3 bg-inherit border-[1px] border-black rounded-l-lg outline-none w-full hover:ring-4 hover:ring-teal-400 focus:ring-4 focus:ring-teal-400 hover:border-teal-600 focus:border-teal-600' placeholder='Search Caregivers by name' onChange={(e) => {
                        if (e.target.value.length === 0) {
                            setHeading("Recommended for you");
                        } else {
                            setHeading("Search Results");
                        }
                        setSearch(e.target.value);
                    }} />
                    <div className='bg-teal-500 p-[14px] rounded-r-lg border-[1px] border-teal-500'>
                        <FiSearch className='text-xl text-white' />
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <h1 className='text-3xl font-semibold text-teal-500'>{heading}</h1>
                <p className='text-gray-400 mt-2'>{caregivers?.length} People in your locality have already appointed these caregivers.</p>
                <div className='flex flex-row items-start justify-start flex-wrap gap-5 mt-5'>
                    {
                        caregivers.map((caregiver: any) => {
                            if (caregiver?.fname) {
                                return <RecommendedCard key={caregiver?.id} caregiver={caregiver} />
                            }
                        })
                    }
                </div>
            </div>
            <div className='w-full flex justify-between px-5'>
                <Link href={`?page=${parseInt(searchParams.get("page") as string ?? 1) - 1}`} passHref>
                    <button disabled={parseInt(searchParams.get("page") as string ?? 1) - 1 <= 0} className='bg-transparent text-sm px-5 py-2 hover:bg-gray-100 rounded-lg disabled:text-gray-400 disabled:bg-transparent'>
                        <BsArrowLeft className='inline-block mr-2 text-xl' />
                        Previous Page
                    </button>
                </Link>
                <Link href={`?page=${parseInt(searchParams.get("page") as string ?? 1) + 1}`} passHref>
                    <button className='bg-transparent text-sm px-5 py-2 hover:bg-gray-100 rounded-lg disabled:text-gray-400 disabled:bg-transparent'>
                        Next Page
                        <BsArrowRight className='inline-block ml-2 text-xl' />
                    </button>
                </Link>
            </div>
        </div>
    )
}
