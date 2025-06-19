import React, { useState } from "react";
import { BellIcon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Avatar, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from 'moment';
import { useGetNotificationsQuery } from "../../../src/api/apiSlice"; // Update path as needed

export default function AdminHeader() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Fetch notifications
  const { data: notificationsData, isLoading, error } = useGetNotificationsQuery();
  
  const notifications = notificationsData?.data?.notifications || [];
  const totalNotificationCount = notificationsData?.data?.totalNotificationCount || 0;
  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear any stored authentication data
        localStorage.removeItem('token');
        sessionStorage.clear();
       
        // Show success message
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          // Navigate to home page
          navigate('/');
        });
      }
    });
  };

  const formatNotificationTime = (createdAt) => {
  return moment(createdAt).fromNow();
};

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'referral':
        return '📧';
      case 'pre-screener':
        return '📝';
      default:
        return '🔔';
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
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
          
          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute top-8 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Typography variant="h6" className="text-gray-900 font-semibold">
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
                        !notification.isRead ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-lg mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Typography 
                            variant="small" 
                            className={`text-sm ${!notification.isRead ? 'font-medium text-gray-900' : 'text-gray-700'}`}
                          >
                            {notification.description}
                          </Typography>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              notification.type === 'referral' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {notification.type}
                            </span>
                            <Typography variant="small" className="text-xs text-gray-500">
                              {formatNotificationTime(notification.createdAt)}
                            </Typography>
                          </div>
                        </div>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-200 text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
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
          <ChevronDownIcon
            className="h-4 w-4 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
            onClick={handleLogout}
          />
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