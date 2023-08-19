"use client"

import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import React, { useState, useEffect, useContext } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { teal } from '@mui/material/colors'
import { Checkbox, FormControlLabel, FormGroup, Button, Divider, Alert } from '@mui/material';
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import AlertContext from './AlertContext'

export default function Appointment({ price, id }: { price: number, id: number | null }) {
    const router = useRouter();
    const { alert, setAlert } = useContext(AlertContext);
    const [appointment, setAppointment] = useState<{ [key: string]: string[] }>({});
    const [date, setDate] = useState<string>("");
    const [Time, setTime] = useState<string[]>([]);
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

    return (
        <div className='p-[1rem]'>
            <h1 className='text-3xl font-semibold text-teal-400'>Book Appointment</h1>
            <div className='flex flex-col xl:flex-row gap-[2rem] justify-between mt-[2rem]'>
                <div>
                    <p className='font-bold text-xl'>Select Date</p>
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
                <div>
                    <p className='font-bold text-xl'>Select Time</p>
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
                <div className='flex flex-col w-full md:max-w-[25rem]'>
                    <div className='font-bold text-xl flex justify-between'>
                        <p>Appointment Details</p>
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
                    <Divider role="presentation" />
                    <div className='flex justify-between mt-[1rem]'>
                        <p>Total Days: {Object.keys(appointment).length} Days</p>
                        <p>Total Fees: ${price * Time.length}</p>
                    </div>
                    <div className='flex justify-between mt-[1rem]'>
                        <Button variant='contained' size='large' disabled={Time.length === 0}
                            sx={{
                                backgroundColor: teal[500],
                                ":hover": {
                                    backgroundColor: teal[600]
                                }
                            }}
                            onClick={async () => {
                                const body = JSON.stringify({
                                    careseekerEmail: sessionStorage.getItem("email"),
                                    caregiverId: id,
                                    price: price * Time.length,
                                    appointment: appointment,
                                });
                                const response1 = await fetch("https://webapi.waysdatalabs.com/keacare/api/careseeker/appointments/checkAppointments", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: body
                                });
                                const check = await response1.json();
                                if (check?.success) {
                                    const response = await fetch("https://webapi.waysdatalabs.com/keacare/api/careseeker/appointments", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: body
                                    });
                                    const data = await response.json();
                                    router.push(data);
                                } else {
                                    setAlert({
                                        type: "danger",
                                        message: check?.error,
                                        translate_: "translate-y-0",
                                        key: alert.key + 1
                                    });
                                }
                            }}
                        >Confirm</Button>
                        <Button variant='contained' size='large' className='!bg-red-500 hover:!bg-red-600'>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
