import React, { useState } from "react";
import { LuX } from "react-icons/lu";
import { toast } from "react-toastify";
import { useAddDesignatedUserMutation } from "../../../api/apiSlice";

const AddDesignatedModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [addDesignatedUser, { isLoading }] = useAddDesignatedUserMutation();

  const handleSubmit = async () => {
    if (!email.trim()) return;
    try {
      await addDesignatedUser(email.trim()).unwrap();
      toast.success("Designated user email added successfully!");
      onClose();
    } catch {
      toast.error("Failed to add designated user");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add New Email</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <LuX size={20} />
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="felicia.reid@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 px-4 rounded-lg bg-gray-100 border-none outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !email.trim()}
            className="flex-1 h-11 rounded-lg bg-[#00B4F1] text-white hover:bg-[#009fd6] transition-colors disabled:opacity-60"
          >
            {isLoading ? "Adding..." : "Add Email"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDesignatedModal;
