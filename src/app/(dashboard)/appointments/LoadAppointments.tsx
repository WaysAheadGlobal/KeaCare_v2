import React from 'react'
import Appointment from './Appointment';
import { Container } from '@mui/material';

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
        <Container maxWidth="lg" sx={{
            marginY: 5
        }}>
            <section className="flex flex-col gap-10">
                {
                    appointments?.map((appointment: any) => <Appointment key={appointment.id} appointment={appointment} />)
                }
            </section>
        </Container>
    )
}
