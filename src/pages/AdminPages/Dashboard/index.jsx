import React from "react";
import studyIcon from "../../../assets/images/study-icon.png";
import mvpIcon from "../../../assets/images/mvp-icon.png";
import prescreenIcon from "../../../assets/images/prescreen-icon.png";
import refferalIcon from "../../../assets/images/refferal-icon.png";
import statesIcon from "../../../assets/images/states-icon.png";
// import { useSelector } from "react-redux";

const totalCards = [
  {
    icon: studyIcon,
    number: "24",
    name: "Total Study Centers",
  },
  {
    icon: mvpIcon,
    number: "1,284",
    name: "Registered MVPs",
  },
  {
    icon: prescreenIcon,
    number: "1,284",
    name: "Pre-Screeners Submitted",
  },
  {
    icon: refferalIcon,
    number: "45",
    name: "Total Referral Emails Sent",
  },
  {
    icon: statesIcon,
    number: "12",
    name: "States Covered",
  },
  {
    icon: mvpIcon,
    number: "100",
    name: "MVPs Awaiting Local Study Center",
  },
];

const dashboardCards = [
  {
    title: "Study Centers Summary",
    action: "+Add New Study Center",
    data: [
      { label: "Active Study Centers", value: 18 },
      { label: "New Study Center Added", value: 6 },
      { label: "Recently Added", value: "NY Health Clinic" },
    ],
  },
  {
    title: "Pre-Screener Overview",
    action: "Manage Pre-Screener",
    data: [
      { label: "Total Pre-Screeners Submitted", value: 1284 },
      { label: "Newly Submitted Pre-Screeners", value: 12 },
      { label: "Pre-Screener Questions", value: 8 },
    ],
  },
  {
    title: "MVP Management",
    action: "+Add New User",
    data: [
      { label: "Total MVPs", value: 1284 },
      { label: "New MVPs Added", value: 34 },
      { label: "MVPs Awaiting Local Study Center", value: 23 },
    ],
  },
  {
    title: "MVPs Emails Overview",
    action: "Manage Emails",
    data: [
      { label: "Total Sent", value: 45 },
      { label: "New Sent", value: 4 },
      { label: "MVPs Awaiting Local Study Center", value: 12 },
    ],
  },
];

const Dashboard = () => {
  return (
    <>
      <div className="text-[28px] font-[700] text-[#000]">Welcome, Admin</div>
      <div className="text-[16px] font-[400] text-[#00000066] mb-5">
        Manage studies, sites, MVPs, referrals, and reports seamlessly.
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {totalCards.map((item, i) => {
          return (
            <>
              <div className="bg-[#fff] border-[1px] border-[#0000001F] rounded-[12px] p-5 flex items-center gap-3">
                <img src={item.icon} alt="" />
                <div>
                  <div className="text-[24px] font-[400] text-[#000]">
                    {item.number}
                  </div>
                  <div className="text-[14px] font-[400] text-[#00000099]">
                    {item.name}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {dashboardCards?.map((item, i) => {
          return (
            <>
              <div className="bg-[#fff] border-[1px] border-[#0000001F] rounded-[12px] p-5 ">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-[20px] font-[400] text-[#000]">
                    {item?.title}
                  </div>
                  <a href="javasscript:void(0)" className="text-[14px] font-[400] text-[#00B4F1]">
                    {item?.action}
                  </a>
                </div>
                {item?.data?.map((item, i) => {
                  return (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-[16px] font-[400] text-[#00000099]">
                          {item?.label}
                        </div>
                        <div className="text-[16px] font-[400] text-[#000000]">
                          {item?.value}
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
