import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { LuSearch } from "react-icons/lu";
import {
  useGetAllStudyCenterQuery,
  useUpdateStudyCenterStatusMutation,
} from "../../../api/apiSlice";
import filterIcon from "../../../assets/images/filter.png";
import Pagination from "../../../components/Pagination";
import ReusableTable from "../../../components/ReusableTable";
import AddStudyCenterModal from "./AddStudyCenterModal";
import { toast } from "react-toastify";
import { useDebounce } from "../../../components/hooks/useDebounce";
import StudyCenterFilterModal from "./StudyCenterFilterModal";
const StudyCenter = () => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data: studyCenter, isLoading } = useGetAllStudyCenterQuery({
    status: appliedFilters.status || "",
    page: currentPage,
    limit: pageSize,
    search: debouncedSearchTerm,
    location: appliedFilters.location || "",
    startDate: appliedFilters.startDate || "",
    endDate: appliedFilters.endDate || "",
  });
  const [updateStudyCenter] = useUpdateStudyCenterStatusMutation();
  const hasActiveFilters = () => {
    return (
      appliedFilters.status ||
      appliedFilters.location ||
      appliedFilters.startDate ||
      appliedFilters.endDate
    );
  };
  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when page size changes
  };
  const handleStatus = async (e, row) => {
    try {
      const statusValue = e.target.value === "true";
      const data = {
        status: statusValue,
      };
      await updateStudyCenter({ id: row?.id, payload: data }).unwrap();
      toast.success("Status Updated Successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Status Added Successfully");
    }
  };
  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);
  const columns = [
    { accessor: "name", header: "Study Center Name" },
    { accessor: "address", header: "Address" },
    { accessor: "email", header: "Email" },
    { accessor: "contactNumber", header: "Contact Number" },
    { accessor: "mvp_sent", header: "MVPs Sent" },
    {
      accessor: "status",
      header: "Status",
      render: (row) => {
        return (
          <div>
            <div className="flex items-center justify-center border rounded-sm border-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              {/* <p className="text-base text-gray-800">{row?.status ? "Active" : 'InActive'}</p> */}
              <select
                className="text-base text-gray-800"
                onChange={(e) => handleStatus(e, row)}
                // value={(row?.status ? "Active" : "InActive") || ""}
                value={row?.status.toString()}
              >
                <option value="true">Active</option>
                <option value="false">InActive</option>
              </select>
            </div>
          </div>
        );
      },
    },
  ];
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="relative min-w-[400px] max-w-[400px]">
            <input
              type="text"
              className="border-[1px] border-[#B2B2B25E] px-[10px] ps-[30px] w-full h-[50px] rounded-[12px]"
              placeholder="Search Centers..."
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
          onClick={() => setIsOpen(true)}
          className="bg-[#00B4F1] h-[50px] text-white rounded-[12px] flex items-center gap-2"
        >
          <GoPlusCircle />
          Add New Study Center
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
            {appliedFilters.location && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Location: {appliedFilters.location}
              </span>
            )}
            {appliedFilters.startDate && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                From: {appliedFilters.startDate}
              </span>
            )}
            {appliedFilters.endDate && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                To: {appliedFilters.endDate}
              </span>
            )}
            <button
              onClick={() =>
                handleApplyFilters({
                  status: "",
                  location: "",
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
        columns={columns}
        data={studyCenter?.data?.data}
        total={60}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={studyCenter?.data?.totalPages || 1}
        total={studyCenter?.data?.totalCount || 0}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
      <AddStudyCenterModal open={isOpen} onClose={() => setIsOpen(false)} />
      <StudyCenterFilterModal
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={appliedFilters}
      />
    </>
  );
};

export default StudyCenter;
