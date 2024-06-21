"use client"

import React, { useState, useEffect } from 'react'
import Appointment from './Appointment';

export default async function LoadAppointments({ email, token }: { email: string | null, token: any }) {
    const [appointments, setAppointments] = useState<any>([]);

    useEffect(() => {
        async function getAppointments(email: string | null, token: any) {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/appointments?careseekerEmail=${email}`, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setAppointments(data);
        }        
        getAppointments(email, token);
    }, [email, token]);

    if (appointments?.length === 0) {
        return (
            <section className='py-10 px-[3rem] lg:px-[7rem]'>
                <div className='text-gray-500 flex items-center justify-center h-[30rem] text-lg'>
                    <p>No appointments yet.</p>
                </div>
            </section>
        )
    } else {
        return (
            <section className="flex flex-col gap-10 mt-[2rem]">
                {
                    appointments?.map((appointment: any) => <Appointment key={appointment.id} appointment={appointment} />)
                }
            </section>
        )
    }
}
