import React from 'react'
import { useNavigate } from 'react-router-dom'

const PopUpSection = ({ center, zipcode }) => {
    const navigate = useNavigate()

    // console.log(zipcode, 'zipcode')


    const handleCenter = (item) => {
        navigate("/prescreen", { state: { center: item, userLocation: zipcode } })
    }
    return (
        <div className="bg-white p-1 rounded-lg">
            <div className="font-semibold text-[#121229] mb-2 font-relay text-[16px]">
                Local Study Center
            </div>
            <p className="text-[#39394A] mb-1 font-relay">
                {center?.name}
            </p>
            <p className="text-gray-700 mb-3">
                {center?.city},{center?.state},{center?.zipCode}
            </p>
            <div className="flex items-center text-gray-600 mb-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                <span>{center?.distanceFromUserLocation?.distance || 0.00} miles away</span>
            </div>
            <button className="w-full bg-cyan-500 text-white rounded-full py-2 hover:bg-cyan-600 transition-colors font-medium"
                onClick={() => handleCenter(center)}
            >
                Select This Location
            </button>
        </div>
    )
}

export default PopUpSection