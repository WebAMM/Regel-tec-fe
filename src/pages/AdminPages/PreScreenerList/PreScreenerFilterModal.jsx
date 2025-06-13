import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { FaTimes } from "react-icons/fa";
import { useGetAllQuestionsQuery } from "../../../api/apiSlice";

const PreScreenerFilterModal = ({
  open,
  onClose,
  onApplyFilters,
  currentFilters = {},
}) => {
  const { data: questionsData, isLoading: questionsLoading } = useGetAllQuestionsQuery({
    search: "",
    status: "",
    sectionName: "",
  });
  console.log("questionsData", questionsData)
  // Get unique section titles from the API response
  const sections = questionsData?.data?.data ? 
    [...new Set(questionsData.data.data.map(item => item.sectionTitle))] : [];
  const [filters, setFilters] = useState({
    status: currentFilters.status || "",
    sectionName: currentFilters.sectionName || "",
    ...currentFilters,
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleInputChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      status: "",
      sectionName: "",
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleOverlayClick}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Filter</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Status
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.status === "true"}
                  onChange={(e) =>
                    handleInputChange("status", e.target.checked ? "true" : "")
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Active</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.status === "false"}
                  onChange={(e) =>
                    handleInputChange("status", e.target.checked ? "false" : "")
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Inactive</span>
              </label>
            </div>
          </div>

          {/* Section Name */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Name
            </label>
            <select
              value={filters.sectionName}
              onChange={(e) => handleInputChange("sectionName", e.target.value)}
              className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3"
              disabled={questionsLoading}
            >
              <option value="">Select Section</option>
              {sections.map((sectionTitle) => (
                <option key={sectionTitle} value={sectionTitle}>
                  {sectionTitle}
                </option>
              ))}
            </select>
            {questionsLoading && (
              <p className="text-sm text-gray-500 mt-1">Loading sections...</p>
            )}
          </div> */}

           <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Name
            </label>
            <select
              value={filters.sectionName}
              onChange={(e) => handleInputChange("sectionName", e.target.value)}
              className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3"
            >
              <option value="">Select Section</option>
              <option value="Section1">Section 1</option>
              <option value="Section2">Section 2</option>
              <option value="Section3">Section 3</option>
              <option value="Section4">Section 4</option>
              <option value="Section5">Section 5</option>
              <option value="Section6">Section 6</option>
              <option value="Section7">Section 7</option>
              <option value="Section8">Section 8</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 p-4 border-t">
          <Button
            variant="outlined"
            onClick={handleReset}
            className="px-6 py-2 text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            className="px-6 py-2 bg-[#00B4F1] text-white hover:bg-blue-600"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreScreenerFilterModal;