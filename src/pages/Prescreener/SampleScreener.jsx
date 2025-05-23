import { Button, Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddAnswersOfSectionsMutation, useEvaluateAnswersMutation, useGetAllQuestionsForWebViewQuery, useGetLatestBatchNoQuery } from "../../api/apiSlice";
import CustomProgress from "./CustomProgress";
import Header from "./Header";
import ProgressStepper from "./ProgressStepper";
import QualificationResult from "./QualificationResult";

const SampleScreener = () => {
    const { data: sectionQuestions, isLoading } = useGetAllQuestionsForWebViewQuery();
    const { data: latesBatchNo, isLoading: BatchNoLoader } = useGetLatestBatchNoQuery()
    const [addAnswersOfSections, { isLoading: addAnswersLoader }] = useAddAnswersOfSectionsMutation()
    const [evaluateAnswers, { isLoading: evaluateAnswersLoader }] = useEvaluateAnswersMutation()
    const [qualificationStatus, setQualificationStatus] = useState(null);


    const navigate = useNavigate();
    const { state } = useLocation();
    const batchNumber = latesBatchNo?.data?.latestBatchNo + 1;

    const [currentStep, setCurrentStep] = useState(1);

    const bmiQuestions = {
        GENDER: 'Gender',
        HEIGHT: 'How tall are you? (inches)',
        WEIGHT: 'How much do you weigh? (pounds)',
        QUESTION_SECTION: 5
    }

    const [groupedData, setGroupedData] = useState({
        sectionId: "",
        data: [],
        batchNo: null
    });
    const [contactData, setcontactData] = useState({
        city: "",
        state: "",
        zipCode: null
    });

    const [evaluateAnswersData, setEvaluateAnswersData] = useState({
        answers: [],
        userZipcode: state?.userLocation || '',
        studyCenterId: state?.center?.id || state?.center,
        bmi: null, // Initialize as null
    });

    const [submitForm, setSubmitForm] = useState(false);
    const [validationError, setValidationError] = useState("");

    const totalSteps = sectionQuestions?.data?.latestSectionOrder;

    // Calculate BMI when section 5 is completed
    const calculateBMI = () => {

        const heightQuestion = groupedData.data.find(q => q.questionId === sectionQuestions?.data?.sections[bmiQuestions.QUESTION_SECTION - 1]?.questions.find(q => q.title === bmiQuestions.HEIGHT)?.questionId);
        const weightQuestion = groupedData.data.find(q => q.questionId === sectionQuestions?.data?.sections[bmiQuestions.QUESTION_SECTION - 1]?.questions.find(q => q.title === bmiQuestions.WEIGHT)?.questionId);

        if (heightQuestion && weightQuestion) {

            const height = parseFloat(heightQuestion.answer);
            const weight = parseFloat(weightQuestion.answer);



            if (!isNaN(height) && !isNaN(weight) && height > 0) {

                // BMI calculation: (weight in pounds / (height in inches)^2) * 703
                const bmi = (weight / (height * height)) * 703;

                setEvaluateAnswersData(prev => ({
                    ...prev,
                    bmi: Number(bmi.toFixed(1))
                }));

                setGroupedData(prev => ({
                    ...prev,
                    bmi: Number(bmi.toFixed(1)) // Add BMI to groupedData
                }));

                console.log(groupedData, 'groupedData in BMI')

            }
        }
    };

    // Handle input changes and update groupedData
    const handleInputChange = (questionId, value, sectionId, title) => {
        // console.log(value, 'value')
        // console.log(title, 'title')

        if (!state?.userLocation && title === 'Zip Code') {
            setEvaluateAnswersData((prev) => {
                return {
                    ...prev,
                    userZipcode: value

                };
            });
            setcontactData((prev) => {
                return {
                    ...prev,
                    zipCode: value

                };
            });
        }
        if (title === 'City') {
            if (state?.userLocation) {
                setcontactData((prev) => {
                    return {
                        ...prev,
                        zipCode: state?.userLocation

                    };
                });
            }

            setcontactData((prev) => {
                return {
                    ...prev,
                    city: value

                };
            });
        }
        if (title === 'State') {

            setcontactData((prev) => {
                return {
                    ...prev,
                    state: value

                };
            });
        }

        setValidationError(""); // Clear validation error when user makes changes
        setGroupedData((prevData) => {
            const updatedData = [...prevData.data];
            console.log(updatedData, 'updatedata')
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
            // console.log('evaluateAnswersData.userZipcode', evaluateAnswersData.userZipcode);
            // const questionAnswer = evaluateAnswersData.userZipcode !== '' ? groupedData.data.filter((el) => el.title === 'Zip Code').find(item => item.questionId === question.questionId) : groupedData.data.find(item => item.questionId === question.questionId);

            if (question.title === 'Zip Code' && evaluateAnswersData.userZipcode !== '') {
                continue; // Skip this iteration and move to the next question
            }

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



            // If this is the BMI section, calculate BMI
            if (currentStep === bmiQuestions.QUESTION_SECTION) {
                calculateBMI();
            }

            const response = await addAnswersOfSections(groupedData).unwrap()

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
            console.log(error, 'error')
            return [];
        }
    };

    const handleSubmit = async (e) => {
        try {
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
                if (response?.result) {
                    setQualificationStatus(response.result);
                }
            }
        } catch (error) {
            console.log('Submit error:', error);
        }
    };

    const questionDivision = sectionQuestions?.data?.sections?.map((section, index) => (
        <div key={section.sectionId} className="flex gap-4 items-center lg:flex-row md:flex-row sm:flex-col flex-col">
            {section.questions.map((question, questionIndex) => {
                switch (question.type) {
                    case "TextBox":
                        return (
                            <div className="flex lg:w-1/4 md:w-1/3 sm:w-100 w-50 flex-col" key={question.questionId}>
                                <label className="text-sm font-normal text-start mb-1 text-[#39394A] font-relay">{question.title}</label>
                                <input
                                    placeholder={question.meta.placeholder}
                                    type="text"
                                    value={groupedData.data.find(item => item.questionId === question.questionId,)?.answer || ''}
                                    onChange={(e) => handleInputChange(question.questionId, e.target.value, section.sectionId, question.title)}
                                    className="border w-full border-gray-200 rounded-lg px-3 !h-[50px] outline-none"
                                />
                            </div>
                        );
                    case "NumericBox":
                        return (
                            <div className="flex lg:w-1/4 md:w-1/3 sm:w-100 w-50 flex-col" key={question.questionId}>
                                <label className="text-sm font-normal text-start mb-1 text-[#39394A] font-relay">{question.title}</label>
                                <input
                                    placeholder={question.meta.placeholder}
                                    type="number"
                                    // value={groupedData.data.find(item => item.questionId === question.questionId)?.answer || state?.userLocation || ''}
                                    value={
                                        question.title === 'Zip Code'
                                            ? (groupedData.data.find(item => item.questionId === question.questionId)?.answer || state?.userLocation || '')
                                            : (groupedData.data.find(item => item.questionId === question.questionId)?.answer || '')
                                    }


                                    onChange={(e) => handleInputChange(question.questionId, e.target.value, section.sectionId, question.title)}
                                    className="border border-gray-200 rounded-lg px-3 !h-[50px] outline-none"
                                    readOnly={question.title === 'Zip Code' && state?.userLocation}
                                />
                            </div>
                        );
                    case "DropDown":
                        return (
                            <div className="flex flex-col lg:w-1/4 md:w-1/3 sm:w-100 w-50" key={question.questionId}>
                                <label className="text-sm font-normal text-[#39394A] font-relay text-start mb-1">{question.title}</label>
                                <select
                                    value={groupedData.data.find(item => item.questionId === question.questionId)?.answer || ''}
                                    onChange={(e) => handleInputChange(question.questionId, e.target.value, section.sectionId, question.title)}
                                    className="text-[#39394A] text-sm border border-gray-200 rounded-lg px-3 !h-[50px] outline-none"
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
                            <div className="flex flex-col lg:w-1/2 md:w-1/2 sm:w-100 w-50" key={question.questionId}>
                                <label className="lg:text-lg md:text-[16px] sm:text-sm text-sm font-normal text-start text-[#39394A] font-relay mb-1">{question.title}</label>
                                <div className="flex text-[#39394A] font-relay items-center justify-between lg:w-1/4 md:w-1/3 sm:w-1/2 w-1/2 mt-[30px] mb-2">
                                    {question.meta.options.map((option) => (
                                        <div className="flex gap-2" key={option._id}>
                                            <input
                                                id={`radio-${question.questionId}-${option._id}`}
                                                type="radio"
                                                value={option.value}
                                                checked={groupedData.data.find(item => item.questionId === question.questionId)?.answer === option.value}
                                                onChange={(e) => handleInputChange(question.questionId, e.target.value, section.sectionId, question.title)}
                                            />

                                            <label htmlFor={`radio-${question.questionId}-${option._id}`}>{option.label}</label>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        );
                    default:
                        return null; // Handle any unrecognized question types
                }
            })}
        </div>
    ));

    useEffect(() => {
        if (latesBatchNo?.data?.latestBatchNo !== undefined) {
            const calculatedBatchNumber = latesBatchNo.data.latestBatchNo + 1;
            setGroupedData(prev => ({
                ...prev,
                batchNo: calculatedBatchNumber
            }));
        }
    }, [latesBatchNo]);
    // useEffect(() => {
    //     if (groupedData.bmi !== null && groupedData.bmi !== undefined) {
    //         // Proceed to the next step or call the API
    //         const proceedWithApiCall = async () => {
    //             const response = await addAnswersOfSections(groupedData).unwrap();
    //             const currentAnswers = Array.isArray(evaluateAnswersData.answers) ? evaluateAnswersData.answers : [];
    //             const responseData = Array.isArray(response?.data) ? response.data : [];

    //             const updatedAnswers = [...currentAnswers, ...responseData];

    //             setEvaluateAnswersData((prev) => ({
    //                 ...prev,
    //                 answers: updatedAnswers
    //             }));

    //             setGroupedData({
    //                 sectionId: "",
    //                 data: [],
    //                 batchNo: batchNumber
    //             });

    //             if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
    //             else {
    //                 setSubmitForm(true);
    //             }
    //         };

    //         proceedWithApiCall();
    //     }
    // }, [groupedData.bmi, addAnswersOfSections, batchNumber, currentStep, evaluateAnswersData, groupedData, totalSteps6]);
    if (isLoading || BatchNoLoader) return <div className="fixed left-0 top-0 z-[11111] w-full h-[100vh] flex items-center justify-center bg-gray-50">
        <div className="flex space-x-2 justify-center items-center h-16">
            <div className="w-4 h-4 bg-[#0092b8] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-4 h-4 bg-[#0092b8] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-4 h-4 bg-[#0092b8] rounded-full animate-bounce"></div>
        </div>
    </div>;
    // console.log(state, 'state')
    // console.log(evaluateAnswersData, 'evaluateAnswersData')
    // console.log(contactData, 'contactData')
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="container mx-auto">
                <div className="text-center">
                    <Header isQualified={submitForm} />
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
                                <div className="mt-3">
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
                                                {addAnswersLoader ? "Loading" : 'Next'}
                                            </Button>)}

                                    </div>
                                </form>
                            </>
                        ) : (

                            qualificationStatus !== null && (
                                <QualificationResult
                                    isQualified={qualificationStatus?.data?.preScreenerResult?.isAnswersPassed}
                                    isStudyCenterInRadius={qualificationStatus?.data?.preScreenerResult?.isUserZipcodeInRadius}
                                    reportId={qualificationStatus?.data?.reportId}
                                    studyName="HYDRAFIL-D"
                                    contactData={contactData}
                                />
                            )

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SampleScreener;