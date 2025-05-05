import { Button } from "@material-tailwind/react";
import React from "react";
import { GoPlusCircle } from "react-icons/go";
import { LuSearch } from "react-icons/lu";
import filterIcon from "../../../assets/images/filter.png";
import { SharedTable } from "../../../components";
import { useNavigate } from "react-router-dom";

const questionColumns = [
  { key: "sectionId", label: "Section ID" },
  { key: "question", label: "Question" },
  { key: "type", label: "Type" },
  { key: "status", label: "Status" },
];

const questionData = [
  {
    sectionId: "001",
    question: "City",
    type: "Input",
    status: "Active",
  },
  {
    sectionId: "001",
    question: "State",
    type: "Input",
    status: "Active",
  },
  {
    sectionId: "001",
    question: "Zip Code",
    type: "Input",
    status: "Active",
  },
  {
    sectionId: "002",
    question: "Are you between 22 and 85 years old?",
    type: "Yes/No",
    status: "Inactive",
  },
  {
    sectionId: "003",
    question:
      "Have you been suffering from chronic low back pain for at least 6 months?",
    type: "Yes/No",
    status: "Active",
  },
  {
    sectionId: "004",
    question: "Have you had any back surgery on the lumbar spine (lower back)?",
    type: "Yes/No",
    status: "Active",
  },
  {
    sectionId: "005",
    question: "Gender",
    type: "Input",
    status: "Active",
  },
  {
    sectionId: "005",
    question: "How tall are you? (inches)",
    type: "Input",
    status: "Inactive",
  },
  {
    sectionId: "005",
    question: "How much do you weigh? (pounds)",
    type: "Input",
    status: "Inactive",
  },
  {
    sectionId: "006",
    question:
      "Do you smoke cigarettes or are you a nicotine and/or tobacco user?",
    type: "Yes/No",
    status: "Active",
  },
  {
    sectionId: "007",
    question:
      "Do you have insulin-dependent diabetes mellitus (Type 1 diabetes)?",
    type: "Yes/No",
    status: "Inactive",
  },
  {
    sectionId: "008",
    question: "Have you had an MRI in the last 6 months?",
    type: "Yes/No",
    status: "Active",
  },
];
const PreScreenerList = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="relative min-w-[400px] max-w-[400px]">
            <input
              type="text"
              className="border-[1px] border-[#B2B2B25E] px-[10px] ps-[30px] w-full h-[50px] rounded-[12px]"
              placeholder="search By Name..."
            />
            <LuSearch className="absolute top-[18px] left-[8px]" />
          </div>
          <Button
            variant="outlined"
            className="h-[50px] border-[#A2A1A833] text-[#000] rounded-[12px] flex items-center gap-2"
          >
            <img src={filterIcon} alt="" />
            Filter
          </Button>
        </div>
        <Button
          onClick={() => navigate("/admin/add-prescreener")}
          className="bg-[#00B4F1] h-[50px] text-white rounded-[12px] rounded-[12px] flex items-center gap-2"
        >
          <GoPlusCircle />
          Add New Question
        </Button>
      </div>

      <SharedTable columns={questionColumns} data={questionData} total={60} />
    </>
  );
};

export default PreScreenerList;
