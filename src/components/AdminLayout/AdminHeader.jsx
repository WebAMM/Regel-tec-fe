import React, { useState } from "react";
import {
  BellIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from "../../../src/api/apiSlice"; // Update path as needed
import headerIcon1 from "../../assets/images/header-icon-1.png";
import headerIcon2 from "../../assets/images/header-icon-2.png";
import headerIcon3 from "../../assets/images/header-icon-3.png";

export default function AdminHeader() {
  const headerinfo = localStorage.getItem("persist:root");
  console.log("headerinfo", headerinfo);
  const getUserData = () => {
    try {
      if (headerinfo) {
        const parsedData = JSON.parse(headerinfo);
        const authData = JSON.parse(parsedData.auth);
        return authData.user?.data || null;
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
    return null;
  };

  const userData = getUserData();
  console.log("userData", userData);
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  // Fetch notifications
  const {
    data: notificationsData,
    isLoading,
    error,
  } = useGetNotificationsQuery();
  console.log("notificationsData", notificationsData);
  const notifications = notificationsData?.data?.notifications || [];
  const totalNotificationCount =
    notificationsData?.data?.totalNotificationCount || 0;
  console.log("totalNotificationCount", totalNotificationCount);
  const unreadCount = totalNotificationCount;

  // Mark as read mutation
  const [markNotificationAsRead, { isLoading: isMarkingAsRead }] =
    useMarkNotificationAsReadMutation();

  const handleMarkAsRead = async (notificationId, event) => {
    console.log("Mark as read:", notificationId);

    try {
      await markNotificationAsRead(notificationId).unwrap();
      console.log("Notification marked as read successfully");
      // The invalidatesTags will automatically refetch the notifications
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear all persisted data
        localStorage.removeItem("persist:root"); // This is the main persisted state
        localStorage.removeItem("token"); // Remove any standalone token (if exists)
        sessionStorage.clear();

        // Clear all localStorage items (optional - if you want to clear everything)
        // localStorage.clear();

        // Show success message
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          // Navigate to home page
          navigate("/");
          // Optionally reload the page to ensure clean state
          window.location.reload();
        });
      }
    });
  };

  const formatNotificationTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "referral":
        return "📧";
      case "pre-screener":
        return "📝";
      default:
        return "🔔";
    }
  };

  return (
    <header className="flex justify-end items-center px-6 py-4 bg-white shadow-sm w-full relative">
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <div className="relative">
          <BellIcon
            className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
            onClick={() => setShowNotifications(!showNotifications)}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#00B4F1] text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
              {unreadCount}
            </span>
          )}

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute top-8 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Typography
                    variant="h6"
                    className="text-gray-900 font-semibold"
                  >
                    Notifications
                  </Typography>
                  {totalNotificationCount > 0 && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {totalNotificationCount}
                    </span>
                  )}
                </div>
                <XMarkIcon
                  className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600"
                  onClick={() => setShowNotifications(false)}
                />
              </div>

              {/* Notifications List */}
              <div className="max-h-64 overflow-y-auto">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500">
                    Loading notifications...
                  </div>
                ) : error ? (
                  <div className="p-4 text-center text-red-500">
                    Error loading notifications
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        !notification.isRead ? "bg-blue-50" : ""
                      }`}
                      onClick={(e) => handleMarkAsRead(notification._id, e)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-lg mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Typography
                            variant="small"
                            className={`text-sm ${
                              !notification.isRead
                                ? "font-medium text-gray-900"
                                : "text-gray-700"
                            }`}
                          >
                            {notification.description}
                          </Typography>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                notification.type === "referral"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {notification.type}
                            </span>
                            <Typography
                              variant="small"
                              className="text-xs text-gray-500"
                            >
                              {formatNotificationTime(notification.createdAt)}
                            </Typography>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              !notification.isRead
                                ? "bg-green-500"
                                : "bg-blue-500"
                            }`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-200 text-center">
                  <button
                    className="text-sm text-[#24BEFE] hover:text-blue-300 font-medium cursor-pointer"
                    onClick={() => navigate("/admin/notifications")}
                  >
                    View all notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300" />

        {/* Profile Info */}
        <div className="flex items-center gap-2 relative">
          <Avatar
            src="https://ui-avatars.com/api/?name=A&length=1"
            alt="avatar"
            size="sm"
            className="border border-gray-300 rounded-full h-[50px]"
          />
          <div className="text-right">
            <Typography
              variant="small"
              className="text-sm font-medium text-gray-900"
            >
              {userData
                ? `${
                    userData.firstName?.charAt(0).toUpperCase() +
                    userData.firstName?.slice(1)
                  } ${
                    userData.lastName?.charAt(0).toUpperCase() +
                    userData.lastName?.slice(1)
                  }`
                : "John Doe"}
            </Typography>
            <Typography variant="small" className="text-xs text-gray-500">
              {userData?.email || "Admin"}
            </Typography>
          </div>
          <ChevronDownIcon
            className="h-4 w-4 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          />

          {/* Profile Dropdown */}
          {showProfileDropdown && (
            <div className="absolute top-12 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="py-2">
                <button
                  onClick={() => {
                    navigate("/admin/settings");
                    setShowProfileDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 cursor-pointer"
                >
                  <img src={headerIcon1} />
                  Profile
                </button>
                <button
                  onClick={() => {
                    navigate("/admin/settings");
                    setShowProfileDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 cursor-pointer"
                >
                  <img src={headerIcon2} />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 cursor-pointer"
                >
                  <img src={headerIcon3} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay to close notifications when clicking outside */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </header>
  );
}
