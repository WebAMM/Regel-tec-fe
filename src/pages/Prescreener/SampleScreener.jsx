import { Button, Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllQuestionsForWebViewQuery } from "../../api/apiSlice";
import circleCheck from "../../assets/images/check-circle.png";
import CustomProgress from "./CustomProgress";
import Header from "./Header";
import ProgressStepper from "./ProgressStepper";

const SampleScreener = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [groupedData, setGroupedData] = useState({
        sectionId: "",
        data: [
            {
                questionId: "",
                answer: ""
            },
        ],
        batchNo: 12
    });

    const [submitForm, setSubmitForm] = useState(false);
    const { data: sectionQuestions, isLoading } = useGetAllQuestionsForWebViewQuery();
    const totalSteps = sectionQuestions?.data?.latestSectionOrder;
    const navigate = useNavigate();
    const { state } = useLocation();

    const evaluateAnswers = {
        answers: [],
        userZipcode: state?.center?.zipCode,
        studyCenterId: state?.center?.id,
        bmi: '',
    };

    // Handle input changes and update groupedData
    const handleInputChange = (questionId, value, sectionId) => {
        setGroupedData((prevData) => {
            console.log(sectionId, 'sectionId')
            const updatedData = [...prevData.data];
            const questionIndex = updatedData.findIndex(item => item.questionId === questionId);

            if (questionIndex !== -1) {
                updatedData[questionIndex].answer = value;
            } else {
                updatedData.push({ questionId, answer: value });
            }

            return { ...prevData, sectionId: sectionId, data: updatedData };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form submitted with values:', groupedData);
    };

    const handleNext = (e) => {
        handleSubmit(e)
        // if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
        // else {
        //     setSubmitForm(true);
        //     // You could redirect or show a success message
        // }
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep((prev) => prev - 1);
    };

    const questionDivision = sectionQuestions?.data?.sections?.map((section, index) => (
        <div key={section.sectionId} className="flex gap-4 items-center">
            {section.questions.map((question, questionIndex) => {
                switch (question.type) {
                    case "TextBox":
                        return (
                            <div className="flex w-1/4 flex-col" key={question.questionId}>
                                <label className="text-sm font-normal text-gray-700 text-start mb-1">{question.title}</label>
                                <input
                                    placeholder={question.meta.placeholder}
                                    type="text"
                                    value={groupedData.data.find(item => item.questionId === question.questionId,)?.answer || ''}
                                    onChange={(e) => handleInputChange(question.questionId, e.target.value, section.sectionId)}
                                    className="border w-full border-gray-200 rounded-lg px-3 !h-[50px] outline-none"
                                />
                            </div>
                        );
                    case "NumericBox":
                        return (
                            <div className="flex w-1/4 flex-col" key={question.questionId}>
                                <label className="text-sm font-normal text-gray-700 text-start mb-1">{question.title}</label>
                                <input
                                    placeholder={question.meta.placeholder}
                                    type="number"
                                    value={groupedData.data.find(item => item.questionId === question.questionId)?.answer || ''}
                                    onChange={(e) => handleInputChange(question.questionId, e.target.value, section.sectionId)}
                                    className="border border-gray-200 rounded-lg px-3 !h-[50px] outline-none"
                                />
                            </div>
                        );
                    case "DropDown":
                        return (
                            <div className="flex flex-col w-1/4" key={question.questionId}>
                                <label className="text-sm font-normal text-gray-700 text-start mb-1">{question.title}</label>
                                <select
                                    value={groupedData.data.find(item => item.questionId === question.questionId)?.answer || ''}
                                    onChange={(e) => handleInputChange(question.questionId, e.target.value, section.sectionId)}
                                    className="border border-gray-200 rounded-lg px-3 !h-[50px] outline-none"
                                >
                                    {question.meta.options.map((option) => (
                                        <option key={option._id} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    case "TrueFalse":
                        return (
                            <div className="flex flex-col w-1/4" key={question.questionId}>
                                <label className="text-sm font-normal text-gray-700 text-start mb-1">{question.title}</label>
                                {question.meta.options.map((option) => (
                                    <div className="flex" key={option._id}>
                                        <input
                                            type="radio"
                                            value={option.value}
                                            checked={groupedData.data.find(item => item.questionId === question.questionId)?.answer === option.value}
                                            onChange={(e) => handleInputChange(question.questionId, e.target.value, section.sectionId)}
                                        />
                                        <label>{option.label}</label>
                                    </div>
                                ))}
                            </div>
                        );
                    default:
                        return null; // Handle any unrecognized question types
                }
            })}
        </div>
    ));
    console.log(sectionQuestions?.data?.sections, 'sectionQuestion')
    if (isLoading) return <div>loading...</div>;

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="container mx-auto">
                <div className="text-center">
                    <Header />
                    <div className="bg-white shadow-lg rounded-xl w-full p-8">
                        <ProgressStepper />
                        {!submitForm ? (
                            <>
                                <div className="flex items-center justify-between">
                                    <Typography variant="small" className="text-gray-700">
                                        Progress
                                    </Typography>

                                    <Typography className="text-sm text-gray-600">
                                        {currentStep} of {totalSteps}
                                    </Typography>
                                </div>
                                <div className="mb-5">
                                    <CustomProgress value={currentStep} total={totalSteps} />
                                </div>
                                <form>
                                    {questionDivision[currentStep - 1]}

                                    <div className="flex gap-4 mt-4 justify-start">
                                        {currentStep > 1 && (
                                            <Button
                                                variant="outlined"
                                                className="h-12 border-[#] text-[#00B4F1] rounded-full"
                                                onClick={handleBack}
                                                type="button"
                                            >
                                                Back
                                            </Button>
                                        )}

                                        {currentStep === totalSteps ? (
                                            <Button
                                                className="bg-[#00B4F1] h-12 text-white rounded-full"
                                            // type="submit
                                            //"
                                            // onClick={handleSubmit}
                                            >
                                                Submit
                                            </Button>) : (
                                            <Button
                                                className="bg-[#00B4F1] h-12 text-white rounded-full"
                                                onClick={handleNext}
                                                type="button"
                                            >
                                                Next
                                            </Button>)}

                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <div className="">
                                    <div className="flex justify-center">
                                        <img src={circleCheck} alt="" />
                                    </div>
                                    <Typography
                                        variant="h3"
                                        className="my-4 text-4xl font-bold text-gray-900"
                                    >
                                        Good news! You may qualify!
                                    </Typography>
                                    <Typography
                                        variant="paragraph"
                                        className="mb-12 text-lg font-normal text-gray-700 max-w-4xl mx-auto"
                                    >
                                        Based on your responses to this initial questionnaire, it
                                        appears you may qualify for the HYDRAFIL-D research study.
                                        The final decision will be made by the local study doctor.
                                        Please click Next to enter your contact information so
                                        someone from the local study center can contact you.
                                    </Typography>
                                    <Button
                                        className="bg-[#00B4F1] h-12 text-white rounded-full"
                                        onClick={() => navigate("/contact")}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SampleScreener;
