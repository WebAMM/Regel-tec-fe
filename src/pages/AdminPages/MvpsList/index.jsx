import { Button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import filterIcon from "../../../assets/images/filter.png";
import { MdOutlineFileDownload, MdOutlineRemoveRedEye } from "react-icons/md";
import { SharedTable } from "../../../components";
import { useGetAllMvpListQuery } from "../../../api/apiSlice";
import ReusableTable from "../../../components/ReusableTable";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import Pagination from "../../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../components/hooks/useDebounce";
import FilterModal from "./FilterModal"; // Import the FilterModal component
import moment from "moment";
import { LoaderCenter } from "../../../utilities/Loader";

const MvpsList = () => {
  const [pageSize, setPageSize] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    gender: [],
    studyCenterStatus: "",
    studyCenter: "",
    startDate: "",
    endDate: "",
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const navigate = useNavigate();

  // Build query parameters from filters
  const buildQueryParams = () => {
    const params = {
      page: currentPage,
      limit: pageSize,
      search: debouncedSearchTerm,
    };

    // Add filters to params
    if (filters.studyCenterStatus) {
      params.studyCenterStatus = filters.studyCenterStatus;
    }
    if (filters.studyCenter) {
      params.studyCenter = filters.studyCenter;
    }
    if (filters.gender.length > 0) {
      params.gender = filters.gender.join(","); // Send as comma-separated string
    }
    if (filters.startDate) {
      params.startDate = filters.startDate;
    }
    if (filters.endDate) {
      params.endDate = filters.endDate;
    }

    return params;
  };

  const { data: mvpList, isLoading } = useGetAllMvpListQuery(
    buildQueryParams()
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when page size changes
  };
  const handleDetail = (row) => {
    console.log(row, "row");
    navigate("/admin/mvp/detail", { state: { data: row } });
  };

  const handleApplyFilters = (newFilters) => {
    setCurrentPage(1);
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleOpenFilterModal = () => {
    setFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalOpen(false);
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return (
      filters.gender.length > 0 ||
      filters.studyCenterStatus ||
      filters.studyCenter ||
      filters.startDate ||
      filters.endDate
    );
  };
  const formatDate = (dateString) => {
    return moment(dateString).format("MMM DD, YYYY, h:mm A");
  };
  const mvpColumns = [
    { accessor: "mvp_id", header: "MVP ID" },
    { accessor: "name", header: "Name" },
    { accessor: "contactNumber", header: "Contact Number" },
    { accessor: "email", header: "Email" },
    { accessor: "zipCode", header: "Zip Code" },
    {
      accessor: "submittedDate",
      header: "Submitted Date",
      render: (row) => formatDate(row.submittedDate),
    },
    { accessor: "studyCenter", header: "Study Center" },
    {
      accessor: "",
      header: "Action",
      render: (row) => {
        return (
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-[99px] bg-[#f2f9ff] text-blue-500 text-[18px] flex items-center justify-center cursor-pointer hover:shadow-lg p-2"
              onClick={() => handleDetail(row)}
            >
              <MdOutlineRemoveRedEye color="gray" size={18} />
            </button>
          </div>
        );
      },
    },
  ];
  if (isLoading) {
    return (
      <p>
        <LoaderCenter />
      </p>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className="relative min-w-[400px] max-w-[400px]">
          <input
            type="text"
            className="border-[1px] border-[#B2B2B25E] px-[10px] ps-[30px] w-full h-[50px] rounded-[12px]"
            placeholder="Search By Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <LuSearch className="absolute top-[18px] left-[8px]" />
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outlined"
            className={`h-[50px] border-[#A2A1A833] text-[#000] rounded-[12px] flex items-center gap-2 relative ${
              hasActiveFilters() ? "border-blue-500 bg-blue-50" : ""
            }`}
            onClick={handleOpenFilterModal}
          >
            <img src={filterIcon} alt="" />
            Filter
            {hasActiveFilters() && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></span>
            )}
          </Button>
          <Button className="bg-[#A2A1A833] border-[1px] border-[#A2A1A833] shadow-none h-[50px] text-[#000000] rounded-[12px] flex items-center gap-2">
            <MdOutlineFileDownload />
            Export
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-700">
              Active Filters:
            </span>
            {filters.gender.length > 0 && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Gender: {filters.gender.join(", ")}
              </span>
            )}
            {filters.studyCenterStatus && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Status: {filters.studyCenterStatus}
              </span>
            )}
            {filters.studyCenter && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Center: {filters.studyCenter}
              </span>
            )}
            {filters.startDate && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                From: {moment(filters.startDate).format("MMM DD, YYYY")}
              </span>
            )}
            {filters.endDate && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                To: {moment(filters.endDate).format("MMM DD, YYYY")}
              </span>
            )}
            <button
              onClick={() =>
                handleApplyFilters({
                  gender: [],
                  studyCenterStatus: "",
                  studyCenter: "",
                  startDate: "",
                  endDate: "",
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
        columns={mvpColumns}
        data={mvpList?.data?.data}
        total={mvpList?.data?.totalPages || 0}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={mvpList?.data?.totalPages || 1}
        total={mvpList?.data?.total || 0}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />

      {/* Filter Modal */}
      <FilterModal
        open={filterModalOpen}
        onClose={handleCloseFilterModal}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </>
  );
};

export default MvpsList;
