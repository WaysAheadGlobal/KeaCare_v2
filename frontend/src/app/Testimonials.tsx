"use client"

import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

export default function Testimonials() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const animate = useAnimation();

    useEffect(() => {
        if (isInView) {
            animate.start("visible")
        }
    }, [isInView]);

    return (
        <>
            <div id="testimonials" className='-mt-5'>{"   "}</div>
            <motion.section className='p-20 hidden'
                ref={ref}
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={animate}
                transition={{ duration: 0.5 }}
            >
                <h1 className='text-teal-500 text-center text-3xl font-semibold mb-20'>Testimonials</h1>
                <article>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda deserunt omnis delectus eum qui reprehenderit perspiciatis ad iusto officiis voluptatum est culpa vero vitae, soluta rem similique aliquam aut itaque nostrum placeat! Eligendi magnam velit, debitis deleniti architecto aliquid illo tenetur amet repellendus soluta animi doloribus ab minus deserunt commodi sequi quisquam ea. Nisi ipsam doloremque natus ea ex aliquam repudiandae, eveniet sed quisquam quos deleniti placeat, debitis assumenda id veniam distinctio. Repellendus ab debitis veritatis quas omnis beatae ullam saepe consequuntur! Maiores ab aliquid porro quibusdam harum sunt odit amet quas repellat maxime est, qui dolorem fugiat repudiandae pariatur!
                </article>
            </motion.section>
        </>
    )
}
