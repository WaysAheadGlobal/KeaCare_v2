"use client"

import React, { useEffect, useState } from 'react'
import defaultUser from '../../../../public/defaultUser.png'
import Image from 'next/image';
import { MultiSelect } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { MenuItem, OutlinedInput, Select } from '@mui/material';

export default function Registration() {
    const router = useRouter();
    const [imageURL, setImageURL] = useState<string>(defaultUser.src);
    const [languages, setLanguages] = useState<string[]>([]);
    const [additionalServices, setAdditionalServices] = useState<string[]>([]);
    const [email, setEmail] = useState<string | null>("");
    const [daysAWeek, setDaysAWeek] = useState<string>();
    const [workingHrs, setWorkingHrs] = useState<string>();

    useEffect(() => {
        setEmail(sessionStorage.getItem("email"));
    }, [])

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

    return (
        <>
            <h1 className='py-[3rem] px-[2rem] text-center text-3xl text-white bg-teal-500 font-bold'>Complete your Registration</h1>
            <section className='flex flex-col items-center justify-center p-[2rem] sm:p-[5rem]'>
                <form className='md:px-[5rem] md:py-[5rem] flex flex-col md:grid md:grid-cols-2 md:grid-rows-[auto] gap-[2rem] md:border-[1px] md:border-black rounded-lg h-fit w-full md:w-fit'
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const profilePhoto = ((document.getElementById("profilePhoto") as HTMLInputElement).files as FileList)[0];
                        const fname = (document.getElementById("fname") as HTMLInputElement).value;
                        const lname = (document.getElementById("lname") as HTMLInputElement).value;
                        const email = (document.getElementById("email_regis") as HTMLInputElement).value;
                        const mobile = (document.getElementById("mobile") as HTMLInputElement).value;
                        const dob = (document.getElementById("dob") as HTMLInputElement).value;
                        const gender = (document.getElementById("gender") as HTMLSelectElement).value;
                        const address = (document.getElementById("address") as HTMLInputElement).value;
                        const city = (document.getElementById("city") as HTMLInputElement).value;
                        const province = (document.getElementById("province") as HTMLInputElement).value;
                        const zipcode = (document.getElementById("zipcode") as HTMLInputElement).value;
                        const speciality = (document.getElementById("speciality") as HTMLSelectElement).value;
                        const experience = (document.getElementById("experience") as HTMLSelectElement).value;
                        const comfortableWithPets = (document.getElementById("comfortableWithPets") as HTMLSelectElement).value;
                        const rate = (document.getElementById("rate") as HTMLInputElement).value;
                        const bio = (document.getElementById("bio") as HTMLTextAreaElement).value;
                        const certifications = (document.getElementById("certifications") as HTMLSelectElement).value;
                        const distance = (document.getElementById("distance") as HTMLSelectElement).value;
                        const education = (document.getElementById("education") as HTMLSelectElement).value;
                        const ref1Email = (document.getElementById("ref1Email") as HTMLInputElement).value;
                        const ref1Name = (document.getElementById("ref1Name") as HTMLInputElement).value;
                        const ref1Phone = (document.getElementById("ref1Phone") as HTMLInputElement).value;
                        const ref1Relation = (document.getElementById("ref1Relation") as HTMLInputElement).value;
                        const ref2Email = (document.getElementById("ref2Email") as HTMLInputElement).value;
                        const ref2Name = (document.getElementById("ref2Name") as HTMLInputElement).value;
                        const ref2Phone = (document.getElementById("ref2Phone") as HTMLInputElement).value;
                        const ref2Relation = (document.getElementById("ref2Relation") as HTMLInputElement).value;

                        const bodyContent = JSON.stringify({
                            image: {
                                file: await convertToBase64(profilePhoto),
                                name: profilePhoto.name.split(".")[0]
                            },
                            fname: fname,
                            lname: lname,
                            email: email,
                            mobile: mobile,
                            dob: dob,
                            gender: gender,
                            address: address,
                            city: city,
                            province: province,
                            zipcode: zipcode,
                            device_type: "web",
                            status: "active",
                            languages: languages.toString().substring(0, languages.toString().length),
                            speciality: speciality,
                            experience: experience,
                            comfortableWithPets: (comfortableWithPets === "yes") ? true : false,
                            task: additionalServices.toString().substring(0, additionalServices.toString().length),
                            rate: rate,
                            daysAWeek: daysAWeek,
                            workingHrs: workingHrs,
                            bio: bio,
                            certifications: certifications,
                            distance: distance,
                            education: education,
                            ref1Email: ref1Email,
                            ref1Name: ref1Name,
                            ref1Phone: ref1Phone,
                            ref1Relation: ref1Relation,
                            ref2Email: ref2Email,
                            ref2Name: ref2Name,
                            ref2Phone: ref2Phone,
                            ref2Relation: ref2Relation
                        });

                        try {
                            const response = await fetch("http://localhost:3004/keacare/api/caregiver/registration", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: bodyContent
                            });

                            const data = await response.json();
                            if (data?.success) {
                                router.push("/caregiver/account");
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }} >
                    <p className='col-[1/3] font-semibold text-2xl self-center md:self-end'>Your Personal Information</p>
                    <div className='flex flex-col items-center justify-center gap-3 col-[1/3] row-[2/3] place-self-center'>
                        <Image src={imageURL} width={defaultUser.width} height={defaultUser.height} alt='Profile Photo' className='rounded-full aspect-square w-[15rem] border-2 border-black object-cover object-center' />
                        <input required id="profilePhoto" type="file" accept='image/png, image/jpg, image/jpeg' className='file:bg-teal-500 file:text-white file:border-0 file:px-[1.5rem] file:py-[0.5rem] file:rounded-lg text-opacity-100' onChange={async (e) => {
                            const files = e.currentTarget.files;
                            if (files) {
                                setImageURL(URL.createObjectURL(files[0]));
                            }
                        }} />
                    </div>
                    <div className='flex flex-col col-[1/2]'>
                        <span>First Name</span>
                        <input id="fname" required type="text" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col col-[2/3]'>
                        <span>Last Name</span>
                        <input id="lname" required type="text" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Date of Birth</span>
                        <input id="dob" required type="date" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Gender</span>
                        <select id="gender" required className='p-3 border-[1px] border-black  rounded-lg'>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Phone Number</span>
                        <input id="mobile" required type="text" pattern='^[0-9]{10}$' className='border-[1px] border-black p-3 rounded-lg' minLength={10} maxLength={10} />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Email</span>
                        <input id="email_regis" required type="email" defaultValue={email ? email : undefined} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Address</span>
                        <input id="address" required type="text" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Province</span>
                        <select id="province" required className="border-[1px] p-3 border-black   rounded-lg" >
                            <option value="">Select</option>
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
                        <input id="city" required type="text" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Zip Code</span>
                        <input id="zipcode" required type="text" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Price per Hour</span>
                        <input id="rate" required type="text" className='border-[1px] border-black p-3 rounded-lg' placeholder='Example 20' />
                    </div>
                    <p className='col-[1/3] text-center self-center'>Add Video Introduction (add one of the following format mp4, avi, mov)</p>
                    <button className='col-[1/3] text-white rounded-lg bg-teal-500 h-[3rem] sm:w-full md:w-[30rem] justify-self-center'>Upload Intro Video</button>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Add Bio</span>
                        <textarea id="bio" required className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Comfortable With Pets</span>
                        <select id="comfortableWithPets" required className='p-3 border-[1px] border-black rounded-lg'>
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <span>Type of Care</span>
                        <select id="speciality" required className='p-3 border-[1px] border-black rounded-lg'>
                            <option value="">Select</option>
                            <option value="child_care">Child Care</option>
                            <option value="senior_care">Senior Care</option>
                        </select>
                    </div>
                    <MultiSelect size='md' radius='md' styles={{
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
                        label='Additional service you can provide.'
                        data={[
                            { label: "Cook", value: 'cook' },
                            { label: "Cleaning", value: "cleaning" },
                            { label: "Laundry", value: "laundry" }
                        ]}
                        onChange={(value) => {
                            setAdditionalServices(value);
                        }}
                    />
                    <div className='flex flex-col'>
                        <span>How far you can travel from your locality.</span>
                        <select id="distance" required className="border-[1px] p-3 border-black   rounded-lg" >
                            <option value="">Select</option>
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
                        <select id="experience" required className="border-[1px] p-3 border-black   rounded-lg" >
                            <option value="">Select</option>
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
                        <select id="education" required className="border-[1px] p-3 border-black   rounded-lg" >
                            <option value="">Select</option>
                            <option value="Under Graduate">Under Graduate</option>
                            <option value="Graduate">Graduate</option>
                            <option value="Post Graduate">Post Graduate</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <span>Certifications (Degree/Diploma)</span>
                        <select id="certifications" required className="border-[1px] p-3 border-black   rounded-lg" >
                            <option value="">Select</option>
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
                    <MultiSelect size='md' radius='md' styles={{
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
                        label='Add Language'
                        data={[
                            { label: "English", value: "English" },
                            { label: "French", value: "French" },
                            { label: "German", value: "German" },
                            { label: "Spanish", value: "Spanish" },
                            { label: "Hindi", value: "Hindi" },
                            { label: "Vietnamese", value: "Vietnamese" }
                        ]}
                        onChange={(value) => {
                            setLanguages(value);
                        }}
                    />
                    <div className='flex flex-col'>
                        <span>Availability (Select Working Days)</span>
                        <Select multiple fullWidth id="daysAWeek" required
                            sx={{ height: "3rem" }}
                            value={daysAWeek?.split(",") ?? []}
                            onChange={(e) => { setDaysAWeek(e.target.value.toString()) }}
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
                        <Select multiple id="workingHrs" required
                            sx={{ height: "3rem" }}
                            value={workingHrs?.split(",") ?? []}
                            onChange={(e) => { setWorkingHrs(e.target.value.toString()) }}
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
                    <p className='row-[18/19] col-[1/3] place-self-center font-semibold text-xl'>Add Professional References</p>
                    <p className='col-[1/3] place-self-center font-semibold'>Reference 1</p>
                    <div className='flex flex-col'>
                        <span>Name</span>
                        <input id="ref1Name" required type="text" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Phone Number</span>
                        <input id="ref1Phone" required pattern='^[0-9]{10}$' type="text" className='border-[1px] border-black p-3 rounded-lg' minLength={10} maxLength={10} />
                    </div>
                    <div className='flex flex-col'>
                        <span>Email</span>
                        <input id="ref1Email" required type="email" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Relation</span>
                        <select id="ref1Relation" required className="border-[1px] p-3 border-black   rounded-lg" >
                            <option value="">Select</option>
                            <option value="Sibling">Sibling</option>
                            <option value="Colleague">Colleague</option>
                            <option value="Friend">Friend</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <p className='col-[1/3] place-self-center font-semibold'>Reference 2</p>
                    <div className='flex flex-col'>
                        <span>Name</span>
                        <input id="ref2Name" required type="text" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Phone Number</span>
                        <input id="ref2Phone" pattern='^[0-9]{10}$' required type="text" className='border-[1px] border-black p-3 rounded-lg' minLength={10} maxLength={10} />
                    </div>
                    <div className='flex flex-col'>
                        <span>Email</span>
                        <input id="ref2Email" required type="email" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Relation</span>
                        <select id="ref2Relation" required className="border-[1px] p-3 border-black   rounded-lg" >
                            <option value="">Select</option>
                            <option value="Sibling">Sibling</option>
                            <option value="Colleague">Colleague</option>
                            <option value="Friend">Friend</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-10 col-[1/3] justify-center items-center w-full'>
                        <div className='flex flex-row gap-3 items-center justify-center'>
                            <input type="checkbox" className='w-[1.5rem] h-[1.5rem] accent-teal-600 bg-white' />
                            <p>I Hereby Give Full Authorisation For Release Of Information For Background Verification Puposes</p>
                        </div>
                        <button className='bg-teal-500 text-white font-semibold py-3 px-[2rem] md:px-[5rem] rounded-lg'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}
