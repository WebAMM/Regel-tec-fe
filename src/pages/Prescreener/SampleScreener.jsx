    import { Button, Typography } from "@material-tailwind/react";
    import React, { useState, useEffect } from "react";
    import { useLocation, useNavigate } from "react-router-dom";
    import { useAddAnswersOfSectionsMutation, useEvaluateAnswersMutation, useGetAllQuestionsForWebViewQuery, useGetLatestBatchNoQuery } from "../../api/apiSlice";
    import circleCheck from "../../assets/images/check-circle.png";
    import CustomProgress from "./CustomProgress";
    import Header from "./Header";
    import ProgressStepper from "./ProgressStepper";

    const SampleScreener = () => {
        const { data: sectionQuestions, isLoading } = useGetAllQuestionsForWebViewQuery();
        const {data: latesBatchNo, isLoading:BatchNoLoader} =useGetLatestBatchNoQuery()
        const [addAnswersOfSections,{isLoading:addAnswersLoader}] = useAddAnswersOfSectionsMutation()
        const [evaluateAnswers,{isLoading:evaluateAnswersLoader}] = useEvaluateAnswersMutation()

        const navigate = useNavigate();
        const { state } = useLocation();
        const batchNumber = latesBatchNo?.data?.latestBatchNo +1;

        const [currentStep, setCurrentStep] = useState(1);
        const [groupedData, setGroupedData] = useState({
            sectionId: "",
            data: [],
            batchNo: batchNumber
        });
        const [evaluateAnswersData, setEvaluateAnswersData] = useState({
        answers: [],
            userZipcode: state?.center?.zipCode,
            studyCenterId: state?.center?.id,
            bmi: 20.8,
        });

        const [submitForm, setSubmitForm] = useState(false);
        const [validationError, setValidationError] = useState("");
        
        const totalSteps = sectionQuestions?.data?.latestSectionOrder;
        

        // Handle input changes and update groupedData
        const handleInputChange = (questionId, value, sectionId) => {
            setValidationError(""); // Clear validation error when user makes changes
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

        // Validate that all questions in the current section are answered
        const validateCurrentSection = () => {
            // Get current section's questions
            const currentSectionQuestions = sectionQuestions?.data?.sections[currentStep - 1]?.questions || [];
            const currentSectionId = sectionQuestions?.data?.sections[currentStep - 1]?.sectionId;
            
            // Check if sectionId matches
            if (groupedData.sectionId !== currentSectionId) {
                setValidationError("Please complete all questions in this section.");
                return false;
            }
            
            // Check if all questions have answers
            for (const question of currentSectionQuestions) {
                const questionAnswer = groupedData.data.find(item => item.questionId === question.questionId);
                
                // If answer doesn't exist or is empty string
                if (!questionAnswer || questionAnswer.answer === '') {
                    setValidationError("Please complete all questions in this section.");
                    return false;
                }
            }
            
            return true;
        };

        const handleNext = async (e) => {
            try {
                e.preventDefault();
                
                // Validate all fields are completed before proceeding
                if (!validateCurrentSection()) {
                    return [];
                }
                
                const response = await addAnswersOfSections(groupedData).unwrap()
                console.log('response:', response?.data);
                
                const currentAnswers = Array.isArray(evaluateAnswersData.answers) ? evaluateAnswersData.answers : [];
                const responseData = Array.isArray(response?.data) ? response.data : [];
                
                // Create updated answers array
                const updatedAnswers = [...currentAnswers, ...responseData];
                
                setEvaluateAnswersData((prev) => {
                    return {
                        ...prev,
                        answers: updatedAnswers
                    };
                });
                
                setGroupedData({
                    sectionId: "",
                    data: [],
                    batchNo: batchNumber
                });
                
                if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
                else {
                    setSubmitForm(true);
                }
                
                return updatedAnswers;
            } catch (error) {
                console.log(error,'error')
                return [];
            }
        };
        
        const handleSubmit = async (e) => {
            try {
                // Call handleNext and get the latest answers
                const latestAnswers = await handleNext(e);
                
                if (latestAnswers && latestAnswers.length > 0) {
                    // Use the latest answers directly rather than from state
                    const evaluateAnswersDataForm = {
                        ...evaluateAnswersData,
                        answers: latestAnswers
                    };
                    
                    // Uncomment the line below to actually submit the data
                    const response = await evaluateAnswers(evaluateAnswersDataForm).unwrap();
                    console.log('evaluateAnswersDataForm', evaluateAnswersDataForm);
                }
            } catch (error) {
                console.log('Submit error:', error);
            }
        };

        const handleBack = () => {
            setValidationError(""); // Clear validation error when going back
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
                                        <option value="">Select an option</option>
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
        console.log(groupedData, 'groupedData')
        console.log(evaluateAnswersData, 'evaluateAnswers')
        console.log(batchNumber,'batchNumber')

        if (isLoading || BatchNoLoader) return <div>loading...</div>;

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
                                        
                                        {/* Display validation error message */}
                                        {validationError && (
                                            <div className="mt-2 text-red-500 text-sm text-left">
                                                {validationError}
                                            </div>
                                        )}

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
                                                    type="button"
                                                    onClick={handleSubmit}
                                                >
                                                    {evaluateAnswersLoader ? 'loading' : 'Submit'}
                                                </Button>) : (
                                                <Button
                                                    className="bg-[#00B4F1] h-12 text-white rounded-full"
                                                    onClick={handleNext}
                                                    type="button"
                                                >
                                                    {addAnswersLoader ? "Loading": 'Next'}
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