import React from "react";
import { useRemoveDesignatedUserMutation } from "../../../api/apiSlice";
import { toast } from "react-toastify";

const DeleteDesignatedModal = ({ email, onClose }) => {
  const [removeDesignatedUser, { isLoading }] =
    useRemoveDesignatedUserMutation();

  const handleDelete = async () => {
    try {
      await removeDesignatedUser(email).unwrap();
      toast.success("Designated user removed successfully");
      onClose();
    } catch {
      toast.error("Failed to remove designated user");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Are You Sure You Want to Delete This Email?
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          This will permanently remove the email and end all related
          communications.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex-1 h-11 rounded-lg bg-[#00B4F1] text-white hover:bg-[#009fd6] transition-colors disabled:opacity-60"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDesignatedModal;
