import { Typography } from '@material-tailwind/react'
import React from 'react'
import { FaCheck } from 'react-icons/fa'

const ProgressStepper = ({ submitForm }) => {
    return (
        <div className="flex justify-center items-center lg:flex-row md:flex-row sm:flex-col flex-col lg:gap-8 md:gap-6 sm:gap-4 gap-4 mb-8">
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
                {!submitForm ?
                    (<div className="rounded-full border border-[#00B4F1] flex items-center justify-center w-6 h-6 mx-auto">
                        <div className="w-3 h-3 bg-[#00B4F1] rounded-full"></div>
                    </div>) :
                    (<div className="rounded-full bg-[#00B4F1] text-white w-6 h-6 mx-auto flex items-center justify-center p-1">
                        <FaCheck />
                    </div>)}
                <Typography variant="small" className="text-[#00B4F1]">
                    Pre-Screener
                </Typography>
            </div>
            <div className="w-24 mb-2 h-1 bg-[#00B4F1] rounded"></div>

            <div className="text-center">
                <div className="rounded-full bg-blue-100 w-6 h-6 mx-auto"></div>
                <Typography variant="small" className="text-gray-400">
                    Contact Info
                </Typography>
            </div>
        </div>
    )
}

export default ProgressStepper