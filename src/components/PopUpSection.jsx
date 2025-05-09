import React from 'react'
import { useNavigate } from 'react-router-dom'

const PopUpSection = ({ center }) => {
    const navigate = useNavigate()

    console.log(center, 'center')


    const handleCenter = (item) => {
        navigate("/prescreen", { state: { center: item } })
    }
    return (
        <div className="bg-white p-1 rounded-lg ">
            <h3 className="font-bold text-gray-800 mb-2">
                Local Study Center Example
            </h3>
            <p className="text-gray-600 mb-1">
                {center?.name}
            </p>
            <p className="text-gray-700 mb-3">
                {center?.address},{center?.city},{center?.state},{center?.zipcode}
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
                <span>{center?.distanceFromUserLocation?.distance} miles away</span>
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