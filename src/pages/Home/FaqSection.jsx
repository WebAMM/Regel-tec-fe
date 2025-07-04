import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FaAngleUp } from "react-icons/fa";
import { IoChevronDownSharp } from "react-icons/io5";

const FaqSection = ({ openReGelTecFaq, openHydrafil }) => {
  const [open, setOpen] = useState(null);

  const handleOpen = (value) => setOpen(open === value ? null : value);
  useEffect(() => {
    if (openReGelTecFaq) {
      setOpen(2); // Index 2 is "What is ReGelTec?" question
    }
  }, [openReGelTecFaq]);
  useEffect(() => {
    if (openHydrafil) {
      setOpen(1); // Index 1 is "What is HydraPhil" question
    }
  }, [openHydrafil]);
  const faqs = [
    {
      question: "Why participate in a research study?",
      answer: `Many people participate in research studies every year. By participating in a research study, you will be contributing to advancements that may help you as well as future generations. Only you can decide if participating in a research study is right for you.\n\nParticipating in a research study is completely voluntary. You should only make your decision after you have learned about the study, have had all your questions answered, and have been thoroughly informed about the risks and possible benefits.\n\nIf you decide to participate in this study – or any research study – you are free to withdraw at any time and for any reason.`,
    },
    {
      question: "What is HYDRAFIL®?",
      answer: `<a href='https://regeltec.com/hydrafil/' target="_blank" class="text-[#00B4F1]">HYDRAFIL</a> is an injectable spinal implant for minimally invasive treatment of chronic low back pain from degenerative disc disease. It is a proprietary hydrated polymer gel (hydrogel) technology that, when heated, becomes a liquid that can be injected through a needle directly into the nucleus of a degenerated lumbar disc in your spine. Once it enters the body, the gel cools to form an integrated solid implant within the disc, forming a soft, space-filling implant that mimics the same properties of the natural disc and works to preserve spinal motion. The HYDRAFIL implant is designed to supplement and reinforce the interior of the degenerated disc (disc augmentation) without requiring the destruction or removal of any existing disc material.<div style="margin-top: 10px">HYDRAFIL is an investigational device. It is limited by federal (or United States) law to investigational use.</div>`,
    },
    {
      question: "What is ReGelTec?",
      answer: `<a href='https://regeltec.com/' target="_blank" class="text-[#00B4F1]">ReGelTec, Inc.</a> is a clinical stage medical device company developing the next generation of minimally invasive spinal implants for chronic lower back pain due to degenerative disc disease. ReGelTec is the Sponsor of the HYDRAFIL-D research study.`,
    },
    {
      question: "How do I know if I qualify?",
      answer: `The first step is to complete the pre-screener on this website to see if you might be eligible. If you pass the pre-screener, you <i>may</i> qualify for the study. If you pass the pre-screener and an active study center is available in your local area, your information will be provided to the research staff at the local study center. Someone from the study center may contact you to tell you more about the study, ask you more questions, answer your questions, and possibly schedule an office visit. You can only know <i>definitively</i> if you qualify for the study through completing the screening process with the local study center. Passing the pre-screener does not guarantee that you will qualify for the study.`,
    },
    {
      question: "Why did you ask me if I have had an MRI?",
      answer: `While an MRI is not required at this early stage, an MRI can assist the research staff at the local study center to quickly determine if you are ineligible to participate or potentially eligible to participate. This review could save you time.`,
    },
    {
      question: "Who will be in charge of my care?",
      answer: `The spine specialist physician at the local study center (i.e., the local study doctor) will be in charge of your care as a participant in the HYDRAFIL-D research study.`,
    },
    {
      question: "What can I expect as a participant?",
      answer: `If you prequalify and elect to be screened for the study, you will be seen by a spine specialist physician and their research staff at a local study center to undergo a medical examination and various study-related evaluations. The first step to participation is the screening process, during which you will be examined and complete questionnaires, your medical records will be reviewed, and images of your spine will be taken.\n\nIf you complete the screening process and qualify for the study (i.e., you are determined to be eligible by the local study center), you will return to the local study center on the day of the investigational procedure and will be randomly assigned into one of two groups — you will receive either the HYDRAFIL implant (investigational group) or the control procedure (control group).\n\nFollowing the investigational treatment, there are post-treatment assessments consisting of medical examinations, imaging, and questionnaires that will occur at the local study center. All tests and assessments will be carried out the same way regardless of whether you are in the investigational group or control group. The study follow-up visits will be completed at 1 month, 3 months, 6 months, 12 months, and 24 months following the investigational treatment. Additionally, you may be asked to return annually thereafter for a maximum of 5 years post-treatment.\n\nThe complete schedule of screening and follow-up visits and assessments, and types of medical examinations and evaluations, will be explained to you by the research staff at the local study center before you have to commit to participating.`,
    },
    {
      question: "What happens if I am in the control group?",
      answer: `Throughout the course of this study, all study participants will continue to receive the ongoing medical care management (i.e., ‘standard-of-care’ treatment(s)) required and deemed necessary by the local study doctor to treat their chronic low back pain. Two of every three study participants will be randomly assigned to receive ongoing medical care plus the HYDRAFIL implant. One of every three will be randomly assigned to receive ongoing medical care plus the control procedure.\n\nIf you are randomly assigned to the control group, on the day of the investigational procedure, you will receive a procedure to mimic the investigational group. During this control procedure, the device needle will not be advanced as far, and no HYDRAFIL will be injected into your diseased disc.\n\nYou will not know whether you received HYDRAFIL or the control until the end of the study. All tests and assessments will be carried out the same way regardless of whether you are in the investigational group or control group. Both study groups return for study follow up and will complete all follow-up visit assessments exactly the same.\n\nAll participants will continue to receive any additional standard-of-care treatment(s) deemed necessary by their study doctor to treat their pain. Participation in this study and receiving the control procedure (or HYDRAFIL implant) does not stop you from also receiving treatment with other currently available options, if your pain persists following the investigational procedure.`,
    },
    {
      question: "What are the potential benefits of participating?",
      answer: `You may or may not receive any direct benefit to your health from taking part in this research study. Although HYDRAFIL is experimental and the benefit is unknown, the expectation is that the procedure may provide improvements in pain and function. A possible benefit to getting the HYDRAFIL implant is that your low back pain may be reduced and your function may improve.\n\nIf you are randomly assigned to the control group, you will not receive the HYDRAFIL implant, but you will continue to receive the ongoing medical care management (i.e., ‘standard-of-care’ treatment(s)) required to treat your chronic low back pain as directed by the local study doctor. Participation in this study and receiving the HYDRAFIL implant or the control procedure does not stop you from also receiving treatment with other currently available options, if your pain persists following the investigational procedure.\n\nYour participation in this study may contribute to a better understanding of the conditions of your back and potential treatments, which may help other patients in the future.`,
    },
    {
      question: "Why should I participate?",
      answer: `Individuals participate in clinical research for numerous reasons, including the opportunity to assume a more active role in their own healthcare, access to cutting-edge treatments when other therapies have failed, or a desire to contribute to medical research for future patients with the disease.\n\nHYDRAFIL is not approved in the United States. If you and your study doctor think that you might benefit from a minimally invasive hydrogel implant to augment the nucleus of your disc, the only way to potentially receive the HYDRAFIL implant in the United States at this time is to enroll in the HYDRAFIL-D research study.`,
    },
    {
      question: "Does it cost anything to participate?",
      answer: `There is no additional cost to you for taking part in this research study. Study-related medical care is provided to you at no cost, and you will not be billed for any clinic visits, treatments or procedures, directly related to the conduct of this study.\n\nYou and/or your health plan/insurance company may need to pay for some or all of the costs of treating your degenerative disc disease (DDD) (i.e., any other parts or services of your medical care management and treatments for your DDD that are considered routine, or ‘standard-of-care’).`,
    },
    {
      question: "Will I be paid to participate?",
      answer: `You will not be paid to participate in this research study. You may be reimbursed for study-related travel expenses. The research staff at the local study center will explain reimbursement options to you before you have to commit to participating.`,
    },
  ];

  return (
    <div className="mx-auto w-full py-4">
      {faqs.map((item, index) => (
        <Accordion className="mb-[18px]" key={index} open={open === index}>
          <AccordionHeader
            className="bg-[#E5F7FE] !border-none text-[#39394A] flex px-[30px] lg:h-[80px] md:h-[68px] h-[68px] rounded-t-[10px] cursor-pointer "
            onClick={() => handleOpen(index)}
          >
            <div className="flex items-center justify-between w-full ">
              <div className="lg:text-xl md:text-lg sm:text-sm text-sm font-[600] text-[#39394A]">
                {item?.question}
              </div>
            {open === index ? <FaAngleUp /> : <IoChevronDownSharp />}
            </div>
          </AccordionHeader>
          <AccordionBody className="px-8 pt-[0px] bg-[#E5F7FE] pb-6 rounded">
            <div
              className="lg:text-[16px] md:text-sm text-sm font-[400] text-[#39394A] font-relay"
              dangerouslySetInnerHTML={{
                __html: item?.answer.replace(/\n/g, "<br />"),
              }}
            ></div>
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
};

export default FaqSection;
