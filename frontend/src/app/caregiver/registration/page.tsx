"use client"

import { useCookies } from '@/Hooks/useCookies';
import AlertContext from '@/app/AlertContext';
import { MultiSelect } from '@mantine/core';
import { CircularProgress, MenuItem, OutlinedInput, Select } from '@mui/material';
import { LoadScript } from '@react-google-maps/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react';
import defaultUser from '../../../../public/defaultUser.png';

const libraries: ('places')[] = ['places'];

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string;

export default function Registration() {
    const router = useRouter();
    const [imageURL, setImageURL] = useState<string>(defaultUser.src);
    const [languages, setLanguages] = useState<string[]>([]);
    const [additionalServices, setAdditionalServices] = useState<string[]>([]);
    const [autoFill, setAutoFill] = useState<{ [key: string]: string | null }>({});
    const [daysAWeek, setDaysAWeek] = useState<string>();
    const [workingHrs, setWorkingHrs] = useState<string>();
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setAlert } = useContext(AlertContext);
    const cookies = useCookies();
    const certificationsRef = useRef<HTMLSelectElement>(null);
    const [videoSrc, setVideoSrc] = useState<string>("");
    const videoFileRef = useRef<HTMLInputElement>(null);

    const [pincode, setPincode] = useState("");
    const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
    const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);

    useEffect(() => {
        if (pincode.length > 1) { // Adjust length based on your pincode format
            getSuggestions(pincode);
        }
    }, [pincode]);

    useEffect(() => {
        setAutoFill({
            email: sessionStorage.getItem("email"),
            phoneno: sessionStorage.getItem("phoneno"),
        })
    }, [])

    const handleLoad = () => {
        autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
    }

    const getSuggestions = (input: string) => {
        const request = {
            input: input,
            componentRestrictions: { country: 'ca' },
        };

        autocompleteServiceRef.current?.getPlacePredictions(request, (result) => {
            console.log(result);
            setSuggestions(result || []);
        });
    };

    const fetchPlaceDetails = (placeId: string) => {
        const google = window.google;

        if (google) {
            const maps = google.maps;
            const service = new maps.places.PlacesService(document.createElement('div'));

            service.getDetails({
                placeId,
                fields: ['address_components', 'formatted_address'], // Request all address components
            }, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                    const addressComponents = place.address_components || [];
                    let address = '';
                    let city = '';
                    let province = '';
                    let pincode = '';

                    addressComponents.forEach(component => {
                        const types = component.types;
                        if (types.includes('street_number') || types.includes('route')) {
                            address += component.long_name + ' ';
                        } else if (types.includes('locality')) {
                            city = component.long_name;
                        } else if (types.includes('administrative_area_level_1')) {
                            province = component.long_name;
                        } else if (types.includes('postal_code')) {
                            pincode = component.long_name;
                        }
                    });

                    document.getElementById("address")?.setAttribute("value", address);
                    document.getElementById("province")?.setAttribute("value", province);
                    setPincode(pincode);
                    document.getElementById("city")?.setAttribute("value", city);

                } else {
                    console.error('Place details request failed with status:', status);
                }
            });
        } else {
            console.error('Google Maps JavaScript API not loaded!');
        }
    };


    const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(Object.fromEntries(new FormData(e.currentTarget)));

        const formData__ = new FormData(e.currentTarget);

        setAlert({
            message: "Please wait while we are processing your request.",
            type: "info",
            open: true
        });

        const fname = (document.getElementById("fname") as HTMLInputElement)?.value ?? '';
        const lname = (document.getElementById("lname") as HTMLInputElement)?.value ?? '';
        const email = (document.getElementById("email_regis") as HTMLInputElement)?.value ?? '';
        const mobile = (document.getElementById("mobile") as HTMLInputElement)?.value ?? '';
        const dob = (document.getElementById("dob") as HTMLInputElement)?.value ?? '';
        const gender = (document.getElementById("gender") as HTMLSelectElement)?.value ?? '';
        const address = (document.getElementById("address") as HTMLInputElement)?.value ?? '';
        const city = (document.getElementById("city") as HTMLInputElement)?.value ?? '';
        const province = (document.getElementById("province") as HTMLInputElement)?.value ?? '';
        const zipcode = pincode;
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
        const governmentid = (document.getElementById("governmentid") as HTMLInputElement).value;
        const smoke = (document.getElementById("smoke") as HTMLSelectElement).value;
        const videoSurveillance = (document.getElementById("videoSurveillance") as HTMLSelectElement).value;
        const socialmedia = (document.getElementById("socialmedia") as HTMLInputElement).value;

        const bodyContent = JSON.stringify({
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
            languages: languages.toString().substring(0, languages.toString().length),
            speciality: speciality,
            experience: experience,
            comfortableWithPets: comfortableWithPets === "yes",
            task: additionalServices.toString().substring(0, additionalServices.toString().length),
            rate: rate,
            daysAWeek: daysAWeek,
            workingHrs: workingHrs,
            bio: bio,
            certifications: certifications === "other" ? "other_" + (document.getElementById("certifications_others") as HTMLSelectElement).value : certifications,
            distance: distance,
            education: education,
            governmentId: governmentid,
            smoke: smoke,
            videoSurveillance: videoSurveillance,
            ref1Email: ref1Email,
            ref1Name: ref1Name,
            ref1Phone: ref1Phone,
            ref1Relation: ref1Relation,
            ref2Email: ref2Email,
            ref2Name: ref2Name,
            ref2Phone: ref2Phone,
            ref2Relation: ref2Relation,
            socialmedia: socialmedia
        });

        try {
            setLoading(true);
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/caregiver/registration`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${cookies.getCookie("token")}`
                },
                body: bodyContent
            });

            const data = await response.json();

            if (data?.success) {
                let formData = new FormData();
                const file = (document.getElementById("profilePhoto") as HTMLInputElement)?.files?.[0];
                formData.append("image", file ?? "");
                formData.append("fileType", file?.type.split("/")[1] ?? "");
                formData.append("id", data?.id);
                const res = await fetch(`https://webapi.waysdatalabs.com/keacare/api/caregiver/uploadImage`, {
                    method: "POST",
                    headers: {
                        "Authorization": `${cookies.getCookie("token")}`
                    },
                    body: formData
                });
                const data2 = await res.json();

                let formData_ = new FormData();
                const file_ = videoFileRef.current?.files?.[0];
                formData_.append("video", file_ ?? "");
                formData_.append("fileType", file_?.type.split("/")[1] ?? "");
                formData_.append("id", data?.id);
                const res_ = await fetch(`https://webapi.waysdatalabs.com/keacare/api/caregiver/uploadVideo`, {
                    method: "POST",
                    headers: {
                        "Authorization": `${cookies.getCookie("token")}`
                    },
                    body: formData_
                });
                const data3 = await res_.json();

                const res__ = await fetch(`https://webapi.waysdatalabs.com/keacare/api/caregiver/uploadDocuments`, {
                    method: "POST",
                    headers: {
                        "Authorization": `${cookies.getCookie("token")}`
                    },
                    body: formData__
                });

                const data4 = await res__.json();

                if (data2?.success && data3?.success && data4?.success) {
                    setLoading(false);
                    router.push("/caregiver/account");
                }
            } else {
                setLoading(false);
                setAlert({
                    message: "Email or mobile number already in use. Please try again.",
                    type: "error",
                    open: true
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <LoadScript onLoad={handleLoad} googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
            <h1 className='py-[3rem] px-[2rem] text-center text-3xl text-white bg-teal-500 font-bold'>Complete your Registration</h1>
            <section className='flex flex-col items-center justify-center p-[2rem] sm:p-[5rem] bg-[#F3FDFD] '>
                <form className='md:px-[5rem] md:py-[5rem] flex flex-col md:grid md:grid-cols-2 md:grid-rows-[auto] gap-[2rem] md:border-[1px] md:border-black rounded-lg h-fit w-full md:w-fit'
                    onSubmit={handleRegistration} >
                    <p className='col-[1/3] font-semibold text-2xl self-center md:self-end'>Your Personal Information</p>
                    <div className='flex flex-col items-center justify-center gap-3 col-[1/3] row-[2/3] place-self-center'>
                        <Image src={imageURL} width={defaultUser.width} height={defaultUser.height} alt='Profile Photo' className='rounded-full aspect-square w-[15rem] border-2 border-black object-cover object-center' />
                        <input required id="profilePhoto" type="file" accept='image/png, image/jpg, image/jpeg' className='file:bg-teal-500 file:text-white file:border-0 file:px-[1.5rem] file:py-[0.5rem] file:rounded-lg text-opacity-100' onChange={async (e) => {
                            const files = e.currentTarget.files;
                            if (files) {
                                if (files[0].size > 2 * 1048576) {
                                    setAlert({
                                        message: "Profile Photo size too big.",
                                        type: "warning",
                                        open: true
                                    })
                                    e.currentTarget.value = "";
                                    setImageURL(defaultUser.src);
                                } else {
                                    setImageURL(URL.createObjectURL(files[0]));
                                }
                            }
                        }} />
                    </div>
                    <div className='flex flex-col col-[1/2]'>
                        <span>First Name*</span>
                        <input id="fname" required type="text" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col col-[2/3]'>
                        <span>Last Name*</span>
                        <input id="lname" required type="text" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Date of Birth*</span>
                        <input
                            id="dob"
                            required
                            type="date"
                            className='border-[1px] border-black p-3 rounded-lg'
                            max={new Date().toISOString().split("T")[0]}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <span>Gender*</span>
                        <select id="gender" required className='p-3 border-[1px] border-black rounded-lg'>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <span>Government Issued Identity Number*</span>
                        <input id="governmentid" required type="text" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Upload Goverment ID*</span>
                        <input name="governmentId" required type="file" accept='application/pdf' className='border-[1px] border-black px-3 py-2 rounded-lg bg-white' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Phone Number*</span>
                        <input id="mobile" defaultValue={autoFill?.phoneno?.replaceAll(" ", "") ?? undefined} required type="text" pattern='^\+?[0-9]{10,15}$' className='border-[1px] border-black p-3 rounded-lg' minLength={10} maxLength={15} />
                    </div>
                    <div className='flex flex-col'>
                        <span>Email*</span>
                        <input id="email_regis" name="email" required type="email" defaultValue={autoFill?.email ?? undefined} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Social Media*</span>
                        <input id="socialmedia" required type="text" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Address*</span>
                        <input id="address" required type="text" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col relative'>
                        <span>Zip Code*</span>
                        <input
                            type="text"
                            id="zipcode_regis_caregiver"
                            className='border-[1px] border-black p-3 rounded-lg'
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Escape") {
                                    setSuggestions([]);
                                }
                            }}
                        />
                        {
                            (pincode.length < 7 && pincode.length > 0 && suggestions.length !== 0) && (
                                <ul className='absolute bg-white border top-[5rem] rounded-md px-2 py-4 w-full z-30 max-h-[300px] overflow-y-auto'>
                                    {suggestions.map((suggestion) => (
                                        <li
                                            tabIndex={0}
                                            key={suggestion.place_id}
                                            className='p-2 hover:bg-teal-200 focus:bg-teal-200 rounded-md cursor-pointer'
                                            onClick={() => fetchPlaceDetails(suggestion.place_id)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    fetchPlaceDetails(suggestion.place_id);
                                                }
                                            }}
                                        >
                                            {suggestion.description}
                                        </li>
                                    ))}
                                </ul>
                            )
                        }
                    </div> 
                    <div className='flex flex-col'>
                        <span>Province*</span>
                        {/* <select id="province" required className="border-[1px] p-3 border-black rounded-lg" >
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
                        </select> */}
                        <input id="province" required type="text" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>City*</span>
                        <input id="city" required type="text" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Price per Hour*</span>
                        <input id="rate" required type="text" className='border-[1px] border-black p-3 rounded-lg' placeholder='Example 20' />
                    </div>
                    <p className='col-[1/3] text-center self-center'>Add Video Introduction (add one of the following format mp4, avi, mov)</p>
                    <video
                        className='col-[1/3] rounded-lg h-[20rem] w-full sm:w-[30rem] justify-self-center'
                        controls
                        src={videoSrc}
                        controlsList='nodownload'
                    />
                    <div className='col-[1/3] text-white rounded-lg bg-teal-500 h-[3rem] w-full sm:w-[30rem] justify-self-center flex items-center justify-center'>
                        <label htmlFor="video" className='cursor-pointer'>Upload Intro Video</label>
                        <input ref={videoFileRef} type="file" id="video" className='w-0' accept='video/*' onChange={async (e) => {
                            if (e.currentTarget.files && e.currentTarget.files[0].size > 50 * 1048576) {
                                setAlert({
                                    message: "Video size too big.",
                                    type: "warning",
                                    open: true
                                })
                            } else {
                                setVideoSrc(URL.createObjectURL(e.currentTarget.files ? e.currentTarget.files[0] : new Blob()));
                            }
                        }} />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Introduce Yourself*</span>
                        <textarea id="bio" required className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Comfortable With Pets*</span>
                        <select id="comfortableWithPets" required className='p-3 border-[1px] border-black rounded-lg'>
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <span>Do You Smoke*</span>
                        <select required name="smoke" id="smoke" className='p-3 border-[1px] border-black rounded-lg'>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <span>Can You Work Under Video Surveillance?*</span>
                        <select required name="videoSurveillance" id="videoSurveillance" className='p-3 border-[1px] border-black rounded-lg'>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <span>Type of Care*</span>
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
                        label='Additional service you can provide*.'
                        data={[
                            { label: "Exercise and physical therapy", value: "Exercise and physical therapy" },
                            { label: "Transportation", value: 'Transportation' },
                            { label: "Meal planning and preparation", value: "Meal planning and preparation" },
                            { label: "Housekeeping", value: "Housekeeping" },
                            { label: "Medication management", value: 'Medication management' },
                            { label: "Emotional support", value: "Emotional support" },
                            { label: "Companionship", value: "Companionship" },
                            { label: "Pet Care", value: 'Pet Care' },
                        ]}
                        onChange={(value) => {
                            setAdditionalServices(value);
                        }}
                    />
                    <div className='flex flex-col'>
                        <span>How far you can travel from your locality*.</span>
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
                        <span>Experience* (in years)</span>
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
                        <span>Education Qualification*</span>
                        <select id="education" required className="border-[1px] p-3 border-black   rounded-lg" >
                            <option value="">Select</option>
                            <option value="Under Graduate">Under Graduate</option>
                            <option value="Graduate">Graduate</option>
                            <option value="Post Graduate">Post Graduate</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <span>Certifications* (Degree/Diploma)</span>
                        <select ref={certificationsRef} id="certifications" required className="border-[1px] p-3 border-black rounded-lg"
                            onChange={(e) => {
                                if (e.currentTarget.value === "other") {
                                    (document.getElementById("certifications_others") as HTMLInputElement).classList.remove("hidden");
                                } else {
                                    (document.getElementById("certifications_others") as HTMLInputElement).classList.add("hidden");
                                }
                            }}
                        >
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
                            <option value="other">Other</option>
                        </select>
                        <input id="certifications_others" name="certifications_others" required={certificationsRef.current?.value === "other"} type="text" className='border-[1px] border-black p-3 rounded-lg hidden mt-3' placeholder='Please specify.' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Upload Certificate*</span>
                        <input name="certificate" required type="file" accept='application/pdf, image/*' className='border-[1px] border-black px-3 py-2 rounded-lg bg-white' />
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
                        label='Can speak the language*'
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
                        <span>Availability* (Select Working Days)</span>
                        <Select multiple fullWidth id="daysAWeek" required
                            sx={{ height: "3rem", backgroundColor: "white" }}
                            value={daysAWeek?.split(",") ?? []}
                            onChange={(e) => {
                                const value = e.target.value.toString();
                                setDaysAWeek(value.startsWith(",") ? value.substring(1) : value);
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
                        <span>Availability* (Select Working Hours)</span>
                        <Select multiple id="workingHrs" required
                            sx={{ height: "3rem", backgroundColor: "white" }}
                            value={workingHrs?.split(",") ?? []}
                            onChange={(e) => {
                                const value = e.target.value.toString();
                                setWorkingHrs(value.startsWith(",") ? value.substring(1) : value);
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
                    <div className='flex flex-col'>
                        <span>Upload Review From Other Websites</span>
                        <input name="review" type="file" accept='image/png, image/jpg, image/jpeg' className='border-[1px] border-black px-3 py-2 rounded-lg bg-white' />
                    </div>
                    <div className=' col-[1/3] flex flex-col gap-2 items-center justify-center'>
                        <p className='font-semibold text-xl'>Add Professional References</p>
                        <p>Professional references are individuals who can vouch for your qualifications, skills, work ethic, and character in a professional setting.</p>
                    </div>
                    <p className='col-[1/3] place-self-center font-semibold'>Reference 1</p>
                    <div className='flex flex-col'>
                        <span>Name*</span>
                        <input id="ref1Name" required type="text" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Phone Number*</span>
                        <input id="ref1Phone" required pattern='^[0-9]{10}$' type="text" className='border-[1px] border-black p-3 rounded-lg' minLength={10} maxLength={10} />
                    </div>
                    <div className='flex flex-col'>
                        <span>Email*</span>
                        <input id="ref1Email" required type="email" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Relation*</span>
                        <input id="ref1Relation" required className="border-[1px] p-3 border-black   rounded-lg" />
                    </div>
                    <p className='col-[1/3] place-self-center font-semibold'>Reference 2</p>
                    <div className='flex flex-col'>
                        <span>Name*</span>
                        <input id="ref2Name" required type="text" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Phone Number*</span>
                        <input id="ref2Phone" pattern='^[0-9]{10}$' required type="text" className='border-[1px] border-black p-3 rounded-lg' minLength={10} maxLength={10} />
                    </div>
                    <div className='flex flex-col'>
                        <span>Email*</span>
                        <input id="ref2Email" required type="email" className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Relation*</span>
                        <input id="ref2Relation" required className="border-[1px] p-3 border-black   rounded-lg" />
                    </div>
                    <div className='flex flex-col gap-10 col-[1/3] justify-center items-center w-full'>
                        <div className='flex flex-row gap-3 items-center justify-center'>
                            <input type="checkbox" className='w-[1.5rem] h-[1.5rem] accent-teal-600 bg-white' onChange={(e) => {
                                setChecked(e.currentTarget.checked);
                            }} />
                            <p>I Hereby Give Full Authorisation For Release Of Information For Background Verification Puposes</p>
                        </div>
                        <button type="submit" disabled={loading || !checked} className='bg-teal-500 text-white font-semibold py-3 px-[2rem] md:px-[5rem] rounded-lg disabled:bg-teal-700 disabled:text-opacity-60'>
                            Submit
                            {
                                loading && <CircularProgress size={15} sx={{
                                    color: "white"
                                }} />
                            }
                        </button>
                    </div>
                </form>
            </section>
        </LoadScript >
    )
}
