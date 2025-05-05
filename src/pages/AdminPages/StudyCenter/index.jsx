import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import filterIcon from "../../../assets/images/filter.png";
import { GoPlusCircle } from "react-icons/go";
import { SharedTable } from "../../../components";
import AddStudyCenterModal from "./AddStudyCenterModal";
const columns = [
  { key: "name", label: "Study Center Name" },
  { key: "address", label: "Address" },
  { key: "email", label: "Email" },
  { key: "contact", label: "Contact Number" },
  { key: "mvps", label: "MVPs Sent" },
  { key: "status", label: "Status" },
];

const data = [
  {
    name: "NY Health Clinic",
    address: "New York, NY, USA",
    email: "johndoe@gmail.com",
    contact: "123-456-7890",
    mvps: 156,
    status: "Active",
  },
  {
    name: "LA Medical Center",
    address: "Los Angeles, CA, USA",
    email: "johndoe@gmail.com",
    contact: "123-456-7890",
    mvps: 56,
    status: "Inactive",
  },
  {
    name: "Chicago Health Hub",
    address: "Chicago, IL, USA",
    email: "johndoe@gmail.com",
    contact: "123-456-7890",
    mvps: 42,
    status: "Active",
  },
  {
    name: "Boston Research Facility",
    address: "Boston, MA, USA",
    email: "johndoe@gmail.com",
    contact: "123-456-7890",
    mvps: 32,
    status: "Active",
  },
  {
    name: "Miami Care Center",
    address: "Miami, FL, USA",
    email: "johndoe@gmail.com",
    contact: "123-456-7890",
    mvps: 10,
    status: "Inactive",
  },
];
const StudyCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="relative min-w-[400px] max-w-[400px]">
            <input
              type="text"
              className="border-[1px] border-[#B2B2B25E] px-[10px] ps-[30px] w-full h-[50px] rounded-[12px]"
              placeholder="search Centers..."
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
        <Button onClick={() => setIsOpen(true)} className="bg-[#00B4F1] h-[50px] text-white rounded-[12px] rounded-[12px] flex items-center gap-2">
          <GoPlusCircle />
          Add New Study Center
        </Button>
      </div>
      <SharedTable columns={columns} data={data} total={60} />

      <AddStudyCenterModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default StudyCenter;
