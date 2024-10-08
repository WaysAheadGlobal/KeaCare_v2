"use client"

import React, { useState, useEffect, useContext, useRef } from 'react';
import dynamic from 'next/dynamic';
import { MultiSelect } from '@mantine/core';
import { MenuItem, OutlinedInput, Select } from '@mui/material';
import AlertContext from '@/app/AlertContext';
import { useRouter } from 'next/navigation';
import { useCookies } from '@/Hooks/useCookies';
import { LoadScript } from '@react-google-maps/api';
const Wallet = dynamic(() => import("./Wallet"));

const libraries: ('places')[] = ['places'];

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string;

export default function Account() {
    const [userInfo, setUserInfo] = useState<any>();
    const [task, setTask] = useState<string[]>([]);
    const [languages, setLanguages] = useState<string[]>([]);
    const [refreshData, setRefreshData] = useState<number>(0);
    const { setAlert } = useContext(AlertContext);
    const router = useRouter();
    const cookies = useCookies();
    const certificationsRef = useRef<HTMLSelectElement>(null);

    const [pincode, setPincode] = useState("");
    const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
    const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);

    useEffect(() => {
        if (pincode.length > 1) { // Adjust length based on your pincode format
            getSuggestions(pincode);
        }
    }, [pincode]);

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

                    setUserInfo({
                        ...userInfo,
                        city,
                        province,
                        address
                    })
                    setPincode(pincode);

                } else {
                    console.error('Place details request failed with status:', status);
                }
            });
        } else {
            console.error('Google Maps JavaScript API not loaded!');
        }
    };

    useEffect(() => {
        async function getUserInfo(email: string) {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/caregiver/getCaregiverInfo?email=${email}`, {
                headers: {
                    "Authorization": `${cookies.getCookie("token")}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (data.status === "incomplete") {
                router.push("/caregiver/registration");
            } else {
                setUserInfo(data);
                setPincode(data?.zipcode);
            }
        }
        const email = sessionStorage.getItem("email");
        getUserInfo(email ?? "");
        (document.getElementById("caregiver_form_update") as HTMLFormElement)?.reset();
    }, [refreshData])

    useEffect(() => {
        setTask(userInfo?.task.split(","));
        setLanguages(userInfo?.languages.split(","));
    }, [userInfo]);

    return (
        <LoadScript onLoad={handleLoad} googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
            <div className='p-20 text-3xl font-semibold text-white bg-teal-500 text-center'>Your Account</div>
            <form id="caregiver_form_update" className='px-[2rem] md:px-[8rem] py-[2rem] flex flex-col lg:grid lg:grid-cols-[18rem_1fr] grid-rows-1 gap-10'
                onChange={(e) => {
                    setUserInfo({
                        ...userInfo,
                        [(e.target as any).name]: (e.target as any).value,
                    });
                }}
                onSubmit={async (e) => {
                    e.preventDefault();
                    const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/caregiver/updateAccount`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `${cookies.getCookie("token")}`
                        },
                        body: JSON.stringify({
                            ...userInfo,
                            certifications: (document.getElementById("certifications_others") as HTMLInputElement).value ? "other_" + (document.getElementById("certifications_others") as HTMLInputElement).value : userInfo.certifications,
                            zipcode: pincode
                        })
                    })

                    const data = await response.json();
                    if (data?.success) {
                        setUserInfo(data);
                        setAlert({
                            message: "Profile Updated.",
                            type: "success",
                            open: true
                        })
                    } else {
                        setUserInfo({
                            ...userInfo
                        });
                        setAlert({
                            message: "Couldn't update your profile.",
                            open: true,
                            type: "error"
                        })
                    }
                }}
            >
                <div className='flex flex-col gap-[3rem]'>
                    <div className='bg-teal-500 rounded-lg flex flex-col items-center justify-start gap-5 h-[17rem]'>
                        <div className='rounded-full aspect-square w-[7rem] bg-cover bg-no-repeat bg-center relative top-[1rem]' style={{
                            backgroundImage: `url(${userInfo?.imageUrl})`
                        }}></div>
                        <div className='flex flex-col items-center justify-center'>
                            <p className='text-white font-semibold'>{(userInfo?.fname ?? "Loading...") + " " + (userInfo?.lname ?? "")}</p>
                            <p className='text-white font-semibold'>Caregiver</p>
                        </div>
                        <div className='bg-white border-[1px] rounded-lg border-black p-3 font-semibold cursor-pointer'>
                            <label htmlFor="image" className='cursor-pointer'>Update Profile Photo</label>
                            <input type="file" id="image" className='w-0' accept='image/*' onChange={async (e) => {
                                if (e.currentTarget.files && e.currentTarget.files[0].size > 2 * 1048576) {
                                    setAlert({
                                        message: "Profile Photo size too big.",
                                        type: "warning",
                                        open: true
                                    })
                                } else {
                                    setUserInfo({
                                        ...userInfo,
                                        imageUrl: e.currentTarget.files ? URL.createObjectURL(e.currentTarget.files[0]) : userInfo?.imageURL,
                                    });

                                    let formData = new FormData();
                                    formData.append("image", e.currentTarget.files ? e.currentTarget.files[0] : "");
                                    formData.append("fileType", e.currentTarget.files ? e.currentTarget.files[0].type.split("/")[1] : "");
                                    formData.append("id", userInfo?.id)

                                    const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/caregiver/uploadImage`, {
                                        method: "POST",
                                        headers: {
                                            "Authorization": `${cookies.getCookie("token")}`
                                        },
                                        body: formData
                                    });

                                    const data = await response.json();
                                    if (data?.success) {
                                        setAlert({
                                            message: "Profile Photo Updated.",
                                            type: "success",
                                            open: true
                                        })
                                        setRefreshData(refreshData => refreshData++);
                                    } else {
                                        setAlert({
                                            message: "Couldn't update your profile photo.",
                                            open: true,
                                            type: "error"
                                        })
                                    }
                                }
                            }} />
                        </div>
                    </div>
                    <button type='button' className='bg-teal-500 p-3 text-white font-semibold rounded-lg'
                        onClick={(e) => {
                            e.preventDefault();
                            const wallet = document.getElementById("wallet") as HTMLSelectElement;
                            const form = document.getElementById("form") as HTMLDivElement;
                            wallet.classList.add("hidden");
                            wallet.classList.remove("flex");
                            form.classList.add("flex");
                            form.classList.add("md:grid");
                            form.classList.remove("hidden");
                        }}
                    >My Account</button>
                    <button type='button' className='bg-teal-500 p-3 text-white font-semibold rounded-lg'
                        onClick={(e) => {
                            e.preventDefault();
                            const wallet = document.getElementById("wallet") as HTMLSelectElement;
                            const form = document.getElementById("form") as HTMLDivElement;
                            wallet.classList.remove("hidden");
                            wallet.classList.add("flex");
                            form.classList.remove("flex");
                            form.classList.remove("md:grid");
                            form.classList.add("hidden");
                        }}
                    >Wallet</button>
                    <button disabled className='p-3 font-semibold rounded-lg border-2 transition-all duration-200 border-red-500 text-red-500 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white'>Delete My Account</button>
                </div>

                <Wallet
                    id={"wallet"}
                    className="p-2 text-sm md:text-base md:px-[3rem] md:py-[3rem] hidden flex-col border-2 border-black rounded-lg w-full lg:min-w-[700px]"
                    stripe_account_id={userInfo?.stripe_account_id}
                />

                <div id="form" className='md:px-[5rem] md:py-[5rem] flex flex-col md:grid md:grid-cols-2 md:grid-rows-[auto] gap-[2rem] md:border-[1px] md:border-black rounded-lg h-fit w-full md:w-fit' >
                    <h1 className='col-[1/3] font-semibold text-2xl self-start sm:self-end'>Your Personal Information</h1>
                    <div className='flex flex-col col-[1/2]'>
                        <span>First Name*</span>
                        <input required type="text" name='fname' defaultValue={userInfo?.fname} className='border-[1px] border-black   p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col col-[2/3]'>
                        <span>Last Name*</span>
                        <input required type="text" name='lname' defaultValue={userInfo?.lname} className='border-[1px] border-black  p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Date of Birth*</span>
                        <input required type="date" name="dob" defaultValue={userInfo?.dob} className='border-[1px] border-black   p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Gender*</span>
                        <select required value={userInfo?.gender} name="gender" className='p-3 border-[1px] border-black rounded-lg'>
                            <option value={""} disabled>Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Government ID*</span>
                        <input readOnly type="text" name='mobile' defaultValue={userInfo?.government_id} className='border-[1px] border-black p-3 rounded-lg' minLength={10} maxLength={10} />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Phone Number*</span>
                        <input required type="text" pattern='^\+?[0-9]{10,15}$' name='mobile' defaultValue={userInfo?.mobile} className='border-[1px] border-black p-3 rounded-lg' minLength={10} maxLength={10} />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Email*</span>
                        <input required type="email" name="email" defaultValue={userInfo?.email} className='border-[1px] border-black   p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Address*</span>
                        <input required type="text" id="address" name="address" defaultValue={userInfo?.address} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Social Media</span>
                        <input type="text" name="socialmedia" defaultValue={userInfo?.socialmedia} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Do You Smoke*</span>
                        <select required value={userInfo?.smoke} name="smoke" id="smoke" className='p-3 border-[1px] border-black rounded-lg'>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <span>Can You Work Under Video Surveillance?*</span>
                        <select required value={userInfo?.videoSurveillance} name="videoSurveillance" id="videoSurveillance" className='p-3 border-[1px] border-black rounded-lg'>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className='flex flex-col relative'>
                        <span>Zip Code*</span>
                        <input
                            type="text"
                            name="zipcode"
                            value={pincode}
                            id="zipcode_regis_caregiver"
                            className='border-[1px] border-black p-3 rounded-lg'
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
                        <span>City*</span>
                        <input required type="text" id="city" name="city" defaultValue={userInfo?.city} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Province*</span>
                        {/* <select required value={userInfo?.province} id="province" name="province" className="border-[1px] p-3 border-black rounded-lg"
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
                        </select> */}

                        <input required type="text" id="province" name="province" value={userInfo?.province} className='border-[1px] border-black p-3 rounded-lg' onChange={(e) => {
                            setUserInfo({
                                ...userInfo,
                                province: e.target.value
                            })
                        }} />
                    </div>
                    <div className='flex flex-col'>
                        <span>Price per Hour*</span>
                        <input required type="text" name="rate" defaultValue={userInfo?.rate} className='border-[1px] border-black p-3 rounded-lg' placeholder='Example 20' />
                    </div>
                    <p className='col-[1/3] text-center self-center'>Add Video Introduction (add one of the following format mp4, avi, mov)</p>
                    <video
                        className='col-[1/3] rounded-lg h-[20rem] w-full sm:w-[30rem] justify-self-center'
                        controls
                        src={userInfo?.videoUrl}
                        controlsList='nodownload'
                    ></video>
                    <div className='col-[1/3] text-white rounded-lg bg-teal-500 h-[3rem] w-full sm:w-[30rem] justify-self-center flex items-center justify-center'>
                        <label htmlFor="video" className='cursor-pointer'>Update Intro Video</label>
                        <input type="file" id="video" className='w-0' accept='video/*' onChange={async (e) => {
                            if (e.currentTarget.files && e.currentTarget.files[0].size > 50 * 1048576) {
                                setAlert({
                                    message: "Video size too big.",
                                    type: "warning",
                                    open: true
                                })
                            } else {
                                setAlert({
                                    message: "Uploading Video. Please wait.",
                                    type: "info",
                                    open: true
                                });

                                setUserInfo({
                                    ...userInfo,
                                    imageUrl: e.currentTarget.files ? URL.createObjectURL(e.currentTarget.files[0]) : userInfo?.imageURL,
                                });

                                let formData = new FormData();
                                formData.append("video", e.currentTarget.files ? e.currentTarget.files[0] : "");
                                formData.append("fileType", e.currentTarget.files ? e.currentTarget.files[0].type.split("/")[1] : "");
                                formData.append("id", userInfo?.id)

                                const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/caregiver/uploadVideo`, {
                                    method: "POST",
                                    headers: {
                                        "Authorization": `${cookies.getCookie("token")}`
                                    },
                                    body: formData
                                });

                                const data = await response.json();
                                if (data?.success) {
                                    setAlert({
                                        message: "Intro Video Updated.",
                                        type: "success",
                                        open: true
                                    })
                                    setRefreshData(refreshData => refreshData++);
                                } else {
                                    setAlert({
                                        message: "Couldn't update your intro video.",
                                        open: true,
                                        type: "error"
                                    })
                                }
                            }
                        }} />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Introduce Yourself*</span>
                        <textarea defaultValue={userInfo?.bio} name="bio" required className='border-[1px] border-black   p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Type of Care*</span>
                        <select required value={userInfo?.speciality} name="speciality" id="careType" className='p-3 border-[1px] border-black rounded-lg'>
                            <option value="">Select</option>
                            <option value="child_care">Child Care</option>
                            <option value="senior_care">Senior Care</option>
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
                        onChange={(e) => {
                            setTask(e);
                            setUserInfo({
                                ...userInfo,
                                task: e.toString()
                            })
                        }}
                    />
                    <div className='flex flex-col'>
                        <span>How far you can travel from your locality*.</span>
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
                        <span>Experience* (in years)</span>
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
                        <span>Education Qualification*</span>
                        <select required value={userInfo?.education} name="education" className="border-[1px] p-3 border-black rounded-lg">
                            <option value="" disabled>Select</option>
                            <option value="Under Graduate">Under Graduate</option>
                            <option value="Graduate">Graduate</option>
                            <option value="Post Graduate">Post Graduate</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <span>Certifications* (Degree/Diploma)</span>
                        <select ref={certificationsRef} required value={userInfo?.certifications.split("_")[0]} name="certifications" className="border-[1px] p-3 border-black rounded-lg">
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
                            <option value="other">Other</option>
                        </select>
                        <input id="certifications_others" required={certificationsRef.current?.value === "other"} type="text" value={userInfo?.certifications.split("_")[1]} className={`border-[1px] border-black p-3 rounded-lg mt-3 ${userInfo?.certifications.split("_")[0] !== "other" && "hidden"}`} placeholder='Please specify.' />
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
                        label='Can speak the language*'
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
                                languages: e.toString()
                            })
                        }}
                    />
                    <div className='flex flex-col'>
                        <span>Availability* (Select Working Days)</span>
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
                        <span>Availability* (Select Working Hours)</span>
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
                        }}>Disgard Changes</button>
                    </div>
                </div>
            </form>
        </LoadScript>
    )
}
