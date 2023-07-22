"use client"
import UserTypeContext from '@/context/UserType'
import React, { useEffect, useState, useContext } from 'react'
import { CgClose } from 'react-icons/cg'
import { FaPaperPlane } from 'react-icons/fa'

const faqs: {
    [key: string]: {
        [key: string]: string[]
    }
} = {
    careseeker: {
        membership: ["During the registration process on Kea.care you will have the opportunity to select either monthly child care / senior care subscription plan or yearly plan."],
        editPersonalInfo: ["It is important to keep your personal information up to date. In your Account you’ll find my profile.", "By clicking the Edit link you can update your name, DOB, Gender, address, postal code, email or phone number (either of the information - from which source you have registered you can not update/change that), etc."],
        personalInfo: ["Your contact information is kept private until you book a caregiver by paying the charges."],
        postajob: ["Posting a job is one of the most effective ways of accumulating quality, targeted applicants for your specific needs.", "Click on post a job on your dashboard page and fill in the details like -type of care ,hourly rate,experience,additional services age,location,laungauge,date time, job discription etc... and post the job on clicking the submit button."],
        searchcaregivers: ["You can use search filters based on your requirement a type of care, age, language, distance, availability, gender, rating, etc..and can find a matching profile."],
        caregiverdocuments: ["All documents provided by caregivers are approved by our background verification Team before appearing on a profile. We do not, however, have the authority to share these documents publicly.", "We strongly recommend that when you meet candidates for the first time or before, you ask them to bring or share for review."],
        writereview: ["Reviews are a helpful and public way of letting people know about your experience with caregivers with whom you have met or worked in the past. You will have the ability to write a review through your account at any time.", "Just locate the caregiver’s profile, scroll to the ‘Reviews’ section, and click the ‘Write a Review’ button. Please note that all submitted reviews will undergo an approval process by Kea.care admin and may take up to 24 hours to be processed."],
        payments: ["The most common errors can be fixed by double-checking all of your input information: Your card must be a Credit or Debit card – no pre-paid cards, no gift cards, and no cards based outside of Canada."],
        viewpayments: ["You can view the payment history on your account by visiting account homepage."],
        error: ["Sorry I cannot answer this question."]
    },
    caregiver: {
        editPersonalInfo: ["Your account information is your personal information: your legal name, service offered, experience, education, postal code, email, phone number, etc. You are required to keep this information up-to-date.", "If you need to edit or update this information for any reason, you can visit your Account Info & go to my profile tab. By clicking ‘Edit’ you can update the available information and submit your changes. Please note that changes to your personal information may take up to 24 hours to be approved."],
        seePersonalInfo: ["Generally, the only private information we make publicly visible on Kea.care is your name, Speciality, distance, language, availability, working hours, and your contact details will be shared with careseeker once they will book your services after paying the charges via kea.care web application."],
        closeAccount: ["You can close your account at any time by visiting the Account you will find a link to close your account. Please note that closing your account is a finite action and cannot be undone."],
        searchJobs: ["After creating a profile on Kea.care web application you can login via mobile application  there you can browse quickly and easily. You can click on each job to read the full details and choose to apply or skip that particular job."],
        createBetterProfile: ["The key to receiving more responses and landing the ideal job is making sure your profile reflects your best traits. Here are some tips to help your profile stand out and be the best it can be.", "Show your personality", "Add information to your profile that sets you apart from other candidates, such as new hobbies, volunteer or charity work, interesting child care or senior care books you may have read, any seminar or training that you have attended Be creative. This additional information will give care seekers a more complete picture of who you really are and why you might be perfect for them.", "Upload a proffesional photo", "Photos add personality to your profile and put a face to the name.", "Upload a proffesional intro video"],
        profileNotApproved: ["Our team carefully reviews and get the background varification process done of a caregiver’s profile before approving it and including it in local listings. You will receive an email from us when your profile is not approved, and the email will indicate the most common reasons why a certain part of your profile was not approved."],
        error: ["Sorry I cannot answer this question."]
    }
}

