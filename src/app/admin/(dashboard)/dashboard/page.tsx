"use client"

import React from "react";

export default function Dashboard() {
    return (
        <section className="overflow-y-auto p-4 flex flex-col gap-[1rem]">
            <h1 className="p-3 text-lg bg-teal-500 text-white">DASHBOARD</h1> 
            <div className="shadow-lg p-4 grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
                <div className="flex flex-col bg-slate-200 rounded-lg p-4 h-[8rem]">
                    <p>Total Careseekers</p>
                    <p className="flex-grow"></p>
                    <p className="text-xl">60</p>
                </div>
                <div className="flex flex-col bg-slate-200 rounded-lg p-4 h-[8rem]">
                    <p>Total Caregivers</p>
                    <p className="flex-grow"></p>
                    <p className="text-xl">60</p>
                </div>
                <div className="flex flex-col bg-slate-200 rounded-lg p-4 h-[8rem]">
                    <p>Total not verified Caregivers</p>
                    <p className="flex-grow"></p>
                    <p className="text-xl">60</p>
                </div>
                <div className="flex flex-col bg-slate-200 rounded-lg p-4 h-[8rem]">
                    <p>Total verified Caregivers</p>
                    <p className="flex-grow"></p>
                    <p className="text-xl">60</p>
                </div>
            </div>           
        </section>
    );
}
