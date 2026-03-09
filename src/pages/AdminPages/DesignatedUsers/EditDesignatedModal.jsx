import React, { useState } from "react";
import { LuX } from "react-icons/lu";
import { useUpdateDesignatedUserMutation } from "../../../api/apiSlice";
import { toast } from "react-toastify";

const EditDesignatedModal = ({ email, onClose }) => {
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updateDesignatedUser, { isLoading }] = useUpdateDesignatedUserMutation();

  const handleUpdate = async () => {
    try {
      await updateDesignatedUser({ email, updatedEmail }).unwrap();
      toast.success("Designated user email updated successfully");
      onClose();
    } catch {
      toast.error("Failed to update designated user email");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Edit Email</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <LuX size={20} />
          </button>
        </div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={updatedEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
          className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 h-11 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00B4F1] mb-8"
          placeholder="Enter email"
        />
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={isLoading || !updatedEmail}
            className="flex-1 h-11 rounded-lg bg-[#00B4F1] text-white hover:bg-[#009fd6] transition-colors disabled:opacity-60"
          >
            {isLoading ? "Updating..." : "Update Email"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDesignatedModal;
