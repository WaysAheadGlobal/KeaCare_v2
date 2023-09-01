"use client"

import React, { useState, useEffect } from 'react'
import { MultiSelect } from '@mantine/core';
import Alert from '@/app/Alert';
import { MenuItem, OutlinedInput, Select } from '@mui/material';

export default function Account() {
    const [userInfo, setUserInfo] = useState<any>();
    const [task, setTask] = useState<string[]>([]);
    const [languages, setLanguages] = useState<string[]>([]);
    const [refreshData, setRefreshData] = useState<number>(0);

    useEffect(() => {
        async function getUserInfo(email: string) {
            if (email) {
                const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/caregiver/getCaregiverInfo?email=${email}`);
                const data = await response.json();
                setUserInfo(data);
            }
        }
        const email = sessionStorage.getItem("email");
        getUserInfo(email ?? "");
        (document.getElementById("caregiver_form_update") as HTMLFormElement).reset();
    }, [refreshData])

    useEffect(() => {
        setTask(userInfo?.task.split(","));
        setLanguages(userInfo?.languages.split(","));
    }, [userInfo]);

    const convertToBase64 = (image: Blob): Promise<string | ArrayBuffer | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.onerror = (error) => {
                reject(error);
            }
            reader.readAsDataURL(image);
        })
    }

    const [alert, setAlert] = useState<{ type: "info" | "warning" | "error" | "success", message: string, translate_: "-translate-y-96" | "translate-y-0", key: number }>({
        type: "info",
        message: "",
        translate_: "-translate-y-96",
        key: 0
    });


    return (
        <>
            <div className='p-20 text-3xl font-semibold text-white bg-teal-500 text-center'>Your Account</div>
            <div className='sticky top-0 bg-transparent h-[1rem]'>
                <Alert type={alert.type} message={alert.message} translate_={alert.translate_} _key={alert.key} />
            </div>
            <form id="caregiver_form_update" className='px-[2rem] md:px-[8rem] py-[2rem] flex flex-col lg:grid lg:grid-cols-[18rem_1fr] grid-rows-1 gap-10'
                onChange={(e) => {
                    setUserInfo({
                        ...userInfo,
                        [(e.target as any).name]: (e.target as any).value
                    });
                }}
                onSubmit={async (e) => {
                    e.preventDefault();
                    const response = await fetch("https://webapi.waysdatalabs.com/keacare/api/caregiver/updateAccount", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(userInfo)
                    })

                    const data = await response.json();
                    if (data?.success) {
                        setUserInfo(data);
                        setAlert({
                            key: alert.key + 1,
                            message: "Profile Updated.",
                            translate_: "translate-y-0",
                            type: "success"
                        })
                    } else {
                        setUserInfo({
                            ...userInfo
                        });
                        setAlert({
                            key: alert.key + 1,
                            message: "Couldn't update your profile.",
                            translate_: "translate-y-0",
                            type: "error"
                        })
                    }
                }}
            >
                <div className='flex flex-col gap-[3rem]'>
                    <div className='bg-teal-500 rounded-lg flex flex-col items-center justify-start gap-10 h-[17rem]'>
                        <div className='rounded-full aspect-square w-[7rem] bg-cover bg-no-repeat bg-center relative top-[1rem]' style={{
                            backgroundImage: `url(${userInfo?.imageUrl})`
                        }}></div>
                        <p className='text-white font-semibold'>{(userInfo?.fname ?? "Loading...") + " " + (userInfo?.lname ?? "")}</p>
                        <div className='relative bottom-[-1.5rem] bg-white border-[1px] rounded-lg border-black p-3 font-semibold cursor-pointer'>
                            <label htmlFor="image" className='cursor-pointer'>Update Profile Photo</label>
                            <input type="file" id="image" className='w-0' onChange={async (e) => {
                                setUserInfo({
                                    ...userInfo,
                                    imageUrl: e.currentTarget.files ? URL.createObjectURL(e.currentTarget.files[0]) : userInfo?.imageURL,
                                    image: e.currentTarget.files ? await convertToBase64(e.currentTarget.files[0]) : undefined
                                })
                            }} />
                        </div>
                    </div>
                    <button type='button' disabled className='bg-teal-500 p-3 text-white font-semibold rounded-lg'>My Account</button>
                    <button type='button' disabled className='p-3 font-semibold rounded-lg border-[1px] border-black -mt-3'>Delete My Account</button>
                </div>

                <div className='md:px-[5rem] md:py-[5rem] flex flex-col md:grid md:grid-cols-2 md:grid-rows-[auto] gap-[2rem] md:border-[1px] md:border-black rounded-lg h-fit w-full md:w-fit' >
                    <h1 className='col-[1/3] font-semibold text-2xl self-start sm:self-end'>Your Personal Information</h1>
                    <div className='flex flex-col col-[1/2]'>
                        <span>First Name</span>
                        <input required type="text" name='fname' defaultValue={userInfo?.fname} className='border-[1px] border-black   p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col col-[2/3]'>
                        <span>Last Name</span>
                        <input required type="text" name='lname' defaultValue={userInfo?.lname} className='border-[1px] border-black   p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Date of Birth</span>
                        <input required type="date" name="dob" defaultValue={userInfo?.dob} className='border-[1px] border-black   p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Gender</span>
                        <select required disabled={userInfo?.gender} value={userInfo?.gender} className='p-3 border-[1px] border-black rounded-lg'
                            onChange={(e) => setUserInfo({
                                ...userInfo,
                                gender: e.currentTarget.value
                            })}
                        >
                            <option value={""} disabled>Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Phone Number</span>
                        <input required type="text" pattern='^[0-9]{10}$' name='mobile' defaultValue={userInfo?.mobile} className='border-[1px] border-black p-3 rounded-lg' minLength={10} maxLength={10} />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Email</span>
                        <input required type="email" name="email" defaultValue={userInfo?.email} className='border-[1px] border-black   p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Address</span>
                        <input required type="text" name="address" defaultValue={userInfo?.address} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Province</span>
                        <select required value={userInfo?.province} name="province" className="border-[1px] p-3 border-black rounded-lg"
                            onChange={(e) => setUserInfo({
                                ...userInfo,
                                province: e.currentTarget.value
                            })}
                        >
                            <option value="">Select</option>
                            <option value="Alberta">Alberta</option>
                            <option value="British Columbia">British Columbia</option>
                            <option value="Manitoba" >Manitoba</option>
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
                        <input required type="text" name="city" defaultValue={userInfo?.city} className='border-[1px] border-black   p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Zip Code</span>
                        <input required type="text"
                            pattern='^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z][ ]?[0-9][ABCEGHJ-NPRSTV-Z][0-9]$'
                            name="zipcode" defaultValue={userInfo?.zipcode} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Price per Hour</span>
                        <input required type="text" name="rate" defaultValue={userInfo?.rate} className='border-[1px] border-black p-3 rounded-lg' placeholder='Example 20' />
                    </div>
                    <p className='col-[1/3] text-center self-center'>Add Video Introduction (add one of the following format mp4, avi, mov)</p>
                    <button className='col-[1/3] text-white rounded-lg bg-teal-500 h-[3rem] w-full sm:w-[30rem] justify-self-center'>Update Intro Video</button>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Add Bio</span>
                        <textarea defaultValue={userInfo?.bio} name="bio" required className='border-[1px] border-black   p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Type of Care</span>
                        <select required value={userInfo?.speciality} name="speciality" id="careType" className='p-3 border-[1px] border-black rounded-lg'>
                            <option value="">Select</option>
                            <option value="child_care">Child Care</option>
                            <option value="senior_care">Senior Care</option>
                            <option value="child_senior_care">Both</option>
                        </select>
                    </div>
                    <MultiSelect size='md' radius='md'
                        styles={{
                            input: {
                                borderColor: "black",
                                ":focus-within": {
                                    borderColor: "black"
                                }
                            },
                            label: {
                                fontStyle: "normal",
                                fontWeight: "normal"
                            }
                        }}
                        value={task}
                        label='Additional service you can provide.'
                        data={[
                            { label: "Cook", value: 'cook' },
                            { label: "Cleaning", value: "cleaning" },
                            { label: "Laundry", value: "laundry" }
                        ]}
                        onChange={(e) => {
                            setTask(e);
                            setUserInfo({
                                ...userInfo,
                                task: e
                            })
                        }}
                    />
                    <div className='flex flex-col'>
                        <span>How far you can travel from your locality.</span>
                        <select required value={userInfo?.distance} name="distance" id="distance" className="border-[1px] p-3 border-black rounded-lg">
                            <option value="" disabled>Select</option>
                            <option value="1">Within 1 km</option>
                            <option value="2">Within 2 km</option>
                            <option value="3">Within 3 km</option>
                            <option value="4">Within 4 km</option>
                            <option value="5">Within 5 km</option>
                            <option value="6">Within 6 km</option>
                            <option value="7">Within 7 km</option>
                            <option value="8">Within 8 km</option>
                            <option value="9">Within 9 km</option>
                            <option value="10">Within 10 km</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <span>Experience (in years)</span>
                        <select required value={userInfo?.experience} name="experience" className="border-[1px] p-3 border-black rounded-lg">
                            <option value="" disabled>Select</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                            <option value="5">5+</option>
                            <option value="6">6+</option>
                            <option value="7">7+</option>
                            <option value="8">8+</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <span>Education Qualification</span>
                        <select required value={userInfo?.education} name="education" className="border-[1px] p-3 border-black rounded-lg">
                            <option value="" disabled>Select</option>
                            <option value="Under Graduate">Under Graduate</option>
                            <option value="Graduate">Graduate</option>
                            <option value="Post Graduate">Post Graduate</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <span>Certifications (Degree/Diploma)</span>
                        <select required value={userInfo?.certifications} name="certifications" className="border-[1px] p-3 border-black rounded-lg">
                            <option value="" disabled>Select</option>
                            <option
                                value="A Child Development Assistant (formerly Level 1)">
                                A Child Development Assistant (formerly Level 1)
                            </option>
                            <option value="A Child Development Worker (formerly Level 2)">A Child Development Worker (formerly Level 2)
                            </option>
                            <option
                                value="The Family Child Care Training Program (level 1)">
                                The Family Child Care Training Program (level 1)
                            </option>
                            <option
                                value="The Family Child Care Training Program (level 2)">
                                The Family Child Care Training Program (level 2)</option>
                            <option
                                value="The Family Child Care Training Program (level 3)">
                                The Family Child Care Training Program (level 3)</option>
                            <option
                                value="Level 3 Diploma in Adult Care">
                                Level 3 Diploma in Adult Care
                            </option>
                            <option value="Safeguarding Adults">
                                Safeguarding Adults
                            </option>
                            <option value="Elderly Care Certificate">
                                Elderly Care Certificate
                            </option>
                            <option
                                value="Advanced National Caregiver Certification Course (ANCCC)">
                                Advanced National Caregiver Certification Course (ANCCC)
                            </option>
                            <option
                                value="Certificate of Caregiver Ethics: Level 1">
                                Certificate of Caregiver Ethics: Level 1
                            </option>
                            <option
                                value="Certificate of Caregiver Leadership: Level 1">
                                Certificate of Caregiver Leadership: Level 1
                            </option>
                            <option
                                value="Certificate of Personal Development: Level 1">
                                Certificate of Personal Development: Level 1
                            </option>
                            <option
                                value="National Assisted Living Manager Certification Course (NALMCC)">
                                National Assisted Living Manager Certification Course (NALMCC)
                            </option>
                            <option
                                value="National Caregiver Certification Course (NCCC)">
                                National Caregiver Certification Course (NCCC)
                            </option>
                        </select>
                    </div>
                    <MultiSelect size='md' radius='md'
                        styles={{
                            input: {
                                borderColor: "black",
                                ":focus-within": {
                                    borderColor: "black"
                                }
                            },
                            label: {
                                fontStyle: "normal",
                                fontWeight: "normal"
                            }
                        }}
                        value={languages}
                        label='Add Language'
                        data={[
                            { label: "English", value: "English" },
                            { label: "French", value: "French" },
                            { label: "German", value: "German" },
                            { label: "Spanish", value: "Spanish" },
                            { label: "Hindi", value: "Hindi" },
                            { label: "Vietnamese", value: "Vietnamese" }
                        ]}
                        onChange={(e) => {
                            setLanguages(e);
                            setUserInfo({
                                ...userInfo,
                                languages: e
                            })
                        }}
                    />
                    <div className='flex flex-col'>
                        <span>Availability (Select Working Days)</span>
                        <Select required multiple fullWidth id="daysAWeek"
                            sx={{ height: "3rem" }}
                            value={userInfo?.daysAWeek?.split(",") ?? []}
                            onChange={(e) => {
                                const value = e.target.value.toString();
                                setUserInfo({
                                    ...userInfo,
                                    daysAWeek: value.startsWith(",") ? value.substring(1) : value
                                });
                            }}
                            input={<OutlinedInput color='success' />} >
                            <MenuItem value={"Monday"}>Monday</MenuItem>
                            <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                            <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                            <MenuItem value={"Thursday"}>Thursday</MenuItem>
                            <MenuItem value={"Friday"}>Friday</MenuItem>
                            <MenuItem value={"Saturday"}>Saturday</MenuItem>
                            <MenuItem value={"Sunday"}>Sunday</MenuItem>
                        </Select>
                    </div>
                    <div className='flex flex-col'>
                        <span>Availability (Select Working Hours)</span>
                        <Select required multiple id="workingHrs"
                            sx={{ height: "3rem" }}
                            value={userInfo?.workingHrs?.split(",") ?? []}
                            onChange={(e) => {
                                const value = e.target.value.toString();
                                setUserInfo({
                                    ...userInfo,
                                    workingHrs: value.startsWith(",") ? value.substring(1) : value
                                });
                            }}
                            input={<OutlinedInput color='success' />} >
                            <MenuItem value={"9 AM to 10 AM"}>9 AM to 10 AM</MenuItem>
                            <MenuItem value={"10 AM to 11 AM"}>10 AM to 11 AM</MenuItem>
                            <MenuItem value={"11 AM to 12 Noon"}>11 AM to 12 Noon</MenuItem>
                            <MenuItem value={"12 Noon to 1 PM"}>12 Noon to 1 PM</MenuItem>
                            <MenuItem value={"1 PM to 2 PM"}>1 PM to 2 PM</MenuItem>
                            <MenuItem value={"2 PM to 3 PM"}>2 PM to 3 PM</MenuItem>
                            <MenuItem value={"3 PM to 4 PM"}>3 PM to 4 PM</MenuItem>
                            <MenuItem value={"4 PM to 5 PM"}>4 PM to 5 PM</MenuItem>
                            <MenuItem value={"5 PM to 6 PM"}>5 PM to 6 PM</MenuItem>
                            <MenuItem value={"6 PM to 7 PM"}>6 PM to 7 PM</MenuItem>
                            <MenuItem value={"7 PM to 8 PM"}>7 PM to 8 PM</MenuItem>
                            <MenuItem value={"8 PM to 9 PM"}>8 PM to 9 PM</MenuItem>
                        </Select>
                    </div>
                    <div className='col-[1/3] flex flex-row justify-between'>
                        <button type='submit' className='bg-teal-500 text-white font-semibold px-[3rem] py-[1rem] rounded-xl'>Update</button>
                        <button type='button' className='text-teal-500 font-semibold hover:bg-gray-200 focus:bg-gray-200  px-[3rem] py-[1rem] rounded-xl' onClick={(e) => {
                            e.preventDefault();
                            setRefreshData(refreshData => refreshData++);
                        }}>Disgard</button>
                    </div>
                </div>
            </form>
        </>
    )
}
