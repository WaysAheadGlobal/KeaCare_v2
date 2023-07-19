import { motion, useInView, useAnimation } from 'framer-motion';
import Image, { StaticImageData } from 'next/image'
import React, { useEffect, useRef } from 'react'

export default function Card({ image, heading, text, delay }: { image: StaticImageData, heading: string, text: string, delay: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const animate = useAnimation();

    useEffect(() => {
        if (isInView) {
            animate.start("visible")
        }
    }, [isInView]);
    return (
        <motion.div className='bg-white p-[2rem] w-[20rem] text-black flex flex-col gap-5 items-center justify-evenly rounded-lg hover:shadow-2xl transition-shadow hover:bg-opacity-80'
            ref={ref}
            variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={animate}
            transition={{ duration: 0.5, delay: delay }}
        >
            <Image src={image.src} width={image.width} height={image.height} alt={heading} className='w-[7rem]' />
            <p className='text-2xl font-semibold'>{heading}</p>
            <p className='text-base'>{text}</p>
        </motion.div>
    )
}
