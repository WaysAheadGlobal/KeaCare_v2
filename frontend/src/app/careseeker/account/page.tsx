"use client"

import { useCookies } from '@/Hooks/useCookies';
import Alert from '@/app/Alert';
import AlertContext from '@/app/AlertContext';
import { useContext, useEffect, useRef, useState } from 'react';
import profilePic from '../../../../public/profilePic.png';
import PaymentHistory from './PaymentHistory';
import Subscription from './Subscription';
import { LoadScript } from '@react-google-maps/api';

const libraries: ('places')[] = ['places'];

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string;

export default function Account() {
    const [userInfo, setUserInfo] = useState<any>();
    const [refreshData, setRefreshData] = useState<number>(0);
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
            const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/account?email=${email}`, {
                headers: {
                    "Authorization": `${cookies.getCookie("token")}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setUserInfo(data);
            setPincode(data?.zipcode);
        }
        const email = sessionStorage.getItem("email");
        getUserInfo(email ?? "");
    }, [refreshData]);

    const { setAlert } = useContext(AlertContext);

    return (
        <LoadScript onLoad={handleLoad} googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
            <div className='p-20 text-3xl font-semibold text-white bg-teal-500 text-center'>Your Account</div>
            <div className='sticky top-0 bg-transparent h-[1rem]'>
                <Alert />
            </div>
            <form id="careseeker_update_form" className='px-[2rem] md:px-[8rem] py-[2rem] flex flex-col lg:grid lg:grid-cols-[18rem_auto] grid-rows-1 gap-10 justify-center'
                onChange={(e) => {
                    setUserInfo({
                        ...userInfo,
                        [(e.target as any).name]: (e.target as any).value
                    });
                }}
                onSubmit={async (e) => {
                    e.preventDefault();
                    const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/updateAccount`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `${cookies.getCookie("token")}`
                        },
                        body: JSON.stringify({
                            ...userInfo,
                            zipcode: pincode
                        })
                    })

                    const data = await response.json();
                    if (data?.success) {
                        setUserInfo(data);
                        setAlert({
                            message: "Profile Updated.",
                            open: true,
                            type: "success"
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
                }}>
                <div className='flex flex-col gap-[2rem]'>
                    <div className='bg-teal-500 rounded-lg flex flex-col gap-5 items-center justify-start h-[17rem]'>
                        <div className='rounded-full bg-white'>
                            <div key={refreshData} className='rounded-full aspect-square w-[7rem] bg-cover bg-no-repeat bg-center' style={{
                                backgroundImage: `url(${userInfo?.imageUrl ? userInfo?.imageUrl : profilePic.src})`
                            }}></div>
                        </div>
                        <div className='flex flex-col w-full items-center justify-center'>
                            <p className='text-white font-semibold'>{(userInfo?.fname ?? "Loading...") + " " + (userInfo?.lname ?? "")}</p>
                            <p className='text-white font-medium text-sm'>Careseeker</p>
                        </div>
                        <div className='relative bg-white border-[1px] rounded-lg border-black p-3 font-semibold cursor-pointer'>
                            <label htmlFor='updatePhoto' className='cursor-pointer'>Update Profile Photo</label>
                            <input type="file" name="updatePhoto" id="updatePhoto" className='invisible w-0'
                                onChange={async (e) => {
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

                                        const response = await fetch(`https://webapi.waysdatalabs.com/keacare/api/careseeker/uploadImage`, {
                                            method: "POST",
                                            cache: "no-store",
                                            headers: {
                                                "Authorization": `${cookies.getCookie("token")}`
                                            },
                                            body: formData
                                        });

                                        const data = await response.json();
                                        setRefreshData(refreshData => refreshData + 1);
                                        if (data?.success) {
                                            setAlert({
                                                message: "Profile Photo Updated.",
                                                type: "success",
                                                open: true
                                            })
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
                    <button type='button' className='bg-teal-500 p-3 text-white font-semibold rounded-lg hover:bg-teal-600 transition-all duration-200'
                        onClick={(e) => {
                            e.preventDefault();
                            const subscription = document.getElementById("subscription") as HTMLDivElement;
                            const form = document.getElementById("form") as HTMLDivElement;
                            const paymentHistory = document.getElementById("paymentHistory") as HTMLDivElement;
                            subscription.classList.remove("flex");
                            subscription.classList.add("hidden");
                            paymentHistory.classList.remove("flex");
                            paymentHistory.classList.add("hidden");
                            form.classList.add("flex");
                            form.classList.add("md:grid");
                            form.classList.remove("hidden");
                        }}
                    >My Account</button>
                    <button type='button' className='bg-teal-500 p-3 text-white font-semibold rounded-lg hover:bg-teal-600 transition-all duration-200'
                        onClick={(e) => {
                            e.preventDefault();
                            const subscription = document.getElementById("subscription") as HTMLDivElement;
                            const form = document.getElementById("form") as HTMLDivElement;
                            const paymentHistory = document.getElementById("paymentHistory") as HTMLDivElement;
                            subscription.classList.add("flex");
                            subscription.classList.remove("hidden");
                            paymentHistory.classList.remove("flex");
                            paymentHistory.classList.add("hidden");
                            form.classList.remove("flex");
                            form.classList.remove("md:grid");
                            form.classList.add("hidden");
                        }}
                    >Subscriptions</button>
                    <button className='bg-teal-500 p-3 text-white font-semibold rounded-lg hover:bg-teal-600 transition-all duration-200'
                        onClick={(e) => {
                            e.preventDefault();
                            const subscription = document.getElementById("subscription") as HTMLDivElement;
                            const form = document.getElementById("form") as HTMLDivElement;
                            const paymentHistory = document.getElementById("paymentHistory") as HTMLDivElement;
                            subscription.classList.remove("flex");
                            subscription.classList.add("hidden");
                            paymentHistory.classList.add("flex");
                            paymentHistory.classList.remove("hidden");
                            form.classList.remove("flex");
                            form.classList.remove("md:grid");
                            form.classList.add("hidden");
                        }}
                    >Payment History</button>
                    <button disabled className='p-3 font-semibold rounded-lg border-2 transition-all duration-200 border-red-500 text-red-500 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white'>Delete My Account</button>
                </div>
                <Subscription id="subscription" className="p-2 text-sm md:text-base md:px-[3rem] md:py-[3rem] hidden flex-col border-2 border-black rounded-lg w-full lg:min-w-[700px]" />
                <PaymentHistory id="paymentHistory" className="p-2 text-sm md:text-base md:px-[3rem] md:py-[3rem] hidden flex-col border-2 border-black rounded-lg w-full lg:min-w-[700px]" />
                <div id="form" className='md:px-[5rem] md:py-[5rem] flex flex-col md:grid md:grid-cols-2 md:grid-rows-[auto] gap-[2rem] md:border-[1px] md:border-black rounded-lg h-fit w-full md:w-fit' >
                    <h1 className='col-[1/3] font-semibold text-2xl self-start sm:self-end'>Your Personal Information</h1>
                    <div className='flex flex-col col-[1/2]'>
                        <span>First Name*</span>
                        <input required type="text" name="fname" defaultValue={userInfo?.fname} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col col-[2/3]'>
                        <span>Last Name*</span>
                        <input required type="text" name='lname' defaultValue={userInfo?.lname} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Date of Birth*</span>
                        <input required type="date" name='dob' defaultValue={userInfo?.dob} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col'>
                        <span>Gender*</span>
                        <select required name="gender" value={userInfo?.gender} className='p-3 border-[1px] border-black rounded-lg'>
                            <option value="" disabled>Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Phone Number*</span>
                        <input required type="text" pattern='^\+?[0-9]{10,15}$' name='mobile' defaultValue={userInfo?.mobile} className='border-[1px] border-black p-3 rounded-lg' minLength={10} maxLength={10} />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Email*</span>
                        <input required type="email" name='email' defaultValue={userInfo?.email} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    <div className='flex flex-col col-[1/3]'>
                        <span>Address*</span>
                        <input required type="text" name='address' defaultValue={userInfo?.address} className='border-[1px] border-black p-3 rounded-lg' />
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
                        <span>Province*</span>
                        {/* <select required value={userInfo?.province} name='province' className="border-[1px] p-3 border-black rounded-lg"
                            onChange={(e) => setUserInfo({
                                ...userInfo,
                                province: e.currentTarget.value
                            })}
                        >
                            <option value="" disabled>Select</option>
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
                        <span>City*</span>
                        <input required type="text" name='city' defaultValue={userInfo?.city} className='border-[1px] border-black p-3 rounded-lg' />
                    </div>
                    {/* <div className='flex flex-col'>
                        <span>Zip Code*</span>
                        <input required type="text"
                            pattern='^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z][ ]?[0-9][ABCEGHJ-NPRSTV-Z][0-9]$'
                            name='zipcode' defaultValue={userInfo?.zipcode} className='border-[1px] border-black p-3 rounded-lg' />
                    </div> */}
                    <div className='col-[1/3] flex flex-row justify-between'>
                        <button type='submit' className='bg-teal-500 text-white font-semibold px-[3rem] py-[1rem] rounded-xl'>Update</button>
                        <button className='text-teal-500 font-semibold hover:bg-gray-200 focus:bg-gray-200  px-[3rem] py-[1rem] rounded-xl' onClick={(e) => {
                            e.preventDefault();
                            (document.getElementById("careseeker_update_form") as HTMLFormElement).reset();
                            setRefreshData(prev => prev + 1);
                        }}>Disgard Changes</button>
                    </div>
                </div>
            </form>
        </LoadScript>
    )
}
