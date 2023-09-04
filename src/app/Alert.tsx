import React, { useEffect, useState } from 'react'
import { AiFillWarning } from 'react-icons/ai'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { CgDanger } from 'react-icons/cg'
import { IoClose } from 'react-icons/io5'
import { FaCircleCheck } from 'react-icons/fa6'
import { Snackbar, Alert as Alert_ } from '@mui/material'

export default function Alert({ type, message, translate_, _key }: { type: "info" | "warning" | "error" | "success", message: string, translate_: "-translate-y-96" | "translate-y-0", _key: number }) {
    const [translate, setTranslate] = useState<"-translate-y-96" | "translate-y-0">("-translate-y-96");
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (message) {
            setOpen(true);
        }
    }, [_key]);

    /* switch (type) {
        case 'info':
            return (
                <div className={`absolute z-[9999] top-[3rem] w-full flex items-center justify-center transition-transform ${translate}`}>
                    <div className="bg-blue-500 shadow-xl min-w-[15rem] flex gap-[1rem] items-center justify-between text-white p-[2rem] rounded-lg">
                        <BsFillInfoCircleFill className='text-2xl' />
                        <p>{message}</p>
                        <IoClose className='text-2xl relative top-[-1rem] right-[-1rem] cursor-pointer' onClick={() => setTranslate("-translate-y-96")} />
                    </div>
                </div>
            )
        case 'warn':
            return (
                <div className={`absolute z-[9999] top-[3rem] w-full flex items-center justify-center transition-transform ${translate}`}>
                    <div className="bg-yellow-500 shadow-xl min-w-[15rem] flex gap-[1rem] items-center justify-between text-white p-[2rem] rounded-lg">
                        <AiFillWarning className='text-2xl' />
                        <p>{message}</p>
                        <IoClose className='text-2xl relative top-[-1rem] right-[-1rem] cursor-pointer' onClick={() => setTranslate("-translate-y-96")} />
                    </div>
                </div>
            )
        case 'danger':
            return (
                <div className={`absolute z-[9999] top-[3rem] w-full flex items-center justify-center transition-transform ${translate}`}>
                    <div className="bg-red-500 shadow-xl min-w-[15rem] flex gap-[1rem] items-center justify-between text-white p-[2rem] rounded-lg">
                        <CgDanger className='text-2xl' />
                        <p>{message}</p>
                        <IoClose className='text-2xl relative top-[-1rem] right-[-1rem] cursor-pointer' onClick={() => setTranslate("-translate-y-96")} />
                    </div>
                </div>
            )
        case 'success':
            return (
                <div className={`absolute z-[9999] top-[3rem] w-full flex items-center justify-center transition-transform ${translate}`}>
                    <div className="bg-green-500 shadow-xl min-w-[15rem] flex gap-[1rem] items-center justify-between text-white p-[2rem] rounded-lg">
                        <FaCircleCheck className='text-2xl' />
                        <p>{message}</p>
                        <IoClose className='text-2xl relative top-[-1rem] right-[-1rem] cursor-pointer' onClick={() => setTranslate("-translate-y-96")} />
                    </div>
                </div>
            )
    } */

    return (
        <>
            <Snackbar
                open={open}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "top"
                }}
                autoHideDuration={3000}
                onClose={() => {
                    setOpen(false);
                }}
            >
                <Alert_
                    variant="filled"
                    translate="yes"
                    severity={type}
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert_>
            </Snackbar>
        </>
    )
}
