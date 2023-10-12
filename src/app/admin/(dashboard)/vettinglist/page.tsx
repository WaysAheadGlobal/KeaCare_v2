import { Divider } from '@mui/material';
import React from 'react';
import Image, { StaticImageData } from "next/image";
import person1 from "../../../../../public/person1.jpg";
import person2 from "../../../../../public/person2.jpg";

function ListItem({ image, name, speciality }: { image: StaticImageData, name: string, speciality: string }) {
    return (
        <>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] items-center gap-4">
                <Image src={image} width={image.width} height={image.height} alt="image" className='aspect-square w-[4rem] rounded-md object-cover object-center' />
                <p>{name}</p>
                <p>{speciality}</p>
                <div className='flex flex-wrap gap-4'>
                    <button className='px-[2rem] py-2 bg-teal-100 border-2 border-teal-500 text-teal-700 rounded-full'>Accept</button>
                    <button className='px-[2rem] py-2 bg-red-100 border-2 border-red-500 text-red-700 rounded-full'>Decline</button>
                </div>
            </div>
            <Divider />
        </>
    )
}

export default function VettingList() {
    
    return (
        <section className="overflow-y-auto h-[100%] p-4 flex flex-col gap-[1rem]">
            <h1 className="p-3 text-lg bg-teal-500 text-white">VETTING LIST</h1>
            <div className='shadow-lg'>
                <div className="p-4 hidden sm:grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4">
                    <p className='font-semibold'>Profile Photo</p>
                    <p className='font-semibold'>Name</p>
                    <p className='font-semibold'>Speciality</p>
                    <p className='font-semibold'>Status</p>
                </div>
                <Divider />
                <ListItem image={person1} name={"Rahul"} speciality='Child Care' />
                <ListItem image={person2} name={"Rahul"} speciality='Senior Care' />
                <ListItem image={person1} name={"Rahul"} speciality='Child Care' />
                <ListItem image={person2} name={"Rahul"} speciality='Senior Care' />
                <ListItem image={person1} name={"Rahul"} speciality='Child Care' />
            </div>
        </section>
    )
}
