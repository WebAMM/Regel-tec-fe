import React from 'react'
import circleCheck from "../../assets/images/check-circle.png";
import { Button, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
const SubmissionComplete = () => {
    const navigate = useNavigate()
    return (
        <div className="">
            <div className="flex justify-center">
                <img src={circleCheck} alt="" />
            </div>
            <Typography
                variant="h3"
                className="my-4 text-4xl font-bold text-gray-900"
            >
                Submission Complete
            </Typography>
            <Typography
                variant="paragraph"
                className="mb-12 text-lg font-normal text-[#39394A] font-relay max-w-4xl mx-auto"
            >
                Thank you. Someone from the local study center may contact you. <a href="javascript:void(0)" target='_blank' className="text-[#00B4F1]">Privacy Policy</a>
            </Typography>
            <Button
                className="bg-[#00B4F1] h-12 text-white rounded-full"
                onClick={() => navigate('/')}
            >
                Finish
            </Button>

        </div>
    )
}

export default SubmissionComplete