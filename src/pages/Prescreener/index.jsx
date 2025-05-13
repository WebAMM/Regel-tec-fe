import React, { useEffect, useState } from "react";
import { Button, Input, Typography, Radio } from "@material-tailwind/react";
import { FaCheck } from "react-icons/fa";
import circleCheck from "../../assets/images/check-circle.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllQuestionsForWebViewQuery, useGetAllQuestionsQuery } from "../../api/apiSlice";
import _ from 'lodash';
import CustomProgress from "./CustomProgress";
import { Field, Form, Formik } from "formik";
import Header from "./Header";
import ProgressStepper from "./ProgressStepper";
const Prescreener = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [groupedData, setGroupedData] = useState([]);

  const [submitForm, setSubmitForm] = useState(false);
  const { data: sectionQuestions, isLoading } = useGetAllQuestionsForWebViewQuery()

  const totalSteps = sectionQuestions?.data?.latestSectionOrder;
  const navigate = useNavigate();
  const { state } = useLocation()

  const evaluateAnswers = {
    answers: [],
    userZipcode: state?.center?.zipCode,
    studyCenterId: state?.center?.id,
    bmi: '',
  }

  const initialValues = {
    sectionId: "",
    // data: [
    //   {
    //     questionId: "",
    //     answer: ""
    //   },
    // ],
    batchNo: 12
  }


  const handleSubmit = (values) => {
    console.log('Form submitted with values:', values);
    // setSubmitForm(true);
  };



  const handleNext = () => {
    console.log(initialValues, 'initialValues')
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);

    else {
      // Handle form submission here
      setSubmitForm(true);
      // You could redirect or show a success message
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };
  const questionDivision = sectionQuestions?.data?.sections?.map((section, index) => (
    <div key={section.sectionId} className="flex  gap-4 items-center">
      {section.questions.map((question, questionIndex) => {
        switch (question.type) {
          case "TextBox":
            return (

              <div className="flex w-1/4 flex-col" key={question.questionId}>

                <label className="text-sm font-normal text-gray-700 text-start mb-1">{question.title}</label>
                <Field
                  name={`data[${index}].questions[${questionIndex}].answer`} // Dynamically name the field
                  placeholder={question.meta.placeholder}
                  type="text"
                  className="border w-full border-gray-200 rounded-lg px-3 !h-[50px] outline-none"
                />
              </div>
            );
          case "NumericBox":
            return (
              <div className="flex w-1/4 flex-col" key={question.questionId}>
                <label className="text-sm font-normal text-gray-700 text-start mb-1">{question.title}</label>
                <Field
                  name={`data[${index}].questions[${questionIndex}].answer`} // Dynamically name the field
                  placeholder={question.meta.placeholder}
                  type="number"
                  className="border border-gray-200 rounded-lg px-3 !h-[50px] outline-none"
                />
              </div>
            );
          case "DropDown":
            return (
              <div className="flex flex-col w-1/4" key={question.questionId}>
                <label className="text-sm font-normal text-gray-700 text-start mb-1">{question.title}</label>
                <Field
                  as="select"
                  name={`data[${index}].questions[${questionIndex}].answer`} // Dynamically name the field
                  className="border border-gray-200 rounded-lg px-3 !h-[50px] outline-none"
                >
                  {question.meta.options.map((option) => (
                    <option key={option._id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
              </div>
            );
          case "TrueFalse":
            return (
              <div className="flex flex-col w-1/4" key={question.questionId}>
                <label className="text-sm font-normal text-gray-700 text-start mb-1">{question.title}</label>
                {question.meta.options.map((option) => (
                  <div className="flex" key={option._id}>
                    <Field
                      type="radio"
                      name={`data[${index}].questions[${questionIndex}].answer`} // Dynamically name the field
                      value={option.value}
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

  // console.log(currentStep, 'currentStep')
  console.log(questionDivision, 'questionDivision')
  console.log(sectionQuestions, 'sectionQuestions')
  if (isLoading) return <div>loading...</div>
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
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                >
                  {() => (
                    <Form>
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
                            type="submit"
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
                    </Form>
                  )}
                </Formik>
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

export default Prescreener;
