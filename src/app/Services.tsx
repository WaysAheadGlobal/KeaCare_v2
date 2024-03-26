import React from 'react';
import seniorCare from '../../public/ServiceSeniorCare.png';
import childCare from '../../public/ServiceChildCare.png';
import houseKeeping from '../../public/ServiceHouseKeeping.png';
import serviceCare from '../../public/KeaCareServices.png';

function Services() {
  return (
    <div className="flex flex-wrap justify-center gap-16 md:gap-24 sm:gap-8 m-24">
      <div className=" flex flex-col justify-center items-center w-40 h-40">
      <img src={serviceCare.src} alt="Child Care" className="w-full h-full object-cover" />
      </div>
      <div className="border-4 border-gray-300 rounded p-4  shadow-x shadow-md shadow-teal-700 flex flex-col justify-center items-center  w-40 h-40">
        <img src={childCare.src} alt="Child Care" className="w-8 h-8" /> 
        <p className="mt-2">Child Care</p>
      </div>
      <div className="border-4 border-gray-300 rounded p-4 shadow-x shadow-md shadow-teal-700 flex flex-col justify-center items-center  w-40 h-40">
        <img src={seniorCare.src} alt="Senior Care" className="w-8 h-8" />
        <p className="mt-2">Senior Care</p>
      </div>
      <div className="border-4 border-gray-300 rounded p-4 shadow-x shadow-md shadow-teal-700 flex flex-col justify-center items-center  w-40 h-40">
        <img src={houseKeeping.src} alt="House Keeping" className="w-8 h-8" />
        <p className="mt-2">HouseKeeping</p>
      </div>
    </div>
  );
}

export default Services;
