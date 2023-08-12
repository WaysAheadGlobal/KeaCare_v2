import React from 'react'
import Appointment from './Appointment';

async function getAppointments(email: string | null) {
    if (email) {
        const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/appointments?careseekerEmail=${email}`);
        const data = await response.json();
        return data;
    }
}

export default async function LoadAppointments({ email }: { email: string | null }) {
    const appointments = await getAppointments(email);
    return (
        <section className="flex flex-col gap-10 mt-[2rem]">
            {
                appointments?.map((appointment: any) => <Appointment key={appointment.id} appointment={appointment} />)
            }
        </section>
    )
}
