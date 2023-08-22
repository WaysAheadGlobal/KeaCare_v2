import Image from 'next/image'
import React from 'react'

export default function Appointment({ appointment }: { appointment: any }) {
    const speciality: any = {
        "child_care": "Child Care",
        "senior_care": "Senior Care"
    };
    React.useEffect(() => { console.log(appointment) }, []);
    return (
        <div className={`flex md:flex-row flex-col gap-5 justify-start md:items-center md:justify-center shadow-md hover:shadow-lg transition-shadow p-[1rem] rounded-lg ${appointment?.status === "Completed" && "grayscale"}`}>
            <Image src={appointment?.imageUrl} alt={'appointment'} width={300} height={300} className='rounded-lg w-full md:w-[300px] h-[350px] object-center object-cover' />
            <div className='flex-grow space-y-1'>
                <p className='font-semibold text-lg'>{appointment?.fname + " " + appointment?.lname}</p>
                <p className='font-bold text-xl mt-[1rem]'>Appointment Details</p>
                {
                    appointment?.date.split(";").map((d: string, index: number) => {
                        return (
                            <div key={d}>
                                <p className='font-semibold'>{d}</p>
                                <ul className='list-inside list-disc'>
                                    {
                                        appointment?.time.split(";")[index].split(",").map((t: string) => {
                                            return <li key={d + t} className='ml-4'>{t}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
                <p className='text-xl text-teal-500 font-semibold mt-[2rem]'>Status: {appointment.status}</p>
            </div>
            <div className='flex-grow space-y-1'>
                <p className='font-semibold'>Hourly Charge: ${appointment.totalPrice / appointment.time.replaceAll(";", ",").split(",").length}</p>
                <div>
                    <p className='font-semibold'>Total Hours</p>
                    <p className='text-sm'>{appointment.time.replaceAll(";", ",").split(",").length} Hours</p>
                </div>
                <p className='font-semibold'>Total Fees: <span className='text-2xl text-red-500'>${appointment.totalPrice}</span></p>
            </div>
            <div className='flex-grow space-y-4'>
                <p className='text-teal-500 text-xl text-center font-semibold'>{speciality[appointment.speciality]}</p>
                <button className='border-2 border-black rounded-lg w-full py-2'>Details</button>
            </div>
        </div>
    )
}
