import {
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import circleCheck from "../../assets/images/check-circle.png";
import { useLocation } from "react-router-dom";
import { CgLayoutGrid } from "react-icons/cg";

const COUNTRIES = ["France (+33)", "Germany (+49)", "Spain (+34)", "USA (+1)"];
const CODES = ["+33", "+49", "+34", "+1"];
const ContactForm = () => {
  const [country, setCountry] = useState(0);
  const [finish, isFinish] = useState(false);

  const {state} = useLocation()
  console.log(state?.reportId,'pathname')
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        <div className="text-center">
          <Typography
            variant="h6"
            className="uppercase text-lg font-medium text-[#00B4F1]"
          >
            Take The Pre-Screener
          </Typography>
          <Typography
            variant="h3"
            className="my-4 text-4xl font-bold text-gray-900"
          >
            Do I Qualify?
          </Typography>

          <div className="bg-white shadow-lg rounded-xl w-full p-8">
            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="text-center">
                <div className="rounded-full bg-[#00B4F1] text-white w-6 h-6 mx-auto flex items-center justify-center p-1">
                  <FaCheck />
                </div>
                <Typography variant="small" className="text-[#00B4F1]">
                  Select Location
                </Typography>
              </div>
              <div className="w-24 mb-2 h-1 bg-[#00B4F1] rounded"></div>

              <div className="text-center">
                <div className="rounded-full bg-[#00B4F1] text-white w-6 h-6 mx-auto flex items-center justify-center p-1">
                  <FaCheck />
                </div>
                <Typography variant="small" className="text-[#00B4F1]">
                  Pre-Screener
                </Typography>
              </div>
              <div className="w-24 mb-2 h-1 bg-[#00B4F1] rounded"></div>

              <div className="text-center">
                <div className="rounded-full border border-[#00B4F1] flex items-center justify-center w-6 h-6 mx-auto">
                  <div className="w-3 h-3 bg-[#00B4F1] rounded-full"></div>
                </div>
                <Typography variant="small" className="text-[#00B4F1]">
                  Contact Info
                </Typography>
              </div>
            </div>

            {!finish ? (
              <>
                <div className="text-[18px] font-[700] text-[#121229] mb-4">
                  Contact Information
                </div>
                <div className="text-[16px] font-[400] text-[#39394A] mb-8">
                  Please enter your contact information so that someone from a
                  local study center may contact you in the future, should a
                  local study center open in your area.
                </div> 
                <div className="max-w-[80%] mx-auto">
                  <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col">
                      <label className="text-sm font-normal text-gray-700 text-start mb-1">
                        City
                      </label>
                      <Input className="border border-gray-200 rounded-lg px-3 !h-[50px]  outline-none" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-normal text-gray-700 text-start mb-1">
                        State
                      </label>
                      <Input className="border border-gray-200 rounded-lg px-3 !h-[50px] outline-none" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-normal text-gray-700 text-start mb-1">
                        Zip Code
                      </label>
                      <Input className="border border-gray-200 rounded-lg px-3 !h-[50px] outline-none" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-normal text-gray-700 text-start mb-1">
                        First Name
                      </label>
                      <Input className="border border-gray-200 rounded-lg px-3 !h-[50px]  outline-none" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-normal text-gray-700 text-start mb-1">
                        Last Name
                      </label>
                      <Input className="border border-gray-200 rounded-lg px-3 !h-[50px] outline-none" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-normal text-gray-700 text-start mb-1">
                        Email Address
                      </label>
                      <Input className="border border-gray-200 rounded-lg px-3 !h-[50px] outline-none" />
                    </div> 
                    <div className="flex flex-col">
                      <label className="text-sm font-normal text-gray-700 text-start mb-1">
                        Phone Number
                      </label>
                      <div className="relative flex w-full">
                        <Menu placement="bottom-start">
                          <MenuHandler>
                            <Button
                              ripple={false}
                              variant="text"
                              color="blue-gray"
                              className="!h-[50px] border border-gray-200 w-14 shrink-0 rounded-r-none border border-r-0  bg-transparent px-3"
                            >
                              {CODES[country]}
                            </Button>
                          </MenuHandler>
                          <MenuList className="max-h-[20rem] max-w-[18rem]">
                            {COUNTRIES.map((country, index) => {
                              return (
                                <MenuItem
                                  key={country}
                                  value={country}
                                  onClick={() => setCountry(index)}
                                >
                                  {country}
                                </MenuItem>
                              );
                            })}
                          </MenuList>
                        </Menu>
                        <Input
                          type="tel"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          maxLength={12}
                          placeholder="324-456-2323"
                          className="appearance-none border border-gray-200 rounded-lg px-3 outline-none  rounded-l-[0px] !h-[50px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          containerProps={{
                            className: "min-w-0",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4 justify-start">
                    <Button className="bg-[#00B4F1] h-12 text-white rounded-full" onClick={() => isFinish(true)}>
                      Submit
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="">
                <div className="flex justify-center">
                  <img src={circleCheck} alt="" />
                </div>
                <Typography
                  variant="h3"
                  className="my-4 text-4xl font-bold text-gray-900"
                >
                  Submission Complete
                </Typography>
                <Typography
                  variant="paragraph"
                  className="mb-12 text-lg font-normal text-gray-700 max-w-4xl mx-auto"
                >
                 Thank you. Someone from the local study center may contact you. <a href="javascript:void(0)" className="text-[#00B4F1]">Privacy Policy</a> 
                </Typography>
                <Button
                  className="bg-[#00B4F1] h-12 text-white rounded-full"
                >
                  Finish
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
