"use client"

import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

export default function MultipleSelect({ heading, options, backgroundColor = "bg-inherit" }: { heading: string, options: string[], backgroundColor?: string }) {
    const [_options, setOptions] = useState<string[]>(["Select"]);

    useEffect(() => {
        if (_options.length === 0) {
            setOptions(["Select"]);
        }
    }, [_options])

    return (
        <div className='flex flex-col gap-1 w-full relative'>
            <p className='font-semibold'>{heading}</p>
            <div className={`pl-3 pr-1 py-3 ${backgroundColor} border-[1px] border-black rounded-lg outline-none min-h-[3rem] flex gap-2 items-center flex-wrap w-full`}>
                {
                    _options.map(option => {
                        if (option === "Select") {
                            return (
                                <div key={option}>
                                    {option}
                                </div>
                            )
                        } else {
                            return (
                                <div key={option} className='relative z-10 bg-teal-500 text-white py-1 px-2 rounded-md flex justify-between gap-3 items-center'>
                                    <p>{option}</p>
                                    <RxCross2 onClick={(e) => {
                                        setOptions(_options.filter(_option => _option !== e.currentTarget.previousElementSibling?.textContent))
                                    }} />
                                </div>
                            )
                        }
                    })
                }
                <div className='flex-grow'></div>
                <FaAngleDown className='text-sm' />
            </div>
            <select name={heading.toLowerCase()} id={heading.toLowerCase()} className="p-3 bg-inherit rounded-lg outline-none absolute right-0 top-[28px] w-full text-transparent" onChange={(e) => {
                if (!_options.includes("Select") && !_options.includes(e.currentTarget.value) && e.currentTarget.value !== "Select") {
                    setOptions([..._options, e.currentTarget.value])
                } else if (_options.includes("Select") && e.currentTarget.value !== "Select") {
                    setOptions([e.currentTarget.value])
                }
            }}>
                <option className='text-black' value="Select">Select</option>
                {
                    options.map(option => {
                        return (
                            <option key={option} className='text-black' value={option}>{option}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}
