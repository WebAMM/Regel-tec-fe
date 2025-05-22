import { Typography } from '@material-tailwind/react'
import React from 'react'

const Header = ({ isQualified = true }) => {
    console.log(isQualified, 'isQualified')
    return (
        <div>
            <Typography
                variant="h6"
                className="uppercase lg:text-lg md:text-[16px] sm:text-sm text-sm font-medium text-[#00B4F1]"
            >
                Take The Pre-Screener
            </Typography>
            <Typography
                variant="h3"
                className="my-4 lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-bold text-gray-900"
            >
                Do I Qualify?
            </Typography>
            {/* {!isQualified && (<Typography
                variant="paragraph"
                className="mb-12 text-lg font-normal text-gray-700 max-w-4xl mx-auto"
            >
                To see if you might qualify for the study, we need to ask you 8
                quick questions. If you pass the pre-screener and appear to
                prequalify, you can submit your contact information to the local
                study center. A study representative may contact you to tell you
                more about the study, ask you more questions, answer your questions,
                and possibly schedule an office visit.
            </Typography>)} */}
            {!isQualified ? (<Typography
                variant="paragraph"
                className="mb-12 lg:text-lg md:text-[16px] sm:text-sm text-sm font-normal text-[#39394A] font-relay max-w-4xl mx-auto"
            >
                To see if you might qualify for the study, we need to ask you 8
                quick questions. If you pass the pre-screener and appear to
                prequalify, you can submit your contact information to the local
                study center. A study representative may contact you to tell you
                more about the study, ask you more questions, answer your questions,
                and possibly schedule an office visit.
            </Typography>) : null}
        </div>
    )
}

export default Header