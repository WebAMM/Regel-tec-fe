import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { LuSearch } from "react-icons/lu";
import filterIcon from "../../../assets/images/filter.png";
import { SharedTable } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useGetAllQuestionsQuery } from "../../../api/apiSlice";
import Loader from "../../../components/Loader";
import ReusableTable from "../../../components/ReusableTable";
import Pagination from "../../../components/Pagination";
import { useDebounce } from "../../../components/hooks/useDebounce";
import PreScreenerFilterModal from "./PreScreenerFilterModal";

const columns = [
  { accessor: "sectionOrder", header: "Section ID" },
  { accessor: "questionTitle", header: "Question" },
  { accessor: "questionType", header: "Type" },
  {
    accessor: "questionStatus",
    header: "Status",
    render: ({ questionStatus }) => {
      return (
        <div className="flex items-center justify-center border rounded-sm border-gray-300">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <p className="text-base text-gray-800">
            {questionStatus ? "Assigned" : "unAssigned"}
          </p>
        </div>
      );
    },
  },
];

const PreScreenerList = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const hasActiveFilters = () => {
    return appliedFilters.status || appliedFilters.sectionName;
  };

  // 4. Add handleApplyFilters function
  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
  };
  const { data: allQuestions, isLoading } = useGetAllQuestionsQuery({
    search: debouncedSearchTerm,
    status: appliedFilters.status || "",
    sectionName: appliedFilters.sectionName || "",
  });
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="relative min-w-[400px] max-w-[400px]">
            <input
              type="text"
              className="border-[1px] border-[#B2B2B25E] px-[10px] ps-[30px] w-full h-[50px] rounded-[12px]"
              placeholder="search By Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <LuSearch className="absolute top-[18px] left-[8px]" />
          </div>
          <Button
            variant="outlined"
            className={`h-[50px] border-[#A2A1A833] text-[#000] rounded-[12px] flex items-center gap-2 relative ${
              hasActiveFilters() ? "border-blue-500 bg-blue-50" : ""
            }`}
            onClick={() => setIsFilterOpen(true)}
          >
            <img src={filterIcon} alt="" />
            Filter
            {hasActiveFilters() && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></span>
            )}
          </Button>
        </div>

        <Button
          onClick={() =>
            navigate("/admin/add-prescreener", {
              state: {
                latestSectionOrder: allQuestions?.data?.latestSectionOrder,
              },
            })
          }
          className="bg-[#00B4F1] h-[50px] text-white rounded-[12px] flex items-center gap-2"
        >
          <GoPlusCircle />
          Add New Question
        </Button>
      </div>
      {hasActiveFilters() && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-700">
              Active Filters:
            </span>
            {appliedFilters.status && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Status:{" "}
                {appliedFilters.status === "true" ? "Active" : "Inactive"}
              </span>
            )}
            {appliedFilters.sectionName && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Section: {appliedFilters.sectionName}
              </span>
            )}
            <button
              onClick={() =>
                handleApplyFilters({
                  status: "",
                  sectionName: "",
                })
              }
              className="text-xs text-red-600 hover:text-red-800 underline"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
      <ReusableTable
        columns={columns}
        data={allQuestions?.data?.data}
        total={60}
      />
      <Pagination />
      <PreScreenerFilterModal
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={appliedFilters}
      />
    </>
  );
};

export default PreScreenerList;
