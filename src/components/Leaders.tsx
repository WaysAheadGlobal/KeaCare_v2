import React from 'react'
import leader1 from '../../public/leader1.jpg'
import leader2 from '../../public/leader2.jpg'
import leader3 from '../../public/leader3a.png'
import leader4 from '../../public/leader4.png'
import Image, { StaticImageData } from 'next/image'
import { BsInstagram } from 'react-icons/bs'
import { SiLinkedin } from 'react-icons/si'
import { ImFacebook2 } from 'react-icons/im'
import { FaTwitterSquare } from 'react-icons/fa'

function Card({ image, heading, subHeading, text }: { image: StaticImageData, heading: string, subHeading: string, text: string }) {
    return (
        <div className='bg-teal-500 items-center w-[20rem] rounded-lg pb-10 flex flex-col'>
            <Image src={image.src} alt={heading} width={image.width} height={image.height} className='w-full h-[20rem] rounded-t-md' />
            <div className='p-5 flex flex-col gap-3'>
                <p className='text-2xl font-bold text-white'>{heading}</p>
                <p className='text-xl font-semibold text-white'>{subHeading}</p>
                <p className='text-white text-sm'>{text}</p>
            </div>
            <div className='flex-grow'></div>
            <div className='flex flex-row items-center justify-evenly text-white text-3xl w-full'>
                <SiLinkedin />
                <BsInstagram />
                <ImFacebook2 />
                <FaTwitterSquare />
            </div>
        </div>
    )
}

export default function Leaders() {
    return (
        <section id="leaders" className='p-20 bg-[#3f3f3f] space-y-10 flex flex-col items-center justify-center'>
            <h1 className='text-teal-500 text-3xl font-semibold text-center'>Leadership</h1>
            <div className='flex flex-col flex-wrap items-center justify-center md:items-stretch md:flex-row gap-5'>
                <Card image={leader1} heading='Ho Ngoc Choung' subHeading='Chief Executive Officer' text='Ho Ngoc Chuong is the founder and CEO at KEACARE. He is also the founder and CEO of Metromart Convenience Stores where he defined and built the ERP systems, defined key functions and processes and also oversaw development of specialised software. He has over 25 years of experience in increasing revenues, gaining market share, enhancing profitability and improving the financial performance of multiple companies.' />

                <Card image={leader2} heading='Tran Thoung Thu' subHeading='Chief Executive Officer' text='Tran Thuong Thu Giang is the Chief Technology Officer at KEACARE. She has spent over 15 years working in information technology and software development across a range of industries, and hold an MSc in Computer Science from Vrije Universiteit, in Belgium.' />

                <Card image={leader3} heading='Pham Ngoc Anh' subHeading='Head of Data and Analytics' text='Pham Ngoc Anh is Head of Data & Analytics at KEACARE. She has over 16 years of experience in project management, business intelligence and analytics in the Oil and gas industry with one of the largest companies in Vietnam. She has degrees in geological science and economic insurance.' />

                <Card image={leader4} heading='Nguyen Ngoc Nam' subHeading='Head of Customer Success (Onboarding)' text='Nguyen Ngoc Nam is Head of Customer Success (Onboarding) at KEACARE. He has over 15 years experience working in account management and market development in the telecom industry. He has a Bachelor’s degree in Telecom Informatics and Business Economics from Ha Noi National University in Vietnam.' />
            </div>
        </section>
    )
}
