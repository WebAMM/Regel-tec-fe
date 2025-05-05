import React, { useState } from "react";
import { Button, Input, Typography, Radio } from "@material-tailwind/react";
import { FaCheck } from "react-icons/fa";
import circleCheck from "../../assets/images/check-circle.png";
import { useNavigate } from "react-router-dom";
const Prescreener = () => {
  const totalSteps = 5;
  const [currentStep, setCurrentStep] = useState(1);
  const [submitForm, setSubmitForm] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    zip: "",
    q1: "", // Age range
    q2: "", // Chronic pain
    q3: "", // Surgery
    gender: "Male", // Default value
    height: "",
    weight: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const CustomProgress = ({ value, total }) => {
    const percent = (value / total) * 100;
    return (
      <div className="w-full bg-[#00B4F11A] rounded-full h-2 mb-6">
        <div
          className="bg-[#00B4F1] h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    );
  };

  const questions = [
    {
      key: "location",
      render: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col">
            <label className="text-sm font-normal text-gray-700 text-start mb-1">
              City
            </label>
            <Input
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="border border-gray-200 rounded-lg px-3 !h-[50px]  outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-normal text-gray-700 text-start mb-1">
              State
            </label>
            <Input
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="border border-gray-200 rounded-lg px-3 !h-[50px] outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-normal text-gray-700 text-start mb-1">
              Zip Code
            </label>
            <Input
              value={formData.zip}
              onChange={(e) => handleChange("zip", e.target.value)}
              className="border border-gray-200 rounded-lg px-3 !h-[50px] outline-none"
            />
          </div>
        </div>
      ),
    },
    {
      key: "q1",
      render: (
        <div className="flex flex-col items-start mb-6">
          <Typography className="mb-2 text-gray-800">
            Are you between 22 and 85 years old?
          </Typography>
          <div className="flex gap-4">
            <Radio
              name="q1"
              label="Yes"
              checked={formData.q1 === "yes"}
              onChange={() => handleChange("q1", "yes")}
            />
            <Radio
              name="q1"
              label="No"
              checked={formData.q1 === "no"}
              onChange={() => handleChange("q1", "no")}
            />
          </div>
        </div>
      ),
    },
    {
      key: "q2",
      render: (
        <div className="flex flex-col items-start mb-6">
          <Typography className="mb-2 text-gray-800">
            Have you been suffering from chronic low back pain for at least 6
            months?
          </Typography>
          <div className="flex gap-4">
            <Radio
              name="q2"
              label="Yes"
              checked={formData.q2 === "yes"}
              onChange={() => handleChange("q2", "yes")}
            />
            <Radio
              name="q2"
              label="No"
              checked={formData.q2 === "no"}
              onChange={() => handleChange("q2", "no")}
            />
          </div>
        </div>
      ),
    },
    {
      key: "q3",
      render: (
        <div className="flex flex-col items-start mb-6">
          <Typography className="mb-2 text-gray-800">
            Have you had any back surgery on the lumbar spine (lower back)?
          </Typography>
          <div className="flex gap-4">
            <Radio
              name="q3"
              label="Yes"
              checked={formData.q3 === "yes"}
              onChange={() => handleChange("q3", "yes")}
            />
            <Radio
              name="q3"
              label="No"
              checked={formData.q3 === "no"}
              onChange={() => handleChange("q3", "no")}
            />
          </div>
        </div>
      ),
    },
    {
      key: "bodyinfo",
      render: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-start">
            <label className="text-sm text-gray-700 mb-1">Gender</label>
            <select
              className="border border-gray-200 w-full rounded-lg px-3 h-[50px] outline-none"
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-col items-start">
            <label className="text-sm text-gray-700 mb-1">
              How tall are you? (inches)
            </label>
            <Input
              className="border border-gray-200 rounded-lg px-3 !h-[50px] outline-none"
              value={formData.height}
              onChange={(e) => handleChange("height", e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="text-sm text-gray-700 mb-1">
              How much do you weigh? (pounds)
            </label>
            <Input
              className="border border-gray-200 rounded-lg px-3 !h-[50px] outline-none"
              value={formData.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
            />
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
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

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        <div className="text-center">
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
          <Typography
            variant="paragraph"
            className="mb-12 text-lg font-normal text-gray-700 max-w-4xl mx-auto"
          >
            To see if you might qualify for the study, we need to ask you 8
            quick questions. If you pass the pre-screener and appear to
            prequalify, you can submit your contact information to the local
            study center. A study representative may contact you to tell you
            more about the study, ask you more questions, answer your questions,
            and possibly schedule an office visit.
          </Typography>

          <div className="bg-white shadow-lg rounded-xl w-full p-8">
            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="text-center">
                <div className="rounded-full bg-[#00B4F1] text-white w-6 h-6 mx-auto flex items-center justify-center p-1">
                  <FaCheck />
                </div>
                <Typography variant="small" className="text-[#00B4F1]">
                  Select Location
                </Typography>
              </div>
              <div className="w-24 mb-2 h-1 bg-[#00B4F1] rounded"></div>

              <div className="text-center">
                <div className="rounded-full border border-[#00B4F1] flex items-center justify-center w-6 h-6 mx-auto">
                  <div className="w-3 h-3 bg-[#00B4F1] rounded-full"></div>
                </div>
                <Typography variant="small" className="text-[#00B4F1]">
                  Pre-Screener
                </Typography>
              </div>
              <div className="w-24 mb-2 h-1 bg-[#00B4F1] rounded"></div>

              <div className="text-center">
                <div className="rounded-full bg-blue-100 w-6 h-6 mx-auto"></div>
                <Typography variant="small" className="text-gray-400">
                  Contact Info
                </Typography>
              </div>
            </div>
            {!submitForm ? (
              <>
                {" "}
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
                {questions[currentStep - 1].render}
                <div className="flex gap-4 mt-4 justify-start">
                  {currentStep > 1 && (
                    <Button
                      variant="outlined"
                      className="h-12 border-[#] text-[#00B4F1] rounded-full"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    className="bg-[#00B4F1] h-12 text-white rounded-full"
                    onClick={handleNext}
                  >
                    {currentStep === totalSteps ? "Submit" : "Next"}
                  </Button>
                </div>{" "}
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
