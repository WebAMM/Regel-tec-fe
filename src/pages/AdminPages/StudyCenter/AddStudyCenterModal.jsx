import React from "react";

const AddStudyCenterModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#00000085]  z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add New Study Center</h2>
          <button onClick={onClose} className="text-gray-500 text-xl font-bold">&times;</button>
        </div>

        <form className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Study Center Name</label>
            <input type="text" placeholder="Study Center Name" className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" placeholder="Enter Email" className="w-full border rounded-md px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="text" placeholder="Enter Number" className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Radius</label>
            <input type="text" placeholder="Enter Radius" className="w-full border rounded-md px-3 py-2" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" placeholder="Enter Address" className="w-full border rounded-md px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input type="text" placeholder="Enter City" className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input type="text" placeholder="Enter State" className="w-full border rounded-md px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
            <input type="text" placeholder="Enter Zip Code" className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full border rounded-md px-3 py-2">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </form>

        <div className="flex justify-between items-center mt-6">
          <button onClick={onClose} className="px-6 py-2 border rounded-md text-gray-700">Cancel</button>
          <button className="px-6 py-2 bg-[#00B4F1] text-white rounded-md">Add Study Center</button>
        </div>
      </div>
    </div>
  );
};

export default AddStudyCenterModal;
