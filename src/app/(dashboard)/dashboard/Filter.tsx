"use client"

import React, { useState } from 'react'
import { MultiSelect } from '@mantine/core';
import { MenuItem, OutlinedInput, Select } from "@mui/material"

export default function Filter({ filters, setFilters }: { filters: any, setFilters: any }) {
    const [key, setKey] = useState<string>("1");
    return (
        <>
            <section key={key} id="filters" className='sticky top-0 h-fit w-[20rem] md:static flex flex-col items-start gap-4 bg-gray-200 border-[1px] border-black rounded-lg p-5 transition-transform md:translate-x-0 -translate-x-full'>
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
                                    (document.getElementById("seniorCare") as HTMLInputElement).checked = !e.currentTarget.checked;
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
                                    (document.getElementById("childCare") as HTMLInputElement).checked = !e.currentTarget.checked;
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
                <div className='flex flex-col gap-3 text-sm w-full pr-8'>
                    <p className='font-semibold'>Hourly Rate</p>
                    <div className='grid grid-cols-[125px_10px_125px] gap-3 h-[40px]'>
                        <input type="number" className='p-2 rounded-md outline-none border-2 border-teal-600 hover:ring-2 hover:ring-teal-500 focus:ring-2 focus:ring-teal-500'
                            onChange={(e) => {
                                setFilters({
                                    ...filters,
                                    rateStart: e.target.value
                                });
                            }} />
                        <p className='justify-self-center self-center'>to</p>
                        <input type="number" className='p-2 rounded-md outline-none border-2 border-teal-600 hover:ring-2 hover:ring-teal-500 focus:ring-2 focus:ring-teal-500'
                            onChange={(e) => {
                                setFilters({
                                    ...filters,
                                    rateEnd: e.target.value
                                });
                            }} />
                    </div>
                    <p className='font-semibold'>Comfortable with pets</p>
                    <div className="flex gap-2 items-center justify-start">
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
                    <p className='font-semibold'>Day of Week</p>
                    <Select required multiple fullWidth
                        name="availability"
                        id="availability_week"
                        sx={{ height: "3rem", borderRadius: "7px" }}
                        value={filters?.daysAWeek?.split(",") ?? []}
                        onChange={(e) => {
                            setFilters({
                                ...filters,
                                daysAWeek: e.target.value.toString()
                            });
                        }}
                        input={<OutlinedInput color='success' />} >
                        <MenuItem value={"Monday"}>Monday</MenuItem>
                        <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                        <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                        <MenuItem value={"Thursday"}>Thursday</MenuItem>
                        <MenuItem value={"Friday"}>Friday</MenuItem>
                        <MenuItem value={"Saturday"}>Saturday</MenuItem>
                        <MenuItem value={"Sunday"}>Sunday</MenuItem>
                    </Select>
                    <p className='font-semibold mt-4'>Time</p>
                    <Select required multiple fullWidth name="availability" id="availability_perDay"
                        sx={{ height: "3rem", borderRadius: "7px" }}
                        value={filters?.hrs?.split(",") ?? []}
                        onChange={(e) => {
                            setFilters({
                                ...filters,
                                hrs: e.target.value.toString()
                            });
                        }}
                        input={<OutlinedInput color='success' />} >
                        <MenuItem value={"9 AM to 10 AM"}>9 AM to 10 AM</MenuItem>
                        <MenuItem value={"10 AM to 11 AM"}>10 AM to 11 AM</MenuItem>
                        <MenuItem value={"11 AM to 12 Noon"}>11 AM to 12 Noon</MenuItem>
                        <MenuItem value={"12 Noon to 1 PM"}>12 Noon to 1 PM</MenuItem>
                        <MenuItem value={"1 PM to 2 PM"}>1 PM to 2 PM</MenuItem>
                        <MenuItem value={"2 PM to 3 PM"}>2 PM to 3 PM</MenuItem>
                        <MenuItem value={"3 PM to 4 PM"}>3 PM to 4 PM</MenuItem>
                        <MenuItem value={"4 PM to 5 PM"}>4 PM to 5 PM</MenuItem>
                        <MenuItem value={"5 PM to 6 PM"}>5 PM to 6 PM</MenuItem>
                        <MenuItem value={"6 PM to 7 PM"}>6 PM to 7 PM</MenuItem>
                        <MenuItem value={"7 PM to 8 PM"}>7 PM to 8 PM</MenuItem>
                        <MenuItem value={"8 PM to 9 PM"}>8 PM to 9 PM</MenuItem>
                    </Select>
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
                    <select name="age" id="age"
                        className="p-3 bg-inherit border-[1px] border-black rounded-lg outline-none"
                        onChange={(e) => {
                            setFilters({
                                ...filters,
                                age: e.target.value
                            })
                        }}
                    >
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
                    label='Can speak the language'
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
                    label='More services'
                    data={[
                        { label: "Exercise and physical therapy", value: "Exercise and physical therapy" },
                        { label: "Transportation", value: 'Transportation' },
                        { label: "Meal planning and preparation", value: "Meal planning and preparation" },
                        { label: "Housekeeping", value: "Housekeeping" },
                        { label: "Medication management", value: 'Medication management' },
                        { label: "Emotional support", value: "Emotional support" },
                        { label: "Companionship", value: "Companionship" },
                        { label: "Pet Care", value: 'Pet Care' },
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
