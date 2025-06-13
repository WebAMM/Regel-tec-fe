import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#00B4F1] py-5">
      <div className="container mx-auto flex justify-between items-center flex-wrap xl:px-0 lg:px-5 sm:px-8 px-8">
        <div className="lg:text-sm sm:text-xs text-xs  font-[500] text-[#fff]">
          CAUTION - Investigational device. Limited by federal (or United
          States) law to investigational use.
        </div>
        <div className="lg:text-sm sm:text-xs text-xs font-[500] text-[#fff] copyright_class">
          © Copyright 2025 ReGelTec, Inc.
        </div>
      </div>
    </div>
  );
};

export default Footer;
