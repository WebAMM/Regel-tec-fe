import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UsersIcon,
  BuildingLibraryIcon,
  ClipboardDocumentListIcon,
  EnvelopeIcon,
  DocumentIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom"; // Import NavLink for routing
import logo from "../../assets/images/logo.png";

const navItems = [
  {
    label: "Dashboard",
    icon: <PresentationChartBarIcon className="h-5 w-5" />,
    path: "/admin/dashboard",
  },
  {
    label: "MVPs",
    icon: <UsersIcon className="h-5 w-5 text-gray-600" />,
    path: "/admin/mvps",
  },
  {
    label: "Study Centers",
    icon: <BuildingLibraryIcon className="h-5 w-5 text-gray-600" />,
    path: "/admin/study-center",
  },
  {
    label: "Pre-Screeners",
    icon: <ClipboardDocumentListIcon className="h-5 w-5 text-gray-600" />,
    path: "/admin/prescreener",
  },
  {
    label: "Referral Emails",
    icon: <EnvelopeIcon className="h-5 w-5 text-gray-600" />,
    path: "/admin/referral-emails",
  },
  {
    label: "Reports",
    icon: <DocumentIcon className="h-5 w-5 text-gray-600" />,
    path: "/admin/reports",
  },
  {
    label: "Settings",
    icon: <Cog6ToothIcon className="h-5 w-5 text-gray-600" />,
    path: "/admin/settings",
  },
];

export default function Sidebar() {
  return (
    <div className="w-[280px] min-h-screen bg-white shadow-md border-r border-[#0000001F]">
      <div className="flex p-4">
        <img src={logo} alt="ReGelTec" className="h-14" />
      </div>
      <List className="p-0 !min-w-full px-4">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-md mb-2 ${isActive ? "bg-[#00B4F1] text-white" : "text-gray-900"
              }`
            }
          >
            <ListItem className="!w-full">
              <ListItemPrefix>{item.icon}</ListItemPrefix>
              {item.label}
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );
}
