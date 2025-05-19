import React from 'react';
import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import circleCheck from "../../assets/images/check-circle.png";
// import circleX from "../../assets/images/x-circle.png"; // You might want to add this image

const QualificationResult = ({
    isQualified = true,
    isStudyCenterInRadius = true,
    studyName = "HYDRAFIL-D",
    reportId = null,
    onNext,
    contactData,
}) => {
    const navigate = useNavigate();

    const qualifiedContent = {
        title: "Good news! You may qualify!",
        description: `Based on your responses to this initial questionnaire, it appears you may qualify for the ${studyName} research study. The final decision will be made by the local study doctor. Please click Next to enter your contact information so someone from the local study center can contact you.`,
        image: circleCheck,
        buttonText: "Next",
        buttonAction: onNext || (() => navigate("/contact", { state: { reportId: reportId, contactData: contactData, isStudyCenterInRadius: isStudyCenterInRadius } }))
    };

    const nonQualifiedContent = {
        title: "We’re sorry. You do not qualify.",
        description: `Thank you for your interest in the HYDRAFIL-D research study. We’re sorry, but based on your responses you do not qualify for this study.`,
        image: circleCheck,
        buttonText: "Back to Home",
        buttonAction: onNext || (() => navigate("/", { state: { reportId: reportId } }))
    };
    const studyCenterNotFoundContent = {
        title: "We’re sorry. There is no study center close enough to you..",
        description: `Thank you for your interest in the HYDRAFIL-D research study. Based on your responses to this initial questionnaire, it appears you may qualify for this study; however, no local study center is available in your area at this time.
Please check back to this study website regularly for updates on new study locations that may be opening in the future. You may be able to participate if a new local study center location opens near you.`,
        image: circleCheck,
        buttonText: "Next",
        buttonAction: onNext || (() => navigate("/contact", { state: { contactData: contactData, isStudyCenterInRadius: isStudyCenterInRadius } }))
    };

    let content = ''
    if (isQualified === true) {
        if (isStudyCenterInRadius === true) {
            content = qualifiedContent
        } else {
            content = studyCenterNotFoundContent
        }

    } else {
        content = nonQualifiedContent
    }
    console.log(reportId, 'reportId')
    return (
        <div className="">
            <div className="flex justify-center">
                <img src={content.image} alt={isQualified ? "Qualification Check" : "Non-Qualification"} />
            </div>
            <Typography
                variant="h3"
                className="my-4 text-4xl font-bold text-gray-900"
            >
                {content.title}
            </Typography>
            <Typography
                variant="paragraph"
                className="mb-12 text-lg font-normal text-gray-700 max-w-4xl mx-auto "
            >
                {content.description}
            </Typography>
            <Button
                className="bg-[#00B4F1] h-12 text-white rounded-full"
                onClick={content.buttonAction}
            >
                {content.buttonText}
            </Button>
        </div>
    );
};

export default QualificationResult;