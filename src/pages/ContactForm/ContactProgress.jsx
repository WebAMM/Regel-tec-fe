import { Typography } from '@material-tailwind/react';
import React from 'react'
import { FaCheck } from "react-icons/fa";
const ContactProgress = () => {
    return (
        <div className="flex justify-center items-center gap-8 mb-8">
            <div className="text-center">
                <div className="rounded-full bg-[#00B4F1] text-white w-6 h-6 mx-auto flex items-center justify-center p-1">
                    <FaCheck />
                </div>
                <Typography variant="small" className="text-[#00B4F1]">
                    Select Location
                </Typography>
            </div>
            <div className="w-24 mb-2 h-1 bg-[#00B4F1] rounded"></div>

            <div className="text-center">
                <div className="rounded-full bg-[#00B4F1] text-white w-6 h-6 mx-auto flex items-center justify-center p-1">
                    <FaCheck />
                </div>
                <Typography variant="small" className="text-[#00B4F1]">
                    Pre-Screener
                </Typography>
            </div>
            <div className="w-24 mb-2 h-1 bg-[#00B4F1] rounded"></div>

            <div className="text-center">
                <div className="rounded-full border border-[#00B4F1] flex items-center justify-center w-6 h-6 mx-auto">
                    <div className="w-3 h-3 bg-[#00B4F1] rounded-full"></div>
                </div>
                <Typography variant="small" className="text-[#00B4F1]">
                    Contact Info
                </Typography>
            </div>
        </div>
    )
}

export default ContactProgress