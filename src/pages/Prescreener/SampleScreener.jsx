import { Button, Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useAddAnswersOfSectionsMutation,
  useEvaluateAnswersMutation,
  useGetAllQuestionsForWebViewQuery,
  useGetLatestBatchNoQuery,
  useLazyGetStateCityByZipcodeQuery,
  useLazyGetRadiusBasedStudyCenterQuery
} from "../../api/apiSlice";
import CustomProgress from "./CustomProgress";
import Header from "./Header";
import ProgressStepper from "./ProgressStepper";
import QualificationResult from "./QualificationResult";
import { IoIosArrowRoundBack } from "react-icons/io";
import { LoaderCenter } from "../../utilities/Loader";

const SampleScreener = () => {
  const { data: sectionQuestions, isLoading } =
    useGetAllQuestionsForWebViewQuery();
  const { data: latesBatchNo, isLoading: BatchNoLoader } =
    useGetLatestBatchNoQuery();
  const [addAnswersOfSections, { isLoading: addAnswersLoader }] =
    useAddAnswersOfSectionsMutation();
  const [evaluateAnswers, { isLoading: evaluateAnswersLoader }] =
    useEvaluateAnswersMutation();
  const [getStateCityByZipcode] = useLazyGetStateCityByZipcodeQuery();
  const [getRadiusBasedStudyCenter] = useLazyGetRadiusBasedStudyCenterQuery();
  const [qualificationStatus, setQualificationStatus] = useState(null);
  const [evaluateResponse, setEvaluateResponse] = useState(null);
  const isValidZipCode = (zip) => /^\d{5}$/.test(zip);

  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("state", state)
  const batchNumber = latesBatchNo?.data?.latestBatchNo + 1;

  const [currentStep, setCurrentStep] = useState(1);

  const bmiQuestions = {
    GENDER: "Gender",
    HEIGHT: "How tall are you? (inches)",
    WEIGHT: "How much do you weigh? (pounds)",
    QUESTION_SECTION: 5,
  };

  const [groupedData, setGroupedData] = useState({
    sectionId: "",
    data: [],
    batchNo: null,
  });
  const [contactData, setcontactData] = useState({
    city: "",
    state: "",
    zipCode: state?.userLocation || "",
  });

  const [evaluateAnswersData, setEvaluateAnswersData] = useState({
    answers: [],
    userZipcode: state?.userLocation || "",
    studyCenterId: state?.center?.id || state?.center,
    bmi: null, // Initialize as null
  });

  const [submitForm, setSubmitForm] = useState(false);
  const [validationError, setValidationError] = useState("");

  const totalSteps = sectionQuestions?.data?.latestSectionOrder;

  // Calculate BMI when section 5 is completed
  const calculateBMI = () => {
    const heightQuestion = groupedData.data.find(
      (q) =>
        q.questionId ===
        sectionQuestions?.data?.sections[
          bmiQuestions.QUESTION_SECTION - 1
        ]?.questions.find((q) => q.title === bmiQuestions.HEIGHT)?.questionId
    );
    const weightQuestion = groupedData.data.find(
      (q) =>
        q.questionId ===
        sectionQuestions?.data?.sections[
          bmiQuestions.QUESTION_SECTION - 1
        ]?.questions.find((q) => q.title === bmiQuestions.WEIGHT)?.questionId
    );

    if (heightQuestion && weightQuestion) {
      const height = parseFloat(heightQuestion.answer);
      const weight = parseFloat(weightQuestion.answer);

      if (!isNaN(height) && !isNaN(weight) && height > 0) {
        // BMI calculation: (weight in pounds / (height in inches)^2) * 703
        const bmi = (weight / (height * height)) * 703;

        setEvaluateAnswersData((prev) => ({
          ...prev,
          bmi: Number(bmi.toFixed(1)),
        }));

        setGroupedData((prev) => ({
          ...prev,
          bmi: Number(bmi.toFixed(1)), // Add BMI to groupedData
        }));

        // console.log(groupedData, 'groupedData in BMI')
      }
    }
  };
  // Add this new function after calculateBMI function
  const handleZipcodeChange = async (zipCode, questionId, sectionId) => {
    // Update the form data first
    handleInputChange(questionId, zipCode, sectionId, "Zip Code");
    // Clear previous API error
    // setApiError("");
    // Update contact data
    setcontactData(prev => ({
      ...prev,
      zipCode: zipCode,
      city: "",
      state: ""
    }));

    // If zipcode is 5 digits, fetch radius-based study centers first, then city and state
    if (isValidZipCode(zipCode)) {
      try {
        // First call: Get radius-based study centers
        const radiusResponse = await getRadiusBasedStudyCenter(zipCode).unwrap();

        // Update studyCenterId with the id from radius-based study center response
        if (radiusResponse?.data?.id) {
          setEvaluateAnswersData(prev => ({
            ...prev,
            studyCenterId: radiusResponse?.data?.id
          }));
        }

        // Second call: Get state and city (existing flow)
        const response = await getStateCityByZipcode(zipCode).unwrap();
        if (response?.status === 200 && response?.data) {
          setcontactData(prev => ({
            ...prev,
            city: response.data.city,
            state: response.data.state
          }));

          // ADD THESE LINES - Update groupedData with city and state
          const currentSectionQuestions = sectionQuestions?.data?.sections.find(s => s.sectionId === sectionId)?.questions || [];
          const cityQuestion = currentSectionQuestions.find(q => q.title === "City");
          const stateQuestion = currentSectionQuestions.find(q => q.title === "State");

          setGroupedData(prevData => {
            const updatedData = [...prevData.data];

            if (cityQuestion) {
              const cityIndex = updatedData.findIndex(item => item.questionId === cityQuestion.questionId);
              if (cityIndex !== -1) {
                updatedData[cityIndex].answer = response.data.city;
              } else {
                updatedData.push({ questionId: cityQuestion.questionId, answer: response.data.city });
              }
            }

            if (stateQuestion) {
              const stateIndex = updatedData.findIndex(item => item.questionId === stateQuestion.questionId);
              if (stateIndex !== -1) {
                updatedData[stateIndex].answer = response.data.state;
              } else {
                updatedData.push({ questionId: stateQuestion.questionId, answer: response.data.state });
              }
            }

            return { ...prevData, sectionId: sectionId, data: updatedData };
          });
        }
      } catch (error) {
        console.log("Error fetching city and state:", error);

        // Handle API validation errors
        if (error?.data?.status === 400 && error?.data?.message) {
          // setApiError(error.data.message);
        } else {
          // setApiError("Error fetching location data. Please try again.");
        }

        // Clear city and state if zipcode is not valid but has some input
        if (zipCode.length > 0) {
          setcontactData(prev => ({
            ...prev,
            city: "",
            state: ""
          }));
        }
      }
    }
  };
  // Replace the existing handleInputChange function
  const handleInputChange = (questionId, value, sectionId, title) => {
    if (!state?.userLocation && title === "Zip Code") {
      setEvaluateAnswersData((prev) => ({
        ...prev,
        userZipcode: value,
      }));
    }

    // Don't allow manual changes to City and State - they should be auto-filled
    if (title === "City" || title === "State") {
      return; // Exit early, don't update these fields manually
    }

    setValidationError(""); // Clear validation error when user makes changes
    setGroupedData((prevData) => {
      const updatedData = [...prevData.data];
      const questionIndex = updatedData.findIndex(
        (item) => item.questionId === questionId
      );

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
    const currentSectionQuestions =
      sectionQuestions?.data?.sections[currentStep - 1]?.questions || [];
    const currentSectionId =
      sectionQuestions?.data?.sections[currentStep - 1]?.sectionId;

    // Check if sectionId matches
    if (groupedData.sectionId !== currentSectionId) {
      setValidationError("Please complete all questions in this section.");
      return false;
    }

    // Check if all questions have answers
    for (const question of currentSectionQuestions) {
      if (
        question.title === "Zip Code" &&
        evaluateAnswersData.userZipcode !== ""
      ) {
        const questionAnswer = groupedData.data.find(
          (item) => item.questionId === question.questionId
        );
        const zip =
          questionAnswer?.answer || evaluateAnswersData.userZipcode || "";
        if (!isValidZipCode(zip)) {
          setValidationError("Please enter a valid 5-digit Zip Code.");
          return false;
        }
        continue;
      }

      // ADD THESE LINES - Skip validation for City and State as they're auto-filled
      if (question.title === "City" || question.title === "State") {
        const questionAnswer = groupedData.data.find(
          (item) => item.questionId === question.questionId
        );
        if (!questionAnswer || questionAnswer.answer === "") {
          setValidationError("Please enter a valid US Zip code.");
          return false;
        }
        continue;
      }

      // Height validation
      if (question.title === "How tall are you? (inches)") {
        const questionAnswer = groupedData.data.find(
          (item) => item.questionId === question.questionId
        );

        if (!questionAnswer || questionAnswer.answer === "") {
          setValidationError("Please complete all questions in this section.");
          return false;
        }

        const height = parseInt(questionAnswer.answer);
        if (isNaN(height) || height < 48 || height > 95) {
          setValidationError("Height must be between 48 and 95 inches.");
          return false;
        }
        continue;
      }

      const questionAnswer = groupedData.data.find(
        (item) => item.questionId === question.questionId
      );
      // If answer doesn't exist or is empty string
      if (!questionAnswer || questionAnswer.answer === "") {
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

      const response = await addAnswersOfSections(groupedData).unwrap();

      const currentAnswers = Array.isArray(evaluateAnswersData.answers)
        ? evaluateAnswersData.answers
        : [];
      const responseData = Array.isArray(response?.data) ? response.data : [];

      // Create updated answers array
      const updatedAnswers = [...currentAnswers, ...responseData];

      setEvaluateAnswersData((prev) => {
        return {
          ...prev,
          answers: updatedAnswers,
        };
      });

      setGroupedData({
        sectionId: "",
        data: [],
        batchNo: batchNumber,
      });

      if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
      else {
        setSubmitForm(true);
      }

      return updatedAnswers;
    } catch (error) {
      console.log(error, "error");
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
          answers: latestAnswers,
        };

        // Uncomment the line below to actually submit the data
        const response = await evaluateAnswers(
          evaluateAnswersDataForm
        ).unwrap();

        // Store the complete response in state
        setEvaluateResponse(response);

        // Console log the full response
        console.log("Full Evaluate Response:", response);
        console.log(
          "response",
          response?.result?.data?.preScreenerResult,
          "response"
        );
        if (response?.result) {
          setQualificationStatus(response.result);
          // if (response?.result?.data?.preScreenerResult?.isAnswersPassed) {
          //   if (
          //     response?.result?.data?.preScreenerResult?.isUserZipcodeInRadius
          //   ) {
          //     navigate("/prescreen/ps", { replace: true });
          //   } else {
          //     navigate("/prescreen/pns", { replace: true });
          //   }
          // } else {
          //   navigate("/prescreen/dq", { replace: true });
          // }
        }
      }
    } catch (error) {
      console.log("Submit error:", error);
    }
  };

  const questionDivision = sectionQuestions?.data?.sections?.map((section) => {
    // Reorder questions: Zip Code first, then State, then City, then others
    const reorderedQuestions = [...section.questions].sort((a, b) => {
      if (a.title === "Zip Code") return -1;
      if (b.title === "Zip Code") return 1;
      if (a.title === "City") return -1;
      if (b.title === "City") return 1;
      if (a.title === "State") return -1;
      if (b.title === "State") return 1;
      return 0;
    });

    return (
      <div
        key={section.sectionId}
        className="flex gap-4 lg:items-center sm:items-start items-start lg:flex-row md:flex-row sm:flex-col flex-col"
      >
        {reorderedQuestions.map((question) => {
          switch (question.type) {
            case "TextBox":
              return (
                <div
                  className="flex lg:w-1/2 md:w-1/3 sm:w-100 w-50 flex-col"
                  key={question.questionId}
                >
                  <label className="text-sm font-normal text-start mb-1 text-[#39394A] font-relay">
                    {question.title}
                  </label>
                  <input
                    placeholder={question.meta.placeholder}
                    type="text"
                    value={
                      question.title === "City"
                        ? contactData.city
                        : question.title === "State"
                          ? contactData.state
                          : groupedData.data.find(
                            (item) => item.questionId === question.questionId
                          )?.answer || ""
                    }
                    onChange={(e) =>
                      handleInputChange(
                        question.questionId,
                        e.target.value,
                        section.sectionId,
                        question.title
                      )
                    }
                    disabled={question.title === "City" || question.title === "State"}
                    className={`border w-full border-gray-200 rounded-lg px-3 !h-[50px] outline-none ${(question.title === "City" || question.title === "State")
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                      }`}
                  />
                </div>
              );
            case "NumericBox":
              return (
                <div
                  className="flex lg:w-1/4 md:w-1/3 sm:w-100 w-50 flex-col"
                  key={question.questionId}
                >
                  <label className="text-sm font-normal text-start mb-1 text-[#39394A] font-relay">
                    {question.title}
                  </label>
                  <input
                    placeholder={question.meta.placeholder}
                    type="number"
                    maxLength={question.title === "Zip Code" ? 5 : undefined}
                    value={
                      question.title === "Zip Code"
                        ? groupedData.data.find(
                          (item) => item.questionId === question.questionId
                        )?.answer ||
                        state?.userLocation ||
                        ""
                        : groupedData.data.find(
                          (item) => item.questionId === question.questionId
                        )?.answer || ""
                    }
                    onChange={(e) => {
                      if (question.title === "Zip Code") {
                        // Restrict to 5 digits only
                        const value = e.target.value.slice(0, 5);
                        if (/^\d*$/.test(value)) {
                          handleZipcodeChange(value, question.questionId, section.sectionId);
                        }
                      } else {
                        if (
                          question.title === "How tall are you? (inches)" &&
                          e.target.value.includes(".")
                        ) {
                          return;
                        }
                        handleInputChange(
                          question.questionId,
                          e.target.value,
                          section.sectionId,
                          question.title
                        );
                      }
                    }}
                    onKeyDown={(e) => {
                      // Prevent decimal point for height input
                      if (
                        question.title === "How tall are you? (inches)" &&
                        e.key === "."
                      ) {
                        e.preventDefault();
                      }
                    }}
                    className="border border-gray-200 rounded-lg px-3 !h-[50px] outline-none"
                    readOnly={
                      question.title === "Zip Code" && state?.userLocation
                    }
                  />
                </div>
              );
            // ... rest of the cases remain the same
            case "DropDown":
              return (
                <div
                  className="flex flex-col lg:w-1/4 md:w-1/3 sm:w-100 w-50"
                  key={question.questionId}
                >
                  <label className="text-sm font-normal text-[#39394A] font-relay text-start mb-1">
                    {question.title}
                  </label>
                  <select
                    value={
                      groupedData.data.find(
                        (item) => item.questionId === question.questionId
                      )?.answer || ""
                    }
                    onChange={(e) =>
                      handleInputChange(
                        question.questionId,
                        e.target.value,
                        section.sectionId,
                        question.title
                      )
                    }
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
                <div className="flex flex-col w-full" key={question.questionId}>
                  <label className="lg:text-lg md:text-[16px] sm:text-sm text-sm font-normal text-start text-[#39394A] font-relay mb-1">
                    {question.title}
                  </label>
                  <div className="flex text-[#39394A] font-relay items-center justify-between lg:w-[150px] sm:w-[100px] w-[100px] mt-[30px] mb-2 gap-5">
                    {question.meta.options.map((option) => (
                      <div
                        className="flex lg:items-center sm:items-start items-start gap-2"
                        key={option._id}
                      >
                        <input
                          id={`radio-${question.questionId}-${option._id}`}
                          type="radio"
                          value={option.value}
                          checked={
                            groupedData.data.find(
                              (item) => item.questionId === question.questionId
                            )?.answer === option.value
                          }
                          onChange={(e) =>
                            handleInputChange(
                              question.questionId,
                              e.target.value,
                              section.sectionId,
                              question.title
                            )
                          }
                          style={{
                            accentColor: "#00B4F1",
                            height: "20px",
                            width: "20px",
                            cursor: 'pointer'
                          }}
                        />
                        <label
                          htmlFor={`radio-${question.questionId}-${option._id}`}
                          className="lg:text-lg md:text-[16px] sm:text-sm text-sm"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  });

  useEffect(() => {
    if (latesBatchNo?.data?.latestBatchNo !== undefined) {
      const calculatedBatchNumber = latesBatchNo.data.latestBatchNo + 1;
      setGroupedData((prev) => ({
        ...prev,
        batchNo: calculatedBatchNumber,
      }));
    }
  }, [latesBatchNo]);

  // Populate city and state from center data when navigating from map
  useEffect(() => {
    if (state?.center && sectionQuestions?.data?.sections) {
      const center = state.center;

      // Update contactData with city and state from center
      setcontactData(prev => ({
        ...prev,
        city: center.city || "",
        state: center.state || "",
        zipCode: prev.zipCode || center.zipCode || ""
      }));

      // Find questions that need to be populated across all sections
      sectionQuestions.data.sections.forEach(section => {
        const cityQuestion = section.questions.find(q => q.title === "City");
        const stateQuestion = section.questions.find(q => q.title === "State");

        if (cityQuestion || stateQuestion) {
          setGroupedData(prevData => {
            const updatedData = [...(prevData.data || [])];

            if (cityQuestion && center.city) {
              const cityIndex = updatedData.findIndex(item => item.questionId === cityQuestion.questionId);
              if (cityIndex !== -1) {
                updatedData[cityIndex].answer = center.city;
              } else {
                updatedData.push({ questionId: cityQuestion.questionId, answer: center.city });
              }
            }

            if (stateQuestion && center.state) {
              const stateIndex = updatedData.findIndex(item => item.questionId === stateQuestion.questionId);
              if (stateIndex !== -1) {
                updatedData[stateIndex].answer = center.state;
              } else {
                updatedData.push({ questionId: stateQuestion.questionId, answer: center.state });
              }
            }

            return { ...prevData, data: updatedData };
          });
        }
      });
    }
  }, [state?.center, sectionQuestions?.data?.sections]);

  // Set the sectionId when data is populated from center selection
  useEffect(() => {
    if (state?.center && sectionQuestions?.data?.sections && groupedData.data.length > 0 && !groupedData.sectionId) {
      // Find the current section ID
      const currentSectionId = sectionQuestions?.data?.sections[currentStep - 1]?.sectionId;
      if (currentSectionId) {
        setGroupedData(prev => ({
          ...prev,
          sectionId: currentSectionId
        }));
      }
    }
  }, [state?.center, sectionQuestions?.data?.sections, groupedData.data, currentStep, groupedData.sectionId]);
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

  console.log(qualificationStatus, 'qualificationStatus')
  if (isLoading || BatchNoLoader)
    return (
      <div className="fixed left-0 top-0 z-[11111] w-full h-[100vh] flex items-center justify-center bg-gray-50">
        <div className="flex space-x-2 justify-center items-center h-16">
          <div className="w-4 h-4 bg-[#0092b8] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-4 h-4 bg-[#0092b8] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-4 h-4 bg-[#0092b8] rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  const handleGoToHome = () => {
    navigate("/");
  };
  // console.log(state, 'state')
  // console.log(evaluateAnswersData, 'evaluateAnswersData')
  // console.log(contactData, 'contactData')
  return (
    <div className="flex flex-col items-center">
      <div className="container mx-auto lg:px-0 md:px-6 px-6">
        <div className="text-center">
          <Header isQualified={submitForm} />
          <div className="bg-white shadow-lg rounded-xl w-full h-auto p-10 border border-[#DDE2E5]">
            <ProgressStepper submitForm={submitForm} />
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
                        className="bg-[#00B4F1] h-12 text-white rounded-full cursor-pointer"
                        type="button"
                        onClick={handleSubmit}
                        disabled={evaluateAnswersLoader || addAnswersLoader}
                      >
                        {evaluateAnswersLoader ? <LoaderCenter color="white" size='30' /> : "Submit"}
                      </Button>
                    ) : (
                      <Button
                        disabled={addAnswersLoader}
                        className="bg-[#00B4F1] h-12 text-white rounded-full cursor-pointer"
                        onClick={handleNext}
                        type="button"
                      >
                        {addAnswersLoader ? <LoaderCenter color="white" size='30' /> : "Next"}
                      </Button>
                    )}
                  </div>
                </form>
              </>
            ) : (
              qualificationStatus !== null && (
                <QualificationResult
                  isQualified={
                    qualificationStatus?.data?.preScreenerResult
                      ?.isAnswersPassed
                  }
                  isStudyCenterInRadius={
                    qualificationStatus?.data?.preScreenerResult
                      ?.isUserZipcodeInRadius
                  }
                  reportId={qualificationStatus?.data?.reportId}
                  studyName="HYDRAFIL-D"
                  contactData={contactData}
                />
              )
            )}
          </div>
          <div className="mt-5 flex justify-end items-end">
            {/* <Link
              className="px-4 py-2 text-[#00B4F1] rounded-full hover:underline transition-colors font-medium cursor-pointer flex gap-1 items-center"
              onClick={handleGoToHome}
            >
              <IoIosArrowRoundBack size={20} />
              Back to Website
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleScreener;
