"use client"

import Alert from '@/app/Alert';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormControlLabel, FormGroup, MenuItem, OutlinedInput, Select, Checkbox, Container } from "@mui/material";
import { teal } from "@mui/material/colors"
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StringtoObject } from '@/Hooks/StringToObject';
import { ObjectToString } from '@/Hooks/useObjectToString';
import AlertContext from '../AlertContext';
import { useCookies } from '@/Hooks/useCookies';

import { LoadScript } from '@react-google-maps/api';

const libraries: ('places')[] = ['places'];

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string;

function GoogleScriptLoader({ children, onLoad }: { children: React.ReactNode, onLoad?: () => void }) {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        if (window.google) {
            setScriptLoaded(true);
        }
    }, []);

    return (
        <>
            {
                scriptLoaded ? children : <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries} onLoad={onLoad}>{children}</LoadScript>
            }
        </>
    )
}

export default function JobDetails() {
    const searchParams = useSearchParams();
    const [job, setJob] = useState<any>();
    const router = useRouter();
    const [date, setDate] = useState<string>("");
    const [additionalService, setAdditionalService] = useState<string>("");
    const [languages, setLanguages] = useState<string>("");
    const [datetime, setDateTime] = useState<{ [key: string]: string[] }>({});
    const { setAlert } = useContext(AlertContext);
    const cookies = useCookies();

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
                    setPincode(pincode);

                } else {
                    console.error('Place details request failed with status:', status);
                }
            });
        } else {
            console.error('Google Maps JavaScript API not loaded!');
        }
    };

    const checkBoxStyle = {
        '&.Mui-checked': {
            color: teal[500],
        },
    }

    useEffect(() => {
        async function getJobById() {
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/getjob?id=${searchParams.get("id")}`, {
                headers: {
                    "Authorization": `${cookies.getCookie("token")}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setJob(data);
            setPincode(data?.location);
            setDateTime(StringtoObject(data?.date, data?.time));
        }
        getJobById();
    }, [])

    useEffect(() => {
        setAdditionalService(job?.additionalService);
        setLanguages(job?.language);
    }, [job])

    useEffect(() => {
        setJob({
            ...job,
            ...ObjectToString(datetime)
        });
    }, [datetime])


    return (
        <GoogleScriptLoader onLoad={handleLoad}>
            <Container maxWidth="lg" sx={{ marginY: 5 }}>
                <form
                    onChange={(e) => {
                        setJob({
                            ...job,
                            [(e.target as any).name]: (e.target as any).value
                        })
                    }}
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setAlert({
                            type: "info",
                            message: "Updating your job. Please Wait.",
                            open: true
                        });

                        const bodyContent = JSON.stringify({
                            email: sessionStorage.getItem("email"),
                            ...job,
                            additionalService,
                            languages,
                            jid: searchParams.get("id"),
                        });
                        const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/updatejob`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `${cookies.getCookie("token")}`
                            },
                            body: bodyContent
                        });
                        const data = await response.json();
                        if (data?.success) {
                            setAlert({
                                type: "success",
                                message: "Job Updated. Redirecting to my posts",
                                open: true
                            });
                            setTimeout(() => router.push("/mypostings"), 1000);
                        } else {
                            setAlert({
                                type: "error",
                                message: "Couldn't post this job. Please try again.",
                                open: true
                            });
                        }
                    }}>
                    <h1 className='text-3xl font-semibold text-teal-500 leading-[4rem]'>Update Job</h1>
                    <p className='font-bold'>Provide some information about services you need</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-rows-[auto] gap-5 mt-[1.5rem]'>
                        <div className='w-full'>
                            <p>Type of Care you need.</p>
                            <select id="speciality" name="speciality" value={job?.speciality} className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit invalid:focus:outline-red-500' required>
                                <option value="">Select</option>
                                <option value="child_care">Child Care</option>
                                <option value="senior_care">Senior Care</option>
                            </select>
                        </div>
                        <div className='w-full'>
                            <p>Additional Services</p>
                            <Select multiple fullWidth required
                                sx={{
                                    height: "3rem",
                                    borderRadius: "0.5rem",
                                }}
                                value={additionalService ? additionalService.split(",") : []}
                                onChange={(e) => setAdditionalService(e.target.value.toString())}
                                input={<OutlinedInput color='success' />}
                            >
                                <MenuItem value="Exercise and physical therapy">Exercise and physical therapy</MenuItem>
                                <MenuItem value="Transportation">Transportation</MenuItem>
                                <MenuItem value="Meal planning and preparation">Meal planning </MenuItem>and preparation
                                <MenuItem value="Housekeeping">Housekeeping</MenuItem>
                                <MenuItem value="Medication management">Medication management</MenuItem>
                                <MenuItem value="Emotional support">Emotional support</MenuItem>
                                <MenuItem value="Companionship">Companionship</MenuItem>
                                <MenuItem value="Pet Care">Pet Care</MenuItem>
                            </Select>
                        </div>
                        <div className='w-full'>
                            <p>Hourly Rate (per hour).</p>
                            <input name="hourlyRate" id="hourlyRate" value={job?.hourlyRate} required className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit px-3 invalid:focus:outline-red-500' />
                        </div>
                        <div className='w-full'>
                            <p>Experience.</p>
                            <select name="experience" id="experience" value={job?.experience} className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit invalid:focus:outline-red-500' required>
                                <option value="">Select</option>
                                <option value="2">2+</option>
                                <option value="3">3+</option>
                                <option value="4">4+</option>
                                <option value="5">5+</option>
                                <option value="6">6+</option>
                                <option value="7">7+</option>
                                <option value="8">8+</option>
                                <option value="9">9+</option>
                                <option value="10">10+</option>
                            </select>
                        </div>
                        <div className='w-full'>
                            <p>Age.</p>
                            <select name="age" id="age" value={job?.age} className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit invalid:focus:outline-red-500' required>
                                <option value="">Select</option>
                                <option value="21-30">21 yrs to 30 yrs</option>
                                <option value="31-40">31 yrs to 40 yrs</option>
                                <option value="41-50">41 yrs to 50 yrs</option>
                            </select>
                        </div>
                        {/* <div className='w-full'>
                            <p>Location.</p>
                            <input name="location" id="location" value={job?.location} className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit px-3 invalid:focus:outline-red-500' required placeholder='Enter Zip Code' />
                        </div> */}
                        <div className='flex flex-col relative w-full'>
                            <span>Location</span>
                            <input
                                type="text"
                                name="location" id="location"
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
                        <div className='w-full sm:row-[3/4]'>
                            <p>Rating.</p>
                            <select name="rating" id="rating" value={job?.rating} className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit invalid:focus:outline-red-500' required>
                                <option value="">Select</option>
                                <option value="1">1+</option>
                                <option value="1.5">1.5+</option>
                                <option value="2">2+</option>
                                <option value="2.5">2.5+</option>
                                <option value="3">3+</option>
                                <option value="3.5">3.5+</option>
                                <option value="4">4+</option>
                                <option value="4.5">4.5+</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className='w-full sm:row-[3/4] sm:col-[2/3]'>
                            <p>Availability.</p>
                            <select name="availability" id="availability" value={job?.availability} className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit invalid:focus:outline-red-500' required>
                                <option value="">Select</option>
                                <option value="1">Within 1 km</option>
                                <option value="2">Within 2 kms</option>
                                <option value="3">Within 3 kms</option>
                                <option value="4">Within 4 kms</option>
                                <option value="5">Within 5 kms</option>
                                <option value="6">Within 6 kms</option>
                                <option value="7">Within 7 kms</option>
                                <option value="8">Within 8 kms</option>
                                <option value="9">Within 9 kms</option>
                                <option value="10">Within 10 kms</option>
                            </select>
                        </div>
                        <div className='w-full'>
                            <p>Can speak the language</p>
                            <Select multiple fullWidth required
                                sx={{
                                    height: "3rem",
                                    borderRadius: "0.5rem",
                                }}
                                value={languages ? languages.split(",") : []}
                                onChange={(e) => setLanguages(e.target.value.toString())}
                                input={<OutlinedInput color='success' />}
                            >
                                <MenuItem value={"English"}>English</MenuItem>
                                <MenuItem value={"French"}>French</MenuItem>
                                <MenuItem value={"German"}>German</MenuItem>
                                <MenuItem value={"Spanish"}>Spanish</MenuItem>
                                <MenuItem value={"Hindi"}>Hindi</MenuItem>
                                <MenuItem value={"Vietnamese"}>Vietnamese</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <p>Address</p>
                            <input name="address" id="address" value={job?.address} className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit px-3 invalid:focus:outline-red-500' required />
                        </div>
                        <div>
                            <p>Comfortable with Pets.</p>
                            <select name="comfortableWithPets" id="comfortableWithPets" value={job?.comfortableWithPets ? "yes" : "no"} className='w-full py-[0.75rem] border-[1px] border-black rounded-lg bg-inherit invalid:focus:outline-red-500' required>
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>
                    <div className='mt-[1.5rem]'>
                        <p>Job Description</p>
                        <textarea name="jobDescription" id="jobDescription" value={job?.jobDescription} className='w-full min-h-[15rem] bg-inherit border-[1px] p-3 border-black rounded-lg invalid:focus:outline-red-500' required></textarea>
                    </div>
                    <hr className='h-[2.5px] bg-gray-300 my-[1.5rem]' />
                    <section className='space-y-[1rem]'>
                        <p className=''>When would you like to get these services</p>
                        <div className='grid grid-cols-1 lg:grid-cols-[min-content_auto_auto] grid-rows-[auto] gap-[4rem]'>
                            <div className='flex flex-col gap-5'>
                                <div>
                                    <p className='font-semibold'>Select Date</p>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateCalendar disablePast className='bg-teal-500 bg-opacity-50 rounded-lg mt-[1rem]'
                                            onChange={(newValue: any) => {
                                                if (Object.keys(datetime).includes(dayjs(newValue).format("DD/MM/YYYY"))) {
                                                    let obj = {};
                                                    for (const key in datetime) {
                                                        if (key !== dayjs(newValue).format("DD/MM/YYYY")) {
                                                            obj = {
                                                                [key]: datetime[key]
                                                            }
                                                        }
                                                    }
                                                    setDateTime({ ...obj });
                                                } else {
                                                    setDateTime({
                                                        ...datetime,
                                                        [dayjs(newValue).format("DD/MM/YYYY")]: []
                                                    })
                                                    setDate(dayjs(newValue).format("DD/MM/YYYY"))
                                                }
                                            }} />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div className='flex flex-col gap-5'>
                                <div>
                                    <p className='font-semibold'>Select Time</p>
                                    <FormGroup key={date}
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gridTemplateRows: "auto"
                                        }}
                                        onChange={(e) => {
                                            if (date) {
                                                if ((e.target as any).checked) {
                                                    setDateTime({
                                                        ...datetime,
                                                        [date]: [...datetime[date], (e.target as any).value]
                                                    })
                                                } else {
                                                    setDateTime({
                                                        ...datetime,
                                                        [date]: [...datetime[date].filter(t => t !== (e.target as any).value)]
                                                    })
                                                }
                                            }
                                        }}
                                    >
                                        <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"9 AM to 10 AM"} />} label="9 AM to 10 AM" />
                                        <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"10 AM to 11 AM"} />} label="10 AM to 11 AM" />
                                        <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"11 AM to 12 Noon"} />} label="11 AM to 12 Noon" />
                                        <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"12 Noon to 1 PM"} />} label="12 Noon to 1 PM" />
                                        <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"1 PM to 2 PM"} />} label="1 PM to 2 PM" />
                                        <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"2 PM to 3 PM"} />} label="2 PM to 3 PM" />
                                        <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"3 PM to 4 PM"} />} label="3 PM to 4 PM" />
                                        <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"4 PM to 5 PM"} />} label="4 PM to 5 PM" />
                                        <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"5 PM to 6 PM"} />} label="5 PM to 6 PM" />
                                        <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"6 PM to 7 PM"} />} label="6 PM to 7 PM" />
                                        <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"7 PM to 8 PM"} />} label="7 PM to 8 PM" />
                                        <FormControlLabel control={<Checkbox sx={checkBoxStyle} name="time" value={"8 PM to 9 PM"} />} label="8 PM to 9 PM" />
                                    </FormGroup>
                                </div>
                            </div>
                            <div className='min-h-[10rem] flex flex-col gap-[1rem]'>
                                <div className='flex justify-between w-full font-semibold'>
                                    <p>Schedule Information</p>
                                    <p>Hours</p>
                                </div>
                                <div className='flex-grow flex flex-col gap-4 mt-[1rem] h-[20rem] overflow-auto'>
                                    {
                                        Object.keys(datetime).map(key => {
                                            return (
                                                <div key={key} className='flex justify-between'>
                                                    <p>{key}</p>
                                                    <div className='flex justify-end flex-wrap gap-1 max-w-[16rem]'>
                                                        {
                                                            datetime[key].map(e => <span className='bg-teal-300 p-2 rounded-md' key={e}>{e} </span>)
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <hr className='h-[2.5px] bg-gray-300' />
                                <div className='flex justify-between text-sm'>
                                    <p>Total Days: {Object.keys(datetime).length}</p>
                                    <p>Total Hours: {job?.time.replaceAll(";", ",").split(",").length}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='mt-[4rem] flex flex-col gap-[1rem] items-start'>
                        <p className='font-semibold text-sm'>
                            Just to let you know that you will not be charged anything to post this job. However, based on your requirements your total cost for this job after finalizing the appropriate caregiver will be approximately <span className='text-red-500 font-normal text-lg'>${Number(job?.hourlyRate) * job?.time.replaceAll(";", ",").split(",").length}</span>
                        </p>
                        <p className='text-xs italic leading-[2rem]'>*Costs are calculated based on the values that you provide on hourly basis.</p>
                        <button className='bg-teal-500 disabled:bg-opacity-25 text-white px-5 py-3 rounded-lg'>Update this Job</button>
                    </section>
                </form>
            </Container>
        </GoogleScriptLoader>
    )
}
