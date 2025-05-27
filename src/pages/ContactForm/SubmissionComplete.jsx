import React from 'react'
import circleCheck from "../../assets/images/check-circle.png";
import { Button, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
const SubmissionComplete = ({ isQualified, isStudyCenterInRadius }) => {
    const navigate = useNavigate()
    let contactInfo = ''
    if (isQualified) {
        if (isStudyCenterInRadius) {
            contactInfo = (
                <>
                    Thank you. Someone from the local study center may contact you. {" "}
                    <Link to='/privacy-policy' className="text-[#00B4F1]">Privacy Policy</Link>
                </>
            )
        }
        else {
            contactInfo = (
                <>
                    Thank you. Should a local study center open in your area in the future, we will share your information with their research staff. Someone from the local study center may contact you. {" "}
                    <Link to='/privacy-policy' className="text-[#00B4F1]">Privacy Policy</Link>
                </>
            )
        }
    }
    return (
        <div className="">
            <div className="flex justify-center">
                <img src={circleCheck} alt="" />
            </div>
            <Typography
                variant="h3"
                className="my-4 lg:text-[28px] md:text-2xl sm:text-xl text-xl font-bold text-gray-900"
            >
                Submission Complete
            </Typography>
            <Typography
                variant="paragraph"
                className="mb-12 lg:text-lg md:text-[16px] sm:text-sm text-sm font-normal text-[#39394A] font-relay max-w-4xl mx-auto"
            >
                {/* <div dangerouslySetInnerHTML={{ __html: contactInfo }} /> */}
                {contactInfo}
            </Typography>
            <Button
                className="bg-[#00B4F1] h-12 text-white rounded-full cursor-pointer"
                onClick={() => navigate('/')}
            >
                Finish
            </Button>

        </div>
    )
}

export default SubmissionComplete