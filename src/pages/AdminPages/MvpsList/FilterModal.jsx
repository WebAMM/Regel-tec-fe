import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { FaTimes } from "react-icons/fa";
import { useGetAllStudyCenterQuery } from "../../../api/apiSlice";
const FilterModal = ({
  open,
  onClose,
  onApplyFilters,
  currentFilters = {},
}) => {
  const { data, isLoading } = useGetAllStudyCenterQuery({
    status: "",
    page: 1,
    limit: 10,
  });
  console.log("data123", data);
  const studyCenters = data?.data?.data || [];
  console.log("studyCenters", studyCenters);
  const [filters, setFilters] = useState({
    gender: currentFilters.gender || [],
    studyCenterStatus: currentFilters.studyCenterStatus || "",
    studyCenter: currentFilters.studyCenter || "",
    startDate: currentFilters.startDate || "",
    endDate: currentFilters.endDate || "",
    ...currentFilters,
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleGenderChange = (gender) => {
    setFilters((prev) => ({
      ...prev,
      gender: prev.gender.includes(gender)
        ? prev.gender.filter((g) => g !== gender)
        : [...prev.gender, gender],
    }));
  };

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
      gender: [],
      studyCenterStatus: "",
      studyCenter: "",
      startDate: "",
      endDate: "",
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
        className="absolute inset-0 bg-opacity-50 transition-opacity backdrop_class"
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
          {/* Gender Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Gender
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.gender.includes("Male")}
                  onChange={() => handleGenderChange("Male")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.gender.includes("Female")}
                  onChange={() => handleGenderChange("Female")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Female</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.gender.includes("Other")}
                  onChange={() => handleGenderChange("Other")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Other</span>
              </label>
            </div>
          </div>

          {/* Study Center Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Study Center
            </label>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="studyCenterStatus"
                  value="Assigned"
                  checked={filters.studyCenterStatus === "Assigned"}
                  onChange={(e) =>
                    handleInputChange("studyCenterStatus", e.target.value)
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Assigned</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="studyCenterStatus"
                  value="Awaiting"
                  checked={filters.studyCenterStatus === "Awaiting"}
                  onChange={(e) =>
                    handleInputChange("studyCenterStatus", e.target.value)
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Awaiting</span>
              </label>
            </div>

            {/* Study Center Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Study Center
              </label>
              <select
                value={filters.studyCenter}
                onChange={(e) =>
                  handleInputChange("studyCenter", e.target.value)
                }
                className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select Study Center</option>
                {studyCenters.map((center) => (
                  <option key={center.id} value={center.id}>
                    {center.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                max="2025-12-31"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                max="2025-12-31"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 p-4 border-t">
          <Button
            variant="outlined"
            onClick={handleReset}
            className="px-6 py-2 text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            Reset
          </Button>
          <Button
            onClick={handleApply}
            className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-600"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
