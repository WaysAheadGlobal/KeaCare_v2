import React from 'react'
import Appointment from './Appointment';

async function getAppointments(email: string | null) {
    if (email) {
        const response = await fetch(`http://localhost:3004/keacare/api/careseeker/appointments?careseekerEmail=${email}`);
        const data = await response.json();
        return data;
    }
}

export default async function LoadAppointments({ email }: { email: string | null }) {
    const appointments = await getAppointments(email);
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
