"use client"

import Alert from '@/app/Alert';
import { MultiSelect } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function JobDetails() {
    const searchParams = useSearchParams();
    const [job, setJob] = useState<any>();
    const router = useRouter();
    const [selected, setSelected] = useState<Date[]>([]);
    const [rate, setRate] = useState<number>(0);
    const [info, setInfo] = useState<{ [key: string]: string }[]>([]);
    const [additionalService, setAdditionalService] = useState<string>("");
    const [languages, setLanguages] = useState<string>("");

    const handleSelect = (date: Date) => {
        const isSelected = selected.some((s) => dayjs(date).isSame(s, 'date'));
        if (isSelected) {
            setSelected((current) => current.filter((d) => !dayjs(d).isSame(date, 'date')));
        } else if (selected.length < 5) {
            setSelected((current) => [...current, date]);
        }
    };

    const [alert, setAlert] = useState<{ type: "info" | "warn" | "danger" | "success", message: string, translate_: "-translate-y-96" | "translate-y-0", key: number }>({
        type: "info",
        message: "",
        translate_: "-translate-y-96",
        key: 0
    });

    useEffect(() => {
        async function getJobById() {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/getjob?id=${searchParams.get("id")}`);
            const data = await response.json();
            setJob(data);
        }
        getJobById();
    }, [])

    useEffect(() => {
        console.log(job);
    }, [job])

    return (
        <>
            {/* <div>{JSON.stringify(job)}</div> */}
            <section className='relative'>
                <div className='sticky top-0 bg-transparent h-[1rem]'>
                    <Alert type={alert.type} message={alert.message} translate_={alert.translate_} _key={alert.key} />
                </div>
                <form className='px-[2rem] md:px-[8rem] py-[1rem]'
                    onChange={(e) => {
                        setJob({
                            ...job,
                            [(e.target as any).name]: (e.target as any).value
                        })
                    }}
                    onSubmit={async (e) => {
                        e.preventDefault();

                        setAlert({
                            type: "info",
                            message: "Posting your job. Please Wait.",
                            translate_: "translate-y-0",
                            key: alert.key + 1
                        });

                        /* const additionalService = (document.getElementById("additionalService") as HTMLSelectElement).value; */
                        const age = (document.getElementById("age") as HTMLSelectElement).value;
                        const availability = (document.getElementById("availability") as HTMLSelectElement).value;
                        const comfortableWithPets = (document.getElementById("comfortableWithPets") as HTMLSelectElement).value === "yes";
                        const experience = (document.getElementById("experience") as HTMLSelectElement).value;
                        /* const hourlyRate = (document.getElementById("hourlyRate") as HTMLInputElement).value; */
                        const jobDescription = (document.getElementById("jobDescription") as HTMLSelectElement).value;
                        /* const language = (document.getElementById("language") as HTMLSelectElement).value; */
                        const location = (document.getElementById("location") as HTMLSelectElement).value;
                        const rating = (document.getElementById("rating") as HTMLSelectElement).value;
                        const speciality = (document.getElementById("speciality") as HTMLSelectElement).value;

                        const bodyContent = JSON.stringify({
                            email: sessionStorage.getItem("email"),
                            additionalService: additionalService,
                            age: "21",
                            availability: availability,
                            comfortableWithPets: comfortableWithPets,
                            experience: experience,
                            hourlyRate: rate,
                            jobDateStart: selected[0],
                            jobDateEnd: selected[selected.length - 1],
                            jobDescription: jobDescription,
                            language: languages,
                            location: location,
                            rating: rating,
                            speciality: speciality,
                            time: info[0][dayjs(selected[0]).format("DD/MM/YYYY")]

                        });

                        const response = await fetch("https://webapi.waysdatalabs.com/keacare/api/careseeker/postjob", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: bodyContent
                        });

                        const data = await response.json();

                        if (data?.success) {
                            setAlert({
                                type: "success",
                                message: "Job Posted. Redirecting to my posts",
                                translate_: "translate-y-0",
                                key: alert.key + 1
                            });
                            setTimeout(() => router.push("/mypostings"), 1000);
                        } else {
                            setAlert({
                                type: "danger",
                                message: "Couldn't post this job. Please try again.",
                                translate_: "translate-y-0",
                                key: alert.key + 1
                            });
                        }
                    }}>
                    <h1 className='text-3xl font-semibold text-teal-500 leading-[4rem]'>Post a Job</h1>
                    <p className='font-bold'>Provide some information about services you need</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-rows-[auto] gap-5 mt-[1.5rem]'>
                        <div className='w-full'>
                            <p>Type of Care you need.</p>
                            <select id="speciality" name="speciality" value={job?.speciality} className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit invalid:focus:outline-red-500' required>
                                <option value="">Select</option>
                                <option value="child_care">Child Care</option>
                                <option value="senior_care">Senior Care</option>
                            </select>
                        </div>
                        <MultiSelect radius="md" size='md' required className='invalid:focus:outline-red-500'
                            styles={{
                                input: {
                                    borderColor: "black",
                                    ":focus-within": {
                                        borderColor: "black"
                                    }
                                },
                                label: {
                                    fontStyle: "normal",
                                    fontWeight: "normal"
                                }
                            }}
                            data={[
                                { value: 'cook', label: 'Can Cook' },
                                { value: 'laundry', label: 'Can do Laundry' },
                                { value: 'cleaning', label: 'can do Cleaning' }
                            ]}
                            label="Additional Services"
                            placeholder="Select"
                            onChange={(value) => {
                                setAdditionalService(value.toString())
                            }}
                        />
                        <div className='w-full'>
                            <p>Hourly Rate (per hour).</p>
                            <input name="rate" id="rate" required className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit px-3 invalid:focus:outline-red-500' onChange={(e) => {
                                setRate(parseInt(e.currentTarget.value));
                            }} />
                        </div>
                        <div className='w-full'>
                            <p>Experience.</p>
                            <select name="experience" id="experience" className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit invalid:focus:outline-red-500' required>
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
                        <div className='w-full'>
                            <p>Age.</p>
                            <select name="age" id="age" className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit invalid:focus:outline-red-500' required>
                                <option value="">Select</option>
                                <option value="21-30">21 yrs to 30 yrs</option>
                                <option value="31-40">31 yrs to 40 yrs</option>
                                <option value="41-50">41 yrs to 50 yrs</option>
                            </select>
                        </div>
                        <div className='w-full'>
                            <p>Location.</p>
                            <input name="location" id="location" className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit px-3 invalid:focus:outline-red-500' required placeholder='Enter Zip Code' />
                        </div>
                        <div className='w-full sm:row-[3/4]'>
                            <p>Rating.</p>
                            <select name="rating" id="rating" className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit invalid:focus:outline-red-500' required>
                                <option value="">Select</option>
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
                        <div className='w-full sm:row-[3/4] sm:col-[2/3]'>
                            <p>Availability.</p>
                            <select name="availability" id="availability" className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit invalid:focus:outline-red-500' required>
                                <option value="">Select</option>
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
                        </div>
                        <MultiSelect size='md' radius='md' required className='invalid:focus:outline-red-500'
                            styles={{
                                input: {
                                    borderColor: "black",
                                    ":focus-within": {
                                        borderColor: "black"
                                    }
                                },
                                label: {
                                    fontStyle: "normal",
                                    fontWeight: "normal"
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
                            onChange={(value) => setLanguages(value.toString())}
                        />
                        <div>
                            <p>Comfortable with Pets.</p>
                            <select name="comfortableWithPets" id="comfortableWithPets" className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit invalid:focus:outline-red-500' required>
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>
                    <div className='mt-[1.5rem]'>
                        <p>Job Description</p>
                        <textarea name="jobDescription" id="jobDescription" className='w-full min-h-[15rem] bg-inherit border-[1px] p-3 border-black rounded-lg invalid:focus:outline-red-500' required></textarea>
                    </div>
                    <hr className='h-[2.5px] bg-gray-300 my-[1.5rem]' />
                    <section className='space-y-[1rem]'>
                        <p className=''>When would you like to get these services</p>
                        <div className='grid grid-cols-1 lg:grid-cols-[min-content_auto_auto] grid-rows-[auto] gap-[4rem]'>
                            <div className='flex flex-col gap-5'>
                                <p className='font-semibold'>Select Date</p>
                                <Calendar className='place-self-center'
                                    getDayProps={(date) => ({
                                        selected: selected.some((s) => dayjs(date).isSame(s, 'date')),
                                        onClick: () => {
                                            handleSelect(date)
                                        },
                                    })}
                                />
                            </div>
                            <div className=' flex flex-col gap-5'>
                                <p className='font-semibold'>Select Time</p>
                                <select key={selected.toString()} name="time" id="time" className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit invalid:focus:outline-red-500' required onChange={(e) => {
                                    setInfo([...info, {
                                        [dayjs(selected[selected.length - 1]).format("DD/MM/YYYY")]: e.currentTarget.value
                                    }])
                                }}>
                                    <option value="">Select</option>
                                    <option value="AM_10_11">10 am to 11 am</option>
                                    <option value="AM_11_12">11 am to 12 noon</option>
                                    <option value="PM_12_13">12 noon to 1 pm</option>
                                    <option value="PM_13_14">1 pm to 2 pm</option>
                                    <option value="PM_14_15">2 pm to 3 pm</option>
                                    <option value="PM_15_16">3 pm to 4 pm</option>
                                    <option value="PM_16_17">4 pm to 5 pm</option>
                                    <option value="PM_17_18">5 pm to 6 pm</option>
                                </select>
                            </div>
                            <div className='min-h-[10rem] flex flex-col gap-[1rem]'>
                                <div className='flex justify-between w-full font-semibold'>
                                    <p>Schedule Information</p>
                                    <p>Hours</p>
                                </div>
                                <div className='flex-grow flex flex-col gap-2'>
                                    {
                                        info.map(element => {
                                            const time = element[Object.keys(element)[0]].split("_");
                                            return (
                                                <div key={Object.keys(element)[0]} className='flex justify-between'>
                                                    <p>{`${Object.keys(element)[0]}, ${time[1]} ${time[0]} to ${time[2]} ${time[0]}`}</p>
                                                    <p className='self-end text-teal-500 mt-5'>{Math.abs(parseInt(time[2]) - parseInt(time[1]))} Hours</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <hr className='h-[2.5px] bg-gray-300' />
                                <div className='flex justify-between text-sm'>
                                    <p>Total Days: {selected.length}</p>
                                    <p>Total Hours: {selected.length * 1}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='mt-[4rem] flex flex-col gap-[1rem] items-start'>
                        <p className='font-semibold text-sm'>
                            Just to let you know that you will not be charged anything to post this job. However, based on your requirements your total cost for this job after finalizing the appropriate caregiver will be approximately <span className='text-red-500 font-normal text-lg'>${rate * selected.length * 1}</span>
                        </p>
                        <p className='text-xs italic leading-[2rem]'>*Costs are calculated based on the values that you provide on hourly basis.</p>
                        <button disabled className='bg-teal-500 text-white px-5 py-3 rounded-lg'>Update this Job</button>
                    </section>
                </form>
            </section>
        </>
    )
}
