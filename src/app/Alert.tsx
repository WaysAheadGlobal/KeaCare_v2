import React, { useEffect, useState } from 'react'
import { AiFillWarning } from 'react-icons/ai'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { CgDanger } from 'react-icons/cg'
import { IoClose } from 'react-icons/io5'
import { FaCircleCheck } from 'react-icons/fa6'

export default function Alert({ type, message, translate_, _key }: { type: "info" | "warn" | "danger" | "success", message: string, translate_: "-translate-y-96" | "translate-y-0" , _key: number }) {
    const [translate, setTranslate] = useState<"-translate-y-96" | "translate-y-0">("-translate-y-96");
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (translate_ === "translate-y-0") {
            setTranslate("translate-y-0");
            timeout = setTimeout(() => setTranslate("-translate-y-96"), 4000);
        }
        return () => {
            clearInterval(timeout);
        }
    }, [_key]);
    
    switch (type) {
        case 'info':
            return (
                <div className={`absolute top-[3rem] w-full flex items-center justify-center transition-transform ${translate}`}>
                    <div className="bg-blue-500 shadow-xl min-w-[15rem] flex gap-[1rem] items-center justify-between text-white p-[2rem] rounded-lg">
                        <BsFillInfoCircleFill className='text-2xl' />
                        <p>{message}</p>
                        <IoClose className='text-2xl relative top-[-1rem] right-[-1rem] cursor-pointer' onClick={() => setTranslate("-translate-y-96")} />
                    </div>
                </div>
            )
        case 'warn':
            return (
                <div className={`absolute top-[3rem] w-full flex items-center justify-center transition-transform ${translate}`}>
                    <div className="bg-yellow-500 shadow-xl min-w-[15rem] flex gap-[1rem] items-center justify-between text-white p-[2rem] rounded-lg">
                        <AiFillWarning className='text-2xl' />
                        <p>{message}</p>
                        <IoClose className='text-2xl relative top-[-1rem] right-[-1rem] cursor-pointer' onClick={() => setTranslate("-translate-y-96")} />
                    </div>
                </div>
            )
        case 'danger':
            return (
                <div className={`absolute top-[3rem] w-full flex items-center justify-center transition-transform ${translate}`}>
                    <div className="bg-red-500 shadow-xl min-w-[15rem] flex gap-[1rem] items-center justify-between text-white p-[2rem] rounded-lg">
                        <CgDanger className='text-2xl' />
                        <p>{message}</p>
                        <IoClose className='text-2xl relative top-[-1rem] right-[-1rem] cursor-pointer' onClick={() => setTranslate("-translate-y-96")} />
                    </div>
                </div>
            )
        case 'success':
            return (
                <div className={`absolute top-[3rem] w-full flex items-center justify-center transition-transform ${translate}`}>
                    <div className="bg-green-500 shadow-xl min-w-[15rem] flex gap-[1rem] items-center justify-between text-white p-[2rem] rounded-lg">
                        <FaCircleCheck className='text-2xl' />
                        <p>{message}</p>
                        <IoClose className='text-2xl relative top-[-1rem] right-[-1rem] cursor-pointer' onClick={() => setTranslate("-translate-y-96")} />
                    </div>
                </div>
            )
    }
}
