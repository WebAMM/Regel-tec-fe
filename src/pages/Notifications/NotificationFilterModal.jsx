import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { FaTimes } from "react-icons/fa";

const NotificationFilterModal = ({
  open,
  onClose,
  onApplyFilters,
  currentFilters = {},
}) => {
  const [filters, setFilters] = useState({
    type: currentFilters.type || "",
    fromDate: currentFilters.fromDate || "",
    toDate: currentFilters.toDate || "",
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
      type: "",
      fromDate: "",
      toDate: "",
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
          <h2 className="text-lg font-semibold text-gray-900">Filter Notifications</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Notification Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Notification Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Types</option>
              <option value="pre-screener">Pre-screener</option>
              <option value="referral">Referral</option>
              <option value="password-reset">Password Reset</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) => handleInputChange("fromDate", e.target.value)}
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
                value={filters.toDate}
                onChange={(e) => handleInputChange("toDate", e.target.value)}
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

export default NotificationFilterModal;