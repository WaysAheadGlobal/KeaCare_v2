import React from 'react'

export default function Registration() {
    return (
        <form className='pb-20'>
            <div className='p-10 bg-teal-500'>
                <h1 className='text-center text-3xl font-semibold text-white'>Complete your Registration</h1>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-col lg:grid lg:grid-rows-[repeat(7,_minmax(20px,_1fr))] lg:grid-cols-2 gap-10 mt-10 w-full p-5 lg:w-[60rem]'>
                    <p className='col-[1/3] row-[1/2] lg:self-end text-2xl'>Personal Information</p>
                    <div className='flex flex-col'>
                        <span>First Name</span>
                        <input required type="text" className='border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none p-4 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Last Name</span>
                        <input required type="text" className='border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none p-4 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Date of Birth</span>
                        <input required type="date" className='border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none p-4 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Gender</span>
                        <select className='p-4 border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none rounded-lg'>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Phone Number</span>
                        <input required type="text" className='border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none p-4 rounded-lg' />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Email</span>
                        <input required type="email" className='border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none p-4 rounded-lg' />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Address</span>
                        <input required type="text" className='border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none p-4 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Province</span>
                        <select className="border-2 p-4 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none rounded-lg" >
                            <option value="Select">Select</option>
                            <option value="Alberta">Alberta</option>
                            <option value="British Columbia">British Columbia</option>
                            <option value="Manitoba">Manitoba</option>
                            <option value="New Brunswick">New Brunswick</option>
                            <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                            <option value="Northwest Territories">Northwest Territories</option>
                            <option value="Nova Scotia">Nova Scotia</option>
                            <option value="Nunavut">Nunavut</option>
                            <option value="Ontario">Ontario</option>
                            <option value="Prince Edward Island">Prince Edward Island</option>
                            <option value="Quebec">Quebec</option>
                            <option value="Saskatchewan">Saskatchewan</option>
                            <option value="Yukon">Yukon</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <span>City</span>
                        <input required type="text" className='border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none p-4 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Zip Code</span>
                        <input required type="text" className='border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 outline-none p-4 rounded-lg' />
                    </div>
                    <button className='px-5 py-4 bg-teal-500 text-white row-[9/10] rounded-lg'>Submit</button>
                    <button className='text-teal-500 text-lg justify-self-end font-semibold row-[9/10] col-[2/3]'>Skip</button>
                </div>
            </div>
        </form>
    )
}
