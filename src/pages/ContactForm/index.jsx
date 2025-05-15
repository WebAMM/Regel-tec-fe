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
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';


import { useLocation } from "react-router-dom";
import { CgLayoutGrid } from "react-icons/cg";
import SubmissionComplete from "./SubmissionComplete";
import ProgressStepper from "../Prescreener/ProgressStepper";
import ContactProgress from "./ContactProgress";
import { useAddNewMvpMutation } from "../../api/apiSlice";
import { toast } from "react-toastify";

const COUNTRIES = ["France (+33)", "Germany (+49)", "Spain (+34)", "USA (+1)"];
const CODES = ["+33", "+49", "+34", "+1"];
const ContactForm = () => {
  const [country, setCountry] = useState(0);
  const [finish, isFinish] = useState(false);
  const { state } = useLocation()
  const [addNewMvp] = useAddNewMvpMutation()
  const { contactData } = state
  const ContactFormSchema = Yup.object().shape({
    mvp: Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      phone: Yup.string()
        .required('Phone number is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      zipCode: Yup.string().required('Zip code is required'),
    }),
  });

  const initialValues = {
    mvp: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: contactData?.city || '',
      state: contactData?.state || '',
      zipCode: contactData?.zipCode || '',
    },
    reportId: state?.reportId
  }

  const handleSubmit = async (values) => {
    try {
      await addNewMvp(values).unwrap()
      toast.success('MVP added Successfully')
      isFinish(true)
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || 'Failed to add MVP')
    }
  }

  // console.log(state?.isStudyCenterInRadius, 'state')
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
            <ContactProgress />

            {!finish ? (
              <>
                <div className="text-[18px] font-[700] text-[#121229] mb-4">
                  Contact Information
                </div>
                <div className="text-[16px] font-[400] text-[#39394A] mb-8">
                  {state?.isStudyCenterInRadius ? `Please enter your contact information so that someone from a
                  local study center may contact you in the future, should a
                  local study center open in your area.` : 'Please enter your contact information so that someone from the local study center may contact you.'}
                </div>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={ContactFormSchema}
                  enableReinitialize={true}

                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form>
                      <div className="max-w-[80%] mx-auto">
                        <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="flex flex-col">
                            <label className="text-sm font-normal text-gray-700 text-start mb-1">
                              City
                            </label>
                            <Field name='mvp.city'

                              className={`border ${errors.mvp?.city && touched.mvp?.city ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 !h-[50px] outline-none`}
                            />
                            {errors.mvp?.city && touched.mvp?.city && (
                              <div className="text-red-500 text-xs mt-1 text-left">{errors.mvp.city}</div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-normal text-gray-700 text-start mb-1">
                              State
                            </label>
                            <Field name='mvp.state'
                              className={`border ${errors.mvp?.state && touched.mvp?.state ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 !h-[50px] outline-none`}
                            />
                            {errors.mvp?.state && touched.mvp?.state && (
                              <div className="text-red-500 text-xs mt-1 text-left">{errors.mvp.state}</div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-normal text-gray-700 text-start mb-1">
                              Zip Code
                            </label>
                            <Field name='mvp.zipCode'
                              className={`border ${errors.mvp?.zipCode && touched.mvp?.zipCode ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 !h-[50px] outline-none`}
                            />
                            {errors.mvp?.zipCode && touched.mvp?.zipCode && (
                              <div className="text-red-500 text-xs mt-1 text-left">{errors.mvp.zipCode}</div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-normal text-gray-700 text-start mb-1">
                              First Name
                            </label>
                            <Field name='mvp.firstName'
                              className={`border ${errors.mvp?.firstName && touched.mvp?.firstName ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 !h-[50px] outline-none`}
                            />
                            {errors.mvp?.firstName && touched.mvp?.firstName && (
                              <div className="text-red-500 text-xs mt-1 text-left">{errors.mvp.firstName}</div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-normal text-gray-700 text-start mb-1">
                              Last Name
                            </label>
                            <Field name='mvp.lastName'
                              className={`border ${errors.mvp?.lastName && touched.mvp?.lastName ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 !h-[50px] outline-none`}
                            />
                            {errors.mvp?.lastName && touched.mvp?.lastName && (
                              <div className="text-red-500 text-xs mt-1 text-left">{errors.mvp.lastName}</div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-normal text-gray-700 text-start mb-1">
                              Email Address
                            </label>
                            <Field name='mvp.email'
                              className={`border ${errors.mvp?.email && touched.mvp?.email ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 !h-[50px] outline-none`}
                            />
                            {errors.mvp?.email && touched.mvp?.email && (
                              <div className="text-red-500 text-xs mt-1 text-left">{errors.mvp.email}</div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-normal text-gray-700 text-start mb-1">
                              Phone Number
                            </label>
                            <Field name='mvp.phone' type='phone'
                              className={`border ${errors.mvp?.phone && touched.mvp?.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 !h-[50px] outline-none`}
                            />
                            {errors.mvp?.phone && touched.mvp?.phone && (
                              <div className="text-red-500 text-xs mt-1 text-left">{errors.mvp.phone}</div>
                            )}

                            {/* <div className="relative flex w-full">
                              <Menu placement="bottom-start">
                                <MenuHandler>
                                  <Button
                                    ripple={false}
                                    variant="text"
                                    color="blue-gray"
                                    className="!h-[50px] border border-gray-200 w-14 shrink-0 rounded-r-none  border-r-0  bg-transparent px-3"
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
                            </div> */}
                          </div>
                        </div>
                        <div className="flex gap-4 mt-4 justify-start">
                          <Button
                            type="submit"
                            // disabled={isSubmitting}
                            className="bg-[#00B4F1] h-12 text-white rounded-full flex items-center justify-center"
                          >
                            {isSubmitting ? 'loading...' : 'Submit'}

                          </Button>
                        </div>
                      </div>
                    </Form>
                  )}

                </Formik>

              </>
            ) : (
              <SubmissionComplete />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
