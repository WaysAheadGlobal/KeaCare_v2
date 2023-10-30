import React from 'react'
import Link from 'next/link';
import Button from './Button';

async function getCaregiver(id: string, cookies: any) {
    const res = await fetch(`https://webapi.waysdatalabs.com/keacare/api/admin/getcaregiver?id=${id}`, {
        cache: "no-store",
        headers: {
            "Authorization": `${cookies.getCookie("token")}`,
            "Content-Type": "application/json"
        }
    });
    const data = await res.json();
    return data;
}


export default async function Details({ searchParams, cookies }: { searchParams: { [key: string]: string }, cookies: any }) {
    const caregiver = await getCaregiver(searchParams.id, cookies);
    return (
        <section className='p-5'>
            <div className='grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'>
                <img src={caregiver.imageUrl} decoding='async' loading='lazy' width={500} height={500} className='w-full sm:w-[20rem] h-[20rem] object-cover rounded-lg' />
                <img src={caregiver.imageUrl} decoding='async' loading='lazy' width={500} height={500} className='w-full sm:w-[20rem] h-[20rem] object-cover rounded-lg' />
                <div className='space-y-4 w-full'>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-sm'>Name</label>
                        <input readOnly type="text" id="name" value={caregiver.fname + " " + caregiver.lname} className='border-2 border-gray-600/50 rounded-md px-3 py-2' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="bio" className='text-sm'>Bio</label>
                        <textarea readOnly name="bio" id="bio" cols={30} className='border-2 border-gray-600/50 rounded-md px-3 py-2 min-h-[10rem]' value={caregiver.bio} />
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-5'>
                <div className='flex flex-col'>
                    <label htmlFor="DOB" className='text-sm'>DOB</label>
                    <input readOnly type="text" id="DOB" value={caregiver.dob} className='border-2 border-gray-600/50 rounded-md px-3 py-2' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email" className='text-sm'>Email</label>
                    <input readOnly type="text" id="email" value={caregiver.email} className='border-2 border-gray-600/50 rounded-md px-3 py-2' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="mobile" className='text-sm'>Phone Number</label>
                    <input readOnly type="text" id="mobile" value={caregiver.mobile} className='border-2 border-gray-600/50 rounded-md px-3 py-2' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="gender" className='text-sm'>Gender</label>
                    <input readOnly type="text" id="gender" value={caregiver.gender} className='border-2 border-gray-600/50 rounded-md px-3 py-2' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="address" className='text-sm'>Address</label>
                    <input readOnly type="text" id="address" value={caregiver.address} className='border-2 border-gray-600/50 rounded-md px-3 py-2' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="province" className='text-sm'>Province</label>
                    <input readOnly type="text" id="province" value={caregiver.province} className='border-2 border-gray-600/50 rounded-md px-3 py-2' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="zipcode" className='text-sm'>Zipcode</label>
                    <input readOnly type="text" id="zipcode" value={caregiver.zipcode} className='border-2 border-gray-600/50 rounded-md px-3 py-2' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="zipcode" className='text-sm'>Zipcode</label>
                    <input readOnly type="text" id="zipcode" value={caregiver.zipcode} className='border-2 border-gray-600/50 rounded-md px-3 py-2' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="education" className='text-sm'>Education</label>
                    <input readOnly type="text" id="education" value={caregiver.education} className='border-2 border-gray-600/50 rounded-md px-3 py-2' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="certifications" className='text-sm'>Certifications</label>
                    <input readOnly type="text" id="certifications" value={caregiver.certifications?.startsWith("other") ? caregiver.certifications.split("_")[1] : caregiver.certifications} className='border-2 border-gray-600/50 rounded-md px-3 py-2' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="speciality" className='text-sm'>Speciality</label>
                    <input readOnly type="text" id="speciality" value={caregiver.speciality.replaceAll("_", " ")} className='border-2 border-gray-600/50 rounded-md px-3 py-2' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="task" className='text-sm'>Additional Services</label>
                    <input readOnly type="text" id="task" value={caregiver.task.replaceAll(",", ", ")} className='border-2 border-gray-600/50 rounded-md px-3 py-2' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="languages" className='text-sm'>Languages</label>
                    <input readOnly type="text" id="languages" value={caregiver.languages.replaceAll(",", ", ")} className='border-2 border-gray-600/50 rounded-md px-3 py-2' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="rate" className='text-sm'>Hourly Rate</label>
                    <input readOnly type="text" id="rate" value={caregiver.rate} className='border-2 border-gray-600/50 rounded-md px-3 py-2' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="comfortableWithPets" className='text-sm'>Comfortable With Pets</label>
                    <input readOnly type="text" id="comfortableWithPets" value={caregiver.comfortableWithPets ? "Yes" : "No"} className='border-2 border-gray-600/50 rounded-md px-3 py-2' />
                </div>
            </div>
            <div className='mt-8 space-y-4'>
                <p>Availability</p>
                <div className='flex flex-wrap gap-x-8 gap-y-4'>
                    {
                        caregiver.daysAWeek.split(",").map((item: any) => {
                            if (item) {
                                return <div key={item} className='p-4 rounded-md bg-teal-500'>{item}</div>
                            }
                        })
                    }
                </div>
                <div className='flex flex-wrap gap-x-8 gap-y-4'>
                    {
                        caregiver.workingHrs.split(",").map((item: any) => {
                            if (item) {
                                return <div key={item} className='p-4 rounded-md bg-teal-500'>{item}</div>
                            }
                        })
                    }
                </div>
            </div>
            <div className='flex justify-end w-full mt-10 gap-5'>
                <Link href="/admin/vettinglist" className='px-[2rem] py-2 bg-purple-100 border-2 border-purple-500 text-purple-700 rounded-full'>Back</Link>
                <Button id={searchParams.id} type="accept" />
                <Button id={searchParams.id} type="decline" />
            </div>
        </section>
    )
}
