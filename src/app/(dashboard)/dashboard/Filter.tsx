"use client"

import React, { useState } from 'react'
import { MultiSelect } from '@mantine/core';
import { Slider } from "@mui/material"

export default function Filter({ filters, setFilters }: { filters: any, setFilters: any }) {
    const [key, setKey] = useState<string>("1");
    return (
        <>
            <section key={key} id="filters" className='absolute w-[20rem] md:static flex flex-col items-start gap-4 bg-gray-200 border-[1px] border-black rounded-lg p-5 transition-transform md:translate-x-0 -translate-x-full'>
                <p className='self-start font-semibold'>FILTER PROFILES</p>
                <p className='self-end text-xs font-semibold text-red-600 cursor-pointer' onClick={() => {
                    setKey(key => (parseInt(key) + 1).toString());
                    setFilters({
                        speciality: "",
                        pet: "",
                        rate: "",
                        experience: "",
                        daysAWeek: "",
                        hrs: "",
                        gender: "",
                        age: "",
                        languages: "",
                        addservices: "",
                        rating: ""
                    });
                }}>RESET FILTERS</p>
                <div>
                    <span>
                        <p className="font-bold">Type</p>
                    </span>
                    <div className="flex gap-2 items-center justify-start">
                        <input type="checkbox" value="child_care" id="childCare" className="w-[1rem] h-[1rem]"
                            onChange={(e) => {
                                if (e.currentTarget.checked) {
                                    setFilters({
                                        ...filters,
                                        speciality: "child_care"
                                    });
                                } else {
                                    setFilters({
                                        ...filters,
                                        speciality: ""
                                    });
                                }
                            }} />
                        <label>Child Care</label>
                    </div>
                    <div className="flex gap-2 items-center justify-start">
                        <input type="checkbox" value="senior_care" id="seniorCare" className="w-[1rem] h-[1rem]"
                            onChange={(e) => {
                                if (e.currentTarget.checked) {
                                    setFilters({
                                        ...filters,
                                        speciality: "senior_care"
                                    });
                                } else {
                                    setFilters({
                                        ...filters,
                                        speciality: ""
                                    });
                                }
                            }} />
                        <label>Senior Care</label>
                    </div>
                </div>
                <div className='font-semibold flex flex-col gap-3 ml-6 text-sm w-full pr-8'>
                    <p>Hourly Rate</p>
                    <Slider defaultValue={0} valueLabelDisplay="auto" sx={{ width: "100%" }} onChange={(e) => {
                        if ((e.target as any).value !== 0) {
                            setFilters({
                                ...filters,
                                rate: (e.target as any).value
                            });
                        } else {
                            setFilters({
                                ...filters,
                                rate: ""
                            });
                        }
                    }} max={1000} />
                    <p>Comfortable with pets</p>
                    <div className="flex gap-2 items-center justify-start -ml-6">
                        <input type="checkbox" value="yes" id="pets" className="w-[1rem] h-[1rem]"
                            onChange={(e) => {
                                if (e.currentTarget.checked) {
                                    setFilters({
                                        ...filters,
                                        pets: true
                                    });
                                } else {
                                    setFilters({
                                        ...filters,
                                        pets: ""
                                    });
                                }
                            }} />
                        <label className='font-normal text-base'>Yes</label>
                    </div>
                </div>
                <div className='flex flex-col w-full gap-1'>
                    <p className='font-semibold'>Experience</p>
                    <select name="experience" id="experience" className="p-3 bg-inherit border-[1px] border-black rounded-lg outline-none" onChange={(e) => {
                        if (e.currentTarget.value === "select") {
                            setFilters({
                                ...filters,
                                experience: ""
                            });
                        } else {
                            setFilters({
                                ...filters,
                                experience: e.currentTarget.value
                            });
                        }
                    }}>
                        <option value="select">Select</option>
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
                    <select name="availability" id="availability_week" className="p-3 bg-inherit border-[1px] border-black rounded-lg outline-none mb-2" onChange={(e) => {
                        if (e.currentTarget.value === "select") {
                            setFilters({
                                ...filters,
                                daysAWeek: ""
                            });
                        } else {
                            setFilters({
                                ...filters,
                                daysAWeek: e.currentTarget.value
                            });
                        }
                    }}>
                        <option value="select">Select</option>
                        <option value="1">1 Day a week</option>
                        <option value="2">2 Days a week</option>
                        <option value="3">3 Days a week</option>
                        <option value="4">4 Days a week</option>
                        <option value="5">5 Days a week</option>
                        <option value="6">6 Days a week</option>
                        <option value="7">7 Days a week</option>
                    </select>
                    <select name="availability" id="availability_perDay" className="p-3 bg-inherit border-[1px] border-black rounded-lg outline-none" onChange={(e) => {
                        if (e.currentTarget.value === "select") {
                            setFilters({
                                ...filters,
                                hrs: ""
                            });
                        } else {
                            setFilters({
                                ...filters,
                                hrs: e.currentTarget.value
                            });
                        }
                    }}>
                        <option value="select">Select</option>
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
                        <input type="checkbox" value="Male" id="gender_male" className="w-[1rem] h-[1rem]"
                            onChange={(e) => {
                                if (e.currentTarget.checked) {
                                    setFilters({
                                        ...filters,
                                        gender: "Male"
                                    });
                                } else {
                                    setFilters({
                                        ...filters,
                                        gender: ""
                                    });
                                }
                            }} />
                        <label>Male</label>
                    </div>
                    <div className="flex gap-2 items-center justify-start">
                        <input type="checkbox" value="Female" id="gender_female" className="w-[1rem] h-[1rem]"
                            onChange={(e) => {
                                if (e.currentTarget.checked) {
                                    setFilters({
                                        ...filters,
                                        gender: "Female"
                                    });
                                } else {
                                    setFilters({
                                        ...filters,
                                        gender: ""
                                    });
                                }
                            }} />
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
                <MultiSelect className='w-full' size='md' radius='md'
                    styles={{
                        input: {
                            borderColor: "black",
                            backgroundColor: "inherit",
                            ":focus-within": {
                                borderColor: "black"
                            }
                        },
                        label: {
                            fontStyle: "normal",
                            fontWeight: "bold"
                        },
                        value: {
                            backgroundColor: "#14b8a6",
                            color: "white",
                        }
                    }}
                    label='Add Language'
                    data={[
                        { label: "English", value: "English" },
                        { label: "French", value: "French" },
                        { label: "German", value: "German" },
                        { label: "Spanish", value: "Spanish" },
                        { label: "Hindi", value: "Hindi" },
                        { label: "Vietnamese", value: "Vietnamese" }
                    ]}
                    onChange={(values) => {
                        setFilters({
                            ...filters,
                            languages: values.toString().slice(1, -1)
                        })
                    }}
                />
                <MultiSelect className='w-full' size='md' radius='md'
                    styles={{
                        input: {
                            borderColor: "black",
                            backgroundColor: "inherit",
                            ":focus-within": {
                                borderColor: "black"
                            }
                        },
                        label: {
                            fontStyle: "normal",
                            fontWeight: "bold"
                        },
                        value: {
                            backgroundColor: "#14b8a6",
                            color: "white",
                        }
                    }}
                    label='Additional service you can provide.'
                    data={[
                        { label: "Can do Cook", value: 'cook' },
                        { label: "Can do Cleaning", value: "cleaning" },
                        { label: "Can do Laundry", value: "laundry" }
                    ]}
                    onChange={(values) => {
                        setFilters({
                            ...filters,
                            addservices: values.toString().slice(1, -1)
                        })
                    }}
                />
                <div className='flex flex-col gap-1 w-full'>
                    <p className='font-semibold'>Rating</p>
                    <select name="rating" id="rating" className="p-3 bg-inherit border-[1px] border-black rounded-lg outline-none"
                        onChange={(e) => {
                            if (e.currentTarget.value === "select") {
                                setFilters({
                                    ...filters,
                                    rating: ""
                                });
                            } else {
                                setFilters({
                                    ...filters,
                                    rating: e.currentTarget.value
                                });
                            }
                        }}>
                        <option value="select">Select</option>
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