export default function Chat() {
    const date = new Date();
    const { userType } = useContext(UserTypeContext);
    const [chats, setChats] = useState<{ chat: string[], chatBy: "bot" | "user", time: string }[]>([]);

    useEffect(() => {
        setChats([{
            chat: [`Welcome ${userType}.`],
            chatBy: "bot",
            time: date.getHours() + ":" + date.getMinutes()
        }]);
    }, [userType])

    useEffect(() => {
        document.querySelectorAll(".chat")[document.querySelectorAll(".chat").length - 1]?.scrollIntoView({
            behavior: "smooth",
            inline: "end"
        })
    }, [chats])

    const appendChat = (chat: HTMLInputElement) => {
        if (chat.value) {
            setChats(chats => [...chats, {
                chat: [chat.value],
                chatBy: "user",
                time: date.getHours() + ":" + date.getMinutes()
            }]);
            const addChat = (key: string) => {
                setTimeout(() => {
                    setChats(chats => [...chats, {
                        chat: faqs[userType][key],
                        chatBy: "bot",
                        time: date.getHours() + ":" + date.getMinutes()
                    }])
                }, 300)
            }
            try {
                if (userType === "careseeker") {
                    if (chat.value.includes("membership")) {
                        addChat("membership");
                    } else if (chat.value.includes("edit") && chat.value.includes("personal") && chat.value.includes("info")) {
                        addChat("editPersonalInfo");
                    } else if (chat.value.includes("personal") && chat.value.includes("info")) {
                        addChat("personalInfo");
                    } else if (chat.value.includes("post") && chat.value.includes("job")) {
                        addChat("postajob");
                    } else if (chat.value.includes("search") && chat.value.includes("caregiver")) {
                        addChat("searchcaregivers");
                    } else if (chat.value.includes("caregiver") && chat.value.includes("document")) {
                        addChat("caregiverdocuments");
                    } else if (chat.value.includes("write") && chat.value.includes("review")) {
                        addChat("writereview");
                    } else if (chat.value.includes("view") && chat.value.includes("payment")) {
                        addChat("viewpayments");
                    } else if (chat.value.includes("payment")) {
                        addChat("payments");
                    } else {
                        addChat("error");
                    }
                } else if (userType === "caregiver") {
                    if (chat.value.includes("edit") && chat.value.includes("personal") && chat.value.includes("info")) {
                        addChat("editPersonalInfo");
                    } else if (chat.value.includes("see") && chat.value.includes("personal") && chat.value.includes("info")) {
                        addChat("seePersonalInfo");
                    } else if (chat.value.includes("close") && chat.value.includes("account")) {
                        addChat("closeAccount");
                    } else if (chat.value.includes("search") && chat.value.includes("job")) {
                        addChat("searchJobs");
                    } else if (chat.value.includes("better") && chat.value.includes("profile")) {
                        addChat("createBetterProfile");
                    } else if (chat.value.includes("profile") && chat.value.includes("not") && chat.value.includes("approved")) {
                        addChat("profileNotApproved");
                    } else {
                        addChat("error");
                    }
                }
            } catch (error) {
                addChat("error");
            } finally {
                chat.value = "";
            }
        }
    }

    return (
        <dialog id="chatBox" className='rounded-lg backdrop:bg-black backdrop:bg-opacity-70 outline-none w-full md:w-[50rem] p-0'>
            <section className='grid grid-rows-[6rem_1fr_6rem] w-full'>
                <div className='bg-gradient-to-br from-sky-500 to-teal-500 flex justify-between p-[2rem] w-full'>
                    <p className='text-2xl'>KEACARE Chat Bot</p>
                    <CgClose className='text-xl cursor-pointer' onClick={() => {
                        (document.getElementById("chatBox") as HTMLDialogElement)?.close();
                    }} />
                </div>
                <div id="chats" className='min-h-[30rem] max-h-[30rem] flex flex-col gap-2 p-5 overflow-scroll overflow-x-hidden scroll-smooth'>
                    {
                        chats.map((chat, index) => {
                            if (chat.chatBy === "bot") {
                                return chat.chat.map((msg, index) => {
                                    return (
                                        <div key={index} className='chat bg-sky-500 bg-opacity-60 self-start px-3 py-1 rounded-lg flex flex-col min-w-[10rem] max-w-[21rem]'>
                                            <p className='text-base'>{msg}</p>
                                            <p className='self-end text-xs'>{chat.time}</p>
                                        </div>
                                    )
                                })
                            } else {
                                return chat.chat.map((msg, index) => {
                                    return (
                                        <div key={index} className='chat bg-teal-500 bg-opacity-60 self-end px-3 py-1 rounded-lg flex flex-col min-w-[10rem] max-w-[21rem]'>
                                            <p className='text-base'>{msg}</p>
                                            <p className='self-end text-xs'>{chat.time}</p>
                                        </div>
                                    )
                                })
                            }
                        })
                    }
                </div>
                <div className='bg-sky-500 bg-opacity-30 flex items-center justify-evenly p-[1rem]'>
                    <input type='type' className='flex-grow h-[3rem] rounded-lg outline-none border-2 border-teal-500 hover:ring-2 hover:ring-teal-400 focus:ring-2 focus:ring-teal-400 px-3' placeholder="Type a Message." onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            appendChat(e.currentTarget);
                        }
                    }} />
                    <button className='m-3 p-2 text-2xl bg-white bg-opacity-60 hover:bg-opacity-80 rounded-lg'
                        onClick={(e) => {
                            const chat = e.currentTarget.previousElementSibling as HTMLInputElement;
                            appendChat(chat);
                        }}>
                        <FaPaperPlane className='text-sky-700' />
                    </button>
                </div>
            </section>
        </dialog>
    )
}
