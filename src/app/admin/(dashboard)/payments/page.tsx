import { Divider } from '@mui/material';
import React from 'react';
import Image, { StaticImageData } from "next/image";
import person1 from "../../../../../public/person1.jpg";
import person2 from "../../../../../public/person2.jpg";

function ListItem({ image, name, speciality, amount }: { image: StaticImageData, name: string, speciality: string, amount: string }) {
    return (
        <>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] items-center gap-4">
                <Image src={image} width={image.width} height={image.height} alt="image" className='aspect-square w-[4rem] rounded-md object-cover object-center' />
                <article className='flex gap-1'>
                    <p className='sm:hidden'>Name:</p>
                    <p>{name}</p>
                </article>
                <article className='flex gap-1'>
                    <p className='sm:hidden'>Speciality:</p>
                    <p>{speciality}</p>
                </article>
                <article className='flex gap-1'>
                    <p className='sm:hidden'>Amount:</p>
                    <p className='font-medium'>{amount}</p>
                </article>
                <div className='flex flex-wrap gap-4'>
                    <button className='px-[2rem] py-2 bg-teal-100 border-2 border-teal-500 text-teal-700 rounded-full'>Pay</button>
                </div>
            </div>
            <Divider />
        </>
    )
}

export default function Payments() {
    return (
        <section className="overflow-y-auto h-[100%] p-4 flex flex-col gap-[1rem]">
            <h1 className="p-3 text-lg bg-teal-500 text-white">PAYMENTS</h1>
            <div className='shadow-lg'>
                <div className="p-4 font-semibold hidden sm:grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4">
                    <p>Profile Photo</p>
                    <p>Name</p>
                    <p>Speciality</p>
                    <p>Amount</p>
                    <p>Action</p>
                </div>
                <Divider />
                <ListItem image={person1} name={"Rahul"} speciality='Child Care' amount='$100' />
                <ListItem image={person2} name={"Rahul"} speciality='Senior Care' amount='$100' />
                <ListItem image={person1} name={"Rahul"} speciality='Child Care' amount='$100' />
                <ListItem image={person2} name={"Rahul"} speciality='Senior Care' amount='$100' />
                <ListItem image={person1} name={"Rahul"} speciality='Child Care' amount='$100' />
            </div>
        </section>
    )
}
