"use client"

import React from 'react'
import MultipleSelect from './MultipleSelect'

export default function Filter() {

    return (
        <>            
            <section id="filters" className='absolute w-[20rem] md:static flex flex-col items-start gap-4 bg-gray-200 border-[1px] border-black rounded-lg p-5 transition-transform md:translate-x-0 -translate-x-full'>
                <p className='self-start font-semibold'>FILTER PROFILES</p>
                <p className='self-end text-xs font-semibold text-red-600'>RESET FILTERS</p>
                <div>
                    <span>
                        <p className="font-bold">Type</p>
                    </span>
                    <div className="flex gap-2 items-center justify-start">
                        <input type="checkbox" value="" id="childCare" className="w-[1rem] h-[1rem]" />
                        <label>Child Care</label>
                    </div>
                    <div className="flex gap-2 items-center justify-start">
                        <input type="checkbox" value="" id="seniorCare" className="w-[1rem] h-[1rem]" />
                        <label>Senior Care</label>
                    </div>
                </div>
                <div className='font-semibold flex flex-col gap-3 ml-6 text-sm'>
                    <p>Hourly Rate</p>
                    <input type="range" name="hourlyrate" id="hourlyrate" className='outline-none' />
                    <p>Comfortable with pets</p>
                    <div className="flex gap-2 items-center justify-start -ml-6">
                        <input type="checkbox" value="" id="pets" className="w-[1rem] h-[1rem]" />
                        <label className='font-normal text-base'>Yes</label>
                    </div>
                </div>
                <div className='flex flex-col w-full gap-1'>
                    <p className='font-semibold'>Experience</p>
                    <select name="experience" id="experience" className="p-3 bg-inherit border-[1px] border-black rounded-lg outline-none">
                        <option value="">Select</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                        <option value="6">6+</option>
                        <option value="7">7+</option>
                        <option value="8">8+</option>
                        <option value="9">9+</option>
                        <option value="10">10+</option>
                    </select>
                </div>
                <div className='flex flex-col w-full gap-1'>
                    <p className='font-semibold'>Availability</p>
                    <select name="availability" id="availability_week" className="p-3 bg-inherit border-[1px] border-black rounded-lg outline-none mb-2">
                        <option value="0">Select</option>
                        <option value="1">1 Day a week</option>
                        <option value="2">2 Days a week</option>
                        <option value="3">3 Days a week</option>
                        <option value="4">4 Days a week</option>
                        <option value="5">5 Days a week</option>
                        <option value="6">6 Days a week</option>
                        <option value="7">7 Days a week</option>
                    </select>
                    <select name="availability" id="availability_perDay" className="p-3 bg-inherit border-[1px] border-black rounded-lg outline-none">
                        <option value="0">Select</option>
                        <option value="1">1 hr per day</option>
                        <option value="2">2 hrs per day</option>
                        <option value="3">3 hrs per day</option>
                        <option value="4">4 hrs per day</option>
                        <option value="5">5 hrs per day</option>
                        <option value="6">6 hrs per day</option>
                        <option value="7">7 hrs per day</option>
                        <option value="8">8 hrs per day</option>
                    </select>
                </div>
                <div>
                    <p className='font-semibold'>Gender</p>
                    <div className="flex gap-2 items-center justify-start">
                        <input type="checkbox" value="" id="gender_male" className="w-[1rem] h-[1rem]" />
                        <label>Male</label>
                    </div>
                    <div className="flex gap-2 items-center justify-start">
                        <input type="checkbox" value="" id="gender_female" className="w-[1rem] h-[1rem]" />
                        <label>Female</label>
                    </div>
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <p className='font-semibold'>Age</p>
                    <select name="availability" id="availability_perDay" className="p-3 bg-inherit border-[1px] border-black rounded-lg outline-none">
                        <option value="">Select</option>
                        <option value="21-30">21 yrs to 30 yrs</option>
                        <option value="31-40">31 yrs to 40 yrs</option>
                        <option value="41-50">41 yrs to 50 yrs</option>
                    </select>
                </div>
                <MultipleSelect heading='Language' options={["English", "French", "German", "Spanish", "Hindi"]} />
                <MultipleSelect heading='Additional Services' options={["Can Cook", "Can do Laundry", "Con do Cleaning"]} />
                <div className='flex flex-col gap-1 w-full'>
                    <p className='font-semibold'>Rating</p>
                    <select name="rating" id="rating" className="p-3 bg-inherit border-[1px] border-black rounded-lg outline-none">
                        <option value="0">Select</option>
                        <option value="1">1+</option>
                        <option value="1.5">1.5+</option>
                        <option value="2">2+</option>
                        <option value="2.5">2.5+</option>
                        <option value="3">3+</option>
                        <option value="3.5">3.5+</option>
                        <option value="4">4+</option>
                        <option value="4.5">4.5+</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </section>
        </>
    )
}
