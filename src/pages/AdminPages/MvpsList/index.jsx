import { Button } from "@material-tailwind/react";
import React from "react";
import { LuSearch } from "react-icons/lu";
import filterIcon from "../../../assets/images/filter.png";
import { MdOutlineFileDownload } from "react-icons/md";
import { SharedTable } from "../../../components";

const mvpColumns = [
    { key: "mvpId", label: "MVP ID" },
    { key: "name", label: "Name" },
    { key: "contact", label: "Contact Number" },
    { key: "email", label: "Email" },
    { key: "zip", label: "Zip Code" },
    { key: "submittedDate", label: "Submitted Date" },
    { key: "studyCenter", label: "Study Center" },
  ];
  
const mvpData = [
    {
      mvpId: "345",
      name: "John Doe",
      contact: "123-456-7890",
      email: "johndoe@gmail.com",
      zip: "10001",
      submittedDate: "Jan 15, 2024",
      studyCenter: "Assigned",
    },
    {
      mvpId: "345",
      name: "John Doe",
      contact: "123-456-7890",
      email: "johndoe@gmail.com",
      zip: "10001",
      submittedDate: "Jan 15, 2024",
      studyCenter: "Assigned",
    },
    {
      mvpId: "345",
      name: "John Doe",
      contact: "123-456-7890",
      email: "johndoe@gmail.com",
      zip: "10001",
      submittedDate: "Jan 15, 2024",
      studyCenter: "Awaiting",
    },
    {
      mvpId: "345",
      name: "John Doe",
      contact: "123-456-7890",
      email: "johndoe@gmail.com",
      zip: "10001",
      submittedDate: "Jan 15, 2024",
      studyCenter: "Assigned",
    },
    {
      mvpId: "345",
      name: "John Doe",
      contact: "123-456-7890",
      email: "johndoe@gmail.com",
      zip: "10001",
      submittedDate: "Jan 15, 2024",
      studyCenter: "Assigned",
    },
    {
      mvpId: "345",
      name: "John Doe",
      contact: "123-456-7890",
      email: "johndoe@gmail.com",
      zip: "10001",
      submittedDate: "Jan 15, 2024",
      studyCenter: "Awaiting",
    },
    {
      mvpId: "345",
      name: "John Doe",
      contact: "123-456-7890",
      email: "johndoe@gmail.com",
      zip: "10001",
      submittedDate: "Jan 15, 2024",
      studyCenter: "Assigned",
    },
    {
      mvpId: "345",
      name: "John Doe",
      contact: "123-456-7890",
      email: "johndoe@gmail.com",
      zip: "10001",
      submittedDate: "Jan 15, 2024",
      studyCenter: "Awaiting",
    },
    {
      mvpId: "345",
      name: "John Doe",
      contact: "123-456-7890",
      email: "johndoe@gmail.com",
      zip: "10001",
      submittedDate: "Jan 15, 2024",
      studyCenter: "Assigned",
    },
  ];
  
const MvpsList = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className="relative min-w-[400px] max-w-[400px]">
          <input
            type="text"
            className="border-[1px] border-[#B2B2B25E] px-[10px] ps-[30px] w-full h-[50px] rounded-[12px]"
            placeholder="search By Name..."
          />
          <LuSearch className="absolute top-[18px] left-[8px]" />
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outlined"
            className="h-[50px] border-[#A2A1A833] text-[#000] rounded-[12px] flex items-center gap-2"
          >
            <img src={filterIcon} alt="" />
            Filter
          </Button>
          <Button className="bg-[#A2A1A833] border-[1px] border-[#A2A1A833] shadow-none  h-[50px] text-[#000000] rounded-[12px] rounded-[12px] flex items-center gap-2">
            <MdOutlineFileDownload />
            Export
          </Button>
        </div>
      </div>
      <SharedTable columns={mvpColumns} data={mvpData} total={60} />

    </>
  );
};

export default MvpsList;
