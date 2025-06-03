import React from "react";
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
    description: `Based on your responses to this initial questionnaire, it appears you may qualify for the ${studyName} research  study. The final decision will be made by the local study doctor. Please click Next to enter your contact  information so someone from the local study center can contact you.`,
    image: circleCheck,
    buttonText: "Next",
    buttonAction:
      onNext ||
      (() =>
        navigate("/contact", {
          state: {
            reportId: reportId,
            contactData: contactData,
            isStudyCenterInRadius: isStudyCenterInRadius,
            isQualified: isQualified,
          },
        })),
  };

  const nonQualifiedContent = {
    title: "We’re sorry. You do not qualify.",
    description: `Thank you for your interest in the HYDRAFIL-D research study. We’re sorry, but based on your responses  you do not qualify for this study. <br   /> <div style="margin-top: 1rem; color: #39394A;">If you are interested in learning more about other clinical research opportunities, please visit  <span style="color: #00B4F1;"><a href="http://www.clinicaltrials.gov/" target="_blank">www.clinicaltrials.gov</a> </span></div>`,
    image: circleCheck,
    buttonText: "Back to Home",
    buttonAction:
      onNext || (() => navigate("/", { state: { reportId: reportId } })),
  };
  const studyCenterNotFoundContent = {
    title: "We’re sorry. There is no study center close enough to you.",
    description: `Thank you for your interest in the HYDRAFIL-D research study. Based on your responses to this initial questionnaire, it appears you may qualify for this study; however, no local study center is available in your area at this time.<div style="margin-top: 15px">Please check back to this study website regularly for updates on new study locations that may be opening in the future. You may be able</div> to participate if a new local study center location opens near you.<div style="margin-top: 0.7rem;">If you still wish to leave your contact information, please click Next to enter your contact information. You will not be contacted by a local  study center at this time. However, should a study center open in your area in the future, we may share your contact information with their research staff.`,
    image: circleCheck,
    buttonText: "Next",
    buttonAction:
      onNext ||
      (() =>
        navigate("/contact", {
          state: {
            contactData: contactData,
            isStudyCenterInRadius: isStudyCenterInRadius,
            isQualified: isQualified,
          },
        })),
  };

  let content = "";
  if (isQualified === true) {
    if (isStudyCenterInRadius === true) {
      content = qualifiedContent;
    } else {
      content = studyCenterNotFoundContent;
    }
  } else {
    content = nonQualifiedContent;
  }
  // console.log(reportId, 'reportId')
  return (
    <div className="">
      <div className="flex justify-center">
        <img
          src={content.image}
          alt={isQualified ? "Qualification Check" : "Non-Qualification"}
        />
      </div>
      <Typography
        variant="h3"
        className="my-4 lg:text-[28px] md:text-2xl sm:text-xl text-xl font-bold text-[#121229]"
      >
        {content.title}
      </Typography>
      <Typography
        variant="paragraph"
        className="mb-8 lg:text-[16px]  md:text-[16px] sm:text-sm text-sm font-normal text-[#39394A] max-w-5xl mx-auto"
      >
        <span dangerouslySetInnerHTML={{ __html: content.description }} />
      </Typography>
      <Button
        className="bg-[#00B4F1] text-white rounded-full px-[35px] capitalize text-[16px] font-medium cursor-pointer mt-3"
        onClick={content.buttonAction}
      >
        {content.buttonText}
      </Button>
    </div>
  );
};

export default QualificationResult;
