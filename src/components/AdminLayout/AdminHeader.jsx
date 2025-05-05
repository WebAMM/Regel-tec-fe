import React from "react";
import { BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Avatar, Typography } from "@material-tailwind/react";

export default function AdminHeader() {
  return (
    <header className="flex justify-end items-center px-6 py-4 bg-white shadow-sm w-full">
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <div className="relative">
          <BellIcon className="h-6 w-6 text-gray-600" />
          <span className="absolute -top-2 -right-2 bg-[#00B4F1] text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            12
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300" />

        {/* Profile Info */}
        <div className="flex items-center gap-2">
          <Avatar
            src="https://i.pravatar.cc/40?img=3"
            alt="avatar"
            size="sm"
            className="border border-gray-300"
          />
          <div className="text-right">
            <Typography variant="small" className="text-sm font-medium text-gray-900">
              John Doe
            </Typography>
            <Typography variant="small" className="text-xs text-gray-500">
              Admin
            </Typography>
          </div>
          <ChevronDownIcon className="h-4 w-4 text-gray-600" />
        </div>
      </div>
    </header>
  );
}
