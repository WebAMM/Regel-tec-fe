import { Typography } from '@material-tailwind/react'
import React from 'react'

const Header = ({ isQualified = true }) => {
    console.log(isQualified, 'isQualified')
    return (
        <div>
            <Typography
                variant="h6"
                className="uppercase text-lg font-medium text-[#00B4F1]"
            >
                Take The Pre-Screener
            </Typography>
            <Typography
                variant="h3"
                className="my-4 text-4xl font-bold text-gray-900"
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
                className="mb-12 text-lg font-normal text-gray-700 max-w-4xl mx-auto"
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