"use client"

import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import RecommendedCard from './RecommendedCard'
/* import SearchResultCard from './SearchResultCard' */


export default function Caregivers({ filters }: { filters: any }) {
    const [caregivers, setCaregivers] = useState<any[]>([]);
    const [page, setPage] = useState<string>("1");

    useEffect(() => {
        async function getCaregivers() {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/getCaregivers?page=${page}`, {
                next: {
                    revalidate: 10
                }
            });
            const data = await response.json();
            setCaregivers(data);
        }
        getCaregivers();
    }, [page])

    useEffect(() => {
        async function filter() {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/filters?speciality=${filters?.speciality}&pet=${filters?.pets}&rate=${filters?.rate}&experience=${filters?.experience}&daysAWeek=${filters?.daysAWeek}&hrs=${filters?.hrs}&gender=${filters?.gender}&age=${filters?.age}&languages=${filters?.languages}&addservices=${filters?.addservices}&rating=${filters?.rating}`);

            const data = await response.json();
            setCaregivers(data);
        }
        filter();
        return () => {
            Promise.resolve();
        }
    }, [filters]);

    return (
        <div id="contents" className='flex flex-col gap-8 w-full items-start'>
            <div className='flex flex-col md:flex-row md:items-center gap-3 md:gap-10 w-full'>
                <select name="location" id="location" className='p-3 bg-inherit border-[1px] border-black rounded-lg outline-none md:flex-grow'>
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
                    <input type="text" className='p-3 bg-inherit border-[1px] border-black rounded-l-lg outline-none w-full hover:ring-4 hover:ring-teal-400 focus:ring-4 focus:ring-teal-400 hover:rounded-r-lg focus:rounded-r-lg hover:border-teal-600 focus:border-teal-600' placeholder='Search Caregivers (type name, speciality, etc.)' />
                    <div className='bg-teal-500 p-[14px] rounded-r-lg border-[1px] border-teal-500'>
                        <FiSearch className='text-xl text-white' />
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <h1 className='text-3xl font-semibold text-teal-500'>Recommended for you</h1>
                <p className='text-gray-400 mt-2'>{caregivers?.length} People in your locality have already appointed these caregivers.</p>
                <div className='flex flex-row flex-wrap gap-5 mt-5'>
                    {
                        caregivers.map((caregiver: any) => {
                            return <RecommendedCard key={caregiver?.id} caregiver={caregiver} />
                        })
                    }
                </div>
            </div>
            {/* <div className='w-full'>
                <h1 className='text-3xl font-semibold text-teal-500'>Search Results</h1>
                <p className='text-gray-400 mt-2'>34 profiles based on your search criteria.</p>
                <div className='flex flex-col items-center justify-center gap-5 mt-5'>
                    <SearchResultCard />
                    <SearchResultCard />
                    <SearchResultCard />
                    <SearchResultCard />
                </div>
            </div> */}
        </div>
    )
}
