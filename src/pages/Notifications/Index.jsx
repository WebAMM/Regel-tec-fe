import { Button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import filterIcon from "../../assets/images/filter.png";
import { MdOutlineFileDownload } from "react-icons/md";
import ReusableTable from "../../components/ReusableTable";
import Pagination from "../../components/Pagination";
import { useDebounce } from "../../components/hooks/useDebounce";
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from "../../api/apiSlice";
import moment from "moment";
import NotificationFilterModal from "./NotificationFilterModal";
import { LoaderCenter } from "../../utilities/Loader";

const Notifications = () => {
  const [pageSize, setPageSize] = useState(5); // Default to 5 as shown in original
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [filters, setFilters] = useState({
    type: "",
    fromDate: "",
    toDate: "",
  });
  const [markingNotificationId, setMarkingNotificationId] = useState(null);
  const [markedNotifications, setMarkedNotifications] = useState(new Set());
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Build query parameters
  const buildQueryParams = () => {
    const params = {
      all: true,
      page: currentPage,
      limit: pageSize,
      search: searchTerm
    };

    // Add search term if available
    if (debouncedSearchTerm) {
      params.search = debouncedSearchTerm;
    }

    // Add filters to params
    if (filters.type) {
      params.type = filters.type;
    }
    if (filters.fromDate) {
      params.fromDate = filters.fromDate;
    }
    if (filters.toDate) {
      params.toDate = filters.toDate;
    }

    return params;
  };

  const { data: notificationsData, isLoading } = useGetNotificationsQuery(
    buildQueryParams()
  );

  const [markNotificationAsRead, { isLoading: isMarkingAsRead }] =
    useMarkNotificationAsReadMutation();

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const handleMarkAsRead = async (row) => {
  console.log("Mark as read:", row);
  setMarkingNotificationId(row._id);
  try {
    await markNotificationAsRead(row._id).unwrap();
    console.log("Notification marked as read successfully");
    setMarkedNotifications(prev => new Set([...prev, row._id]));
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
  } finally {
    setMarkingNotificationId(null);
  }
};

  const handleApplyFilters = (newFilters) => {
    setCurrentPage(1);
    setFilters(newFilters);
  };

  const handleOpenFilterModal = () => {
    setFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalOpen(false);
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return filters.type || filters.fromDate || filters.toDate;
  };

  // Format notification type for display
  const formatNotificationType = (type) => {
    switch (type) {
      case "pre-screener":
        return "Pre-screener";
      case "referral":
        return "Referral";
      case "password-reset":
        return "Password Reset";
      default:
        return type?.charAt(0).toUpperCase() + type?.slice(1);
    }
  };

  // Format date using moment
  const formatDate = (dateString) => {
    return moment(dateString).format("MMM DD, YYYY, h:mm A");
  };

  const notificationColumns = [
    {
      accessor: "type",
      header: "Type",
      render: (row) => formatNotificationType(row.type),
    },
    { accessor: "description", header: "Message" },
    {
      accessor: "createdAt",
      header: "Date/Time",
      render: (row) => formatDate(row.createdAt),
    },
   {
  accessor: "",
  header: "Action",
  render: (row) => {
    const isMarked = markedNotifications.has(row._id);
    const isCurrentlyMarking = markingNotificationId === row._id;
    
    return (
      <div className="flex gap-2">
        <button
          type="button"
          className={`text-sm cursor-pointer ${
            isMarked 
              ? "text-green-600 cursor-default" 
              : isCurrentlyMarking
              ? "text-blue-300 cursor-not-allowed" 
              : "text-blue-500 hover:text-blue-700"
          }`}
          onClick={() => !isMarked && !isCurrentlyMarking && handleMarkAsRead(row)}
          disabled={isMarked || isCurrentlyMarking}
        >
          {isMarked 
            ? "✓ Marked as read" 
            : isCurrentlyMarking 
            ? "Marking..." 
            : "Mark as read"}
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
        <span className="ml-2">Loading...</span>
      </p>
    );
  }

  return (
    <>
      <div className="flex items-center gap-5 mb-5">
        <div className="relative min-w-[400px] max-w-[400px]">
          <input
            type="text"
            className="border-[1px] border-[#B2B2B25E] px-[10px] ps-[30px] w-full h-[50px] rounded-[12px]"
            placeholder="Search Notifications..."
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
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-700">
              Active Filters:
            </span>
            {filters.type && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Type: {formatNotificationType(filters.type)}
              </span>
            )}
            {filters.fromDate && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                From: {moment(filters.fromDate).format("MMM DD, YYYY")}
              </span>
            )}
            {filters.toDate && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                To: {moment(filters.toDate).format("MMM DD, YYYY")}
              </span>
            )}
            <button
              onClick={() =>
                handleApplyFilters({
                  type: "",
                  fromDate: "",
                  toDate: "",
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
        columns={notificationColumns}
        data={notificationsData?.data?.notifications}
        total={notificationsData?.data?.totalPages || 0}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={notificationsData?.data?.totalPages || 1}
        total={notificationsData?.data?.totalNotificationCount || 0}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />

      {/* Filter Modal */}
      <NotificationFilterModal
        open={filterModalOpen}
        onClose={handleCloseFilterModal}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </>
  );
};

export default Notifications;
