import React, { useState } from "react";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { FaAngleUp } from "react-icons/fa";

const FaqSection = () => {
  const [open, setOpen] = useState(null);

  const handleOpen = (value) => setOpen(open === value ? null : value);

  const faqs = [
    "Why participate in a research study?",
    "What is HYDRAFIL™?",
    "What is ReGelTec?",
    "How do I know if I qualify?",
    "Why did you ask me if I have had an MRI?",
    "Who will be in charge of my care?",
    "What can I expect as a participant?",
    "What happens if I am in the control group?",
    "What are the potential benefits of participating?",
    "Why should I participate?",
    "Does it cost anything to participate?",
    "Will I be paid to participate?",
  ];

  return (
    <div className="mx-auto w-full py-4">
      {faqs.map((question, index) => (
        <Accordion className="mb-[16px]" key={index} open={open === index}>
          <AccordionHeader
            className="bg-[#E5F7FE] text-[#39394A] flex  px-4 py-4 rounded cursor-pointer "
            onClick={() => handleOpen(index)}
          >
            <div className="flex items-center justify-between w-full">

            {question}
            <FaAngleUp />
            </div>
          </AccordionHeader>
          <AccordionBody className="px-4 py-2 bg-gray-50 text-gray-700">
            This is where the answer for "{question}" goes. Replace this with your actual content.
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
};

export default FaqSection;
