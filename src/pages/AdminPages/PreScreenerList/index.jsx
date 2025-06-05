import { Button } from "@material-tailwind/react";
import React from "react";
import { GoPlusCircle } from "react-icons/go";
import { LuSearch } from "react-icons/lu";
import filterIcon from "../../../assets/images/filter.png";
import { SharedTable } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useGetAllQuestionsQuery } from "../../../api/apiSlice";
import Loader from "../../../components/Loader";
import ReusableTable from "../../../components/ReusableTable";
import Pagination from "../../../components/Pagination";


const columns = [
  { accessor: "sectionOrder", header: "Section ID" },
  { accessor: "questionTitle", header: "Question" },
  { accessor: "questionType", header: "Type" },
  {
    accessor: "questionStatus", header: "Status", render: ({ questionStatus }) => {
      return (

        <div className="flex items-center justify-center border rounded-sm border-gray-300">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <p className="text-base text-gray-800">{questionStatus ? "Assigned" : 'unAssigned'}</p>
        </div>
      )
    }
  },
];


const PreScreenerList = () => {
  const { data: allQuestions, isLoading } = useGetAllQuestionsQuery()
  const navigate = useNavigate()

  if (isLoading) return <div>Loading...</div>
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
          onClick={() => navigate("/admin/add-prescreener", { state: { latestSectionOrder: allQuestions?.data?.latestSectionOrder } })}
          className="bg-[#00B4F1] h-[50px] text-white rounded-[12px] flex items-center gap-2"
        >
          <GoPlusCircle />
          Add New Question
        </Button>
      </div>

      <ReusableTable columns={columns} data={allQuestions?.data?.data} total={60} />
      <Pagination />
    </>
  );
};

export default PreScreenerList;
