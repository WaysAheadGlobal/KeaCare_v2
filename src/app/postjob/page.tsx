"use client"

import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import Alert from '@/app/Alert';
import { useRouter } from 'next/navigation';
import { OutlinedInput, MenuItem, FormGroup, FormControlLabel, Select, Checkbox } from '@mui/material';
import { teal } from '@mui/material/colors';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function PostJob() {
    const router = useRouter();
    const [rate, setRate] = useState<number>(0);
    const [additionalService, setAdditionalService] = useState<string>("");
    const [languages, setLanguages] = useState<string>("");
    const [appointment, setAppointment] = useState<{ [key: string]: string[] }>({});
    const [date, setDate] = useState<string>("");
    const [Time, setTime] = useState<string[]>([]);
    const [job, setJob] = useState<any>();

    const [alert, setAlert] = useState<{ type: "info" | "warn" | "danger" | "success", message: string, translate_: "-translate-y-96" | "translate-y-0", key: number }>({
        type: "info",
        message: "",
        translate_: "-translate-y-96",
        key: 0
    });

    const checkBoxStyle = {
        '&.Mui-checked': {
            color: teal[500],
        },
    }

    const time: { [key: string]: string } = {
        "AM_10_11": "10 am to 11 am",
        "AM_11_12": "11 am to 12 pm",
        "PM_12_13": "12 pm to 1 pm",
        "PM_13_14": "1 pm to 2 pm",
        "PM_14_15": "2 pm to 3 pm",
        "PM_15_16": "3 pm to 4 pm",
        "PM_16_17": "4 pm to 5 pm",
        "PM_17_18": "5 pm to 6 pm"
    }

    useEffect(() => {
        let _time: string[] = [];
        for (const key in appointment) {
            _time.push(...appointment[key]);
        }
        setTime([..._time]);
    }, [appointment]);

    useEffect(() => { console.log(job) }, [job]);

    return (
        <section className='relative'>
            <div className='sticky top-0 bg-transparent h-[1rem]'>
                <Alert type={alert.type} message={alert.message} translate_={alert.translate_} _key={alert.key} />
            </div>
            <form className='px-[2rem] md:px-[8rem] py-[1rem]'
                onChange={(e) => {
                    setJob({
                        ...job,
                        [(e.target as any).name]: (e.target as any).value,
                        time: { ...appointment },
                        additionalService,
                        languages
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

                    const bodyContent = JSON.stringify({ job, email: sessionStorage.getItem("email") });

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
                        <select id="speciality" name="speciality" className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit invalid:focus:outline-red-500' required>
                            <option value="">Select</option>
                            <option value="child_care">Child Care</option>
                            <option value="senior_care">Senior Care</option>
                        </select>
                    </div>
                    <div className='w-full'>
                        <p>Additional Services</p>
                        <Select multiple fullWidth required
                            sx={{
                                height: "3rem",
                                borderRadius: "0.5rem",
                            }}
                            value={additionalService ? additionalService.split(",") : []}
                            onChange={(e) => setAdditionalService(e.target.value.toString())}
                            input={<OutlinedInput color='success' />}
                        >
                            <MenuItem value={"cook"}>Cook</MenuItem>
                            <MenuItem value={"laundry"}>Laundry</MenuItem>
                            <MenuItem value={"cleaning"}>Cleaning</MenuItem>
                        </Select>
                    </div>
                    <div className='w-full'>
                        <p>Hourly Rate (per hour).</p>
                        <input name="hourlyRate" id="hourlyRate" required className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit px-3 invalid:focus:outline-red-500' onChange={(e) => {
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
                    <div className='w-full'>
                        <p>Add Language</p>
                        <Select multiple fullWidth required
                            sx={{
                                height: "3rem",
                                borderRadius: "0.5rem",
                            }}
                            value={languages ? languages.split(",") : []}
                            onChange={(e) => setLanguages(e.target.value.toString())}
                            input={<OutlinedInput color='success' />}
                        >
                            <MenuItem value={"English"}>English</MenuItem>
                            <MenuItem value={"French"}>French</MenuItem>
                            <MenuItem value={"German"}>German</MenuItem>
                            <MenuItem value={"Spanish"}>Spanish</MenuItem>
                            <MenuItem value={"Hindi"}>Hindi</MenuItem>
                            <MenuItem value={"Vietnamese"}>Vietnamese</MenuItem>
                        </Select>
                    </div>
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
                            <div>
                                <p className='font-semibold'>Select Date</p>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateCalendar disablePast className='bg-teal-500 bg-opacity-50 rounded-lg mt-[1rem]'
                                        onChange={(newValue: any) => {

                                            setAppointment({
                                                ...appointment,
                                                [dayjs(newValue).format("DD/MM/YYYY")]: []
                                            })
                                            setDate(dayjs(newValue).format("DD/MM/YYYY"))
                                        }} />
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div>
                                <p className='font-semibold'>Select Time</p>
                                <FormGroup key={date}
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gridTemplateRows: "auto"
                                    }}
                                    onChange={(e) => {
                                        if (date) {
                                            if ((e.target as any).checked) {
                                                setAppointment({
                                                    ...appointment,
                                                    [date]: [...appointment[date], (e.target as any).value]
                                                })
                                            } else {
                                                setAppointment({
                                                    ...appointment,
                                                    [date]: [...appointment[date].filter(t => t !== (e.target as any).value)]
                                                })
                                            }
                                        }
                                    }}
                                >
                                    <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"AM_10_11"} />} label="10 am to 11 am" />
                                    <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"AM_11_12"} />} label="11 am to 12 pm" />
                                    <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"PM_12_13"} />} label="12 pm to 1 pm" />
                                    <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"PM_13_14"} />} label="1 pm to 2 pm" />
                                    <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"PM_14_15"} />} label="2 pm to 3 pm" />
                                    <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"PM_15_16"} />} label="3 pm to 4 pm" />
                                    <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"PM_16_17"} />} label="4 pm to 5 pm" />
                                    <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"PM_17_18"} />} label="5 pm to 6 pm" />
                                </FormGroup>
                            </div>
                        </div>
                        <div className='min-h-[10rem] flex flex-col gap-[1rem]'>
                            <div className='flex justify-between w-full font-semibold'>
                                <p>Schedule Information</p>
                                <p>Hours</p>
                            </div>
                            <div className='flex-grow flex flex-col gap-4 mt-[1rem] h-[20rem] overflow-auto'>
                                {
                                    Object.keys(appointment).map(key => {
                                        return (
                                            <div key={key} className='flex justify-between'>
                                                <p>{key}</p>
                                                <div className='flex justify-end flex-wrap gap-1 max-w-[16rem]'>
                                                    {
                                                        appointment[key].map(e => <span className='bg-teal-300 p-2 rounded-md' key={e}>{time[e]} </span>)
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <hr className='h-[2.5px] bg-gray-300' />
                            <div className='flex justify-between text-sm'>
                                <p>Total Days: {Object.keys(appointment).length}</p>
                                <p>Total Hours: {Time.length}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='mt-[4rem] flex flex-col gap-[1rem] items-start'>
                    <p className='font-semibold text-sm'>
                        Just to let you know that you will not be charged anything to post this job. However, based on your requirements your total cost for this job after finalizing the appropriate caregiver will be approximately <span className='text-red-500 font-normal text-lg'>${rate * Time.length}</span>
                    </p>
                    <p className='text-xs italic leading-[2rem]'>*Costs are calculated based on the values that you provide on hourly basis.</p>
                    <button disabled={Time.length === 0} className='bg-teal-500 disabled:bg-opacity-25 text-white px-5 py-3 rounded-lg'>Post this Job</button>
                </section>
            </form>
        </section>
    )
}
