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
import { ContactFormSchema } from "../../schemas/validations";

const COUNTRIES = ["France (+33)", "Germany (+49)", "Spain (+34)", "USA (+1)"];
const CODES = ["+33", "+49", "+34", "+1"];
// const formatPhoneNumber = (value) => {
//   // Remove all non-digits
//   const phoneNumber = value.replace(/\D/g, '');

//   // Format based on length
//   if (phoneNumber.length <= 3) {
//     return phoneNumber;
//   } else if (phoneNumber.length <= 6) {
//     return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
//   } else {
//     return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
//   }
// };
const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, "").slice(0, 10);
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

  if (!match) return value;

  const [, area, prefix, line] = match;

  if (area && prefix && line) {
    return `(${area}) ${prefix}-${line}`;
  } else if (area && prefix) {
    return `(${area}) ${prefix}`;
  } else if (area) {
    return `(${area}`;
  }

  return value;
};
const PhoneInput = ({ field, form, ...props }) => {
  const handleChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    form.setFieldValue(field.name, formattedValue);
  };

  return (
    <input
      {...field}
      {...props}
      onChange={handleChange}
      maxLength={14} // (555) 000-0000 = 14 characters
    />
  );
};
const ContactForm = () => {
  const [country, setCountry] = useState(0);
  const [finish, isFinish] = useState(false);
  const { state } = useLocation()
  const [addNewMvp] = useAddNewMvpMutation()
  const { contactData } = state


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
  let contactInfo = ''
  if (state?.isQualified) {
    if (state?.isStudyCenterInRadius) {
      contactInfo = 'Please enter your contact information so that someone from the local study center may contact you.'
    }

  } else {
    contactInfo = 'Please enter your contact information so that someone from a local study center may contact you in the future, should a local study center open in your area.'
  }

  // console.log(state, 'state')
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
                <div className="text-[16px] font-[400] text-[#39394A] font-relay mb-8">
                  {contactInfo}
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
                            <label className="text-sm font-normal text-start text-[#39394A] font-relay mb-1">
                              City
                            </label>
                            <Field name='mvp.city'

                              className={`border text-[#39394A] font-relay ${errors.mvp?.city && touched.mvp?.city ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 !h-[50px] outline-none`}
                            />
                            {errors.mvp?.city && touched.mvp?.city && (
                              <div className="text-red-500 text-xs mt-1 text-left">{errors.mvp.city}</div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-normal text-[#39394A] font-relay text-start mb-1">
                              State
                            </label>
                            <Field name='mvp.state'
                              className={`border text-[#39394A] font-relay ${errors.mvp?.state && touched.mvp?.state ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 !h-[50px] outline-none`}
                            />
                            {errors.mvp?.state && touched.mvp?.state && (
                              <div className="text-red-500 text-xs mt-1 text-left">{errors.mvp.state}</div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-normal text-[#39394A] font-relay text-start mb-1">
                              Zip Code
                            </label>
                            <Field name='mvp.zipCode'
                              className={`border text-[#39394A] font-relay ${errors.mvp?.zipCode && touched.mvp?.zipCode ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 !h-[50px] outline-none`}
                            />
                            {errors.mvp?.zipCode && touched.mvp?.zipCode && (
                              <div className="text-red-500 text-xs mt-1 text-left">{errors.mvp.zipCode}</div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-normal text-[#39394A] font-relay text-start mb-1">
                              First Name
                            </label>
                            <Field name='mvp.firstName'
                              className={`border text-[#39394A] font-relay ${errors.mvp?.firstName && touched.mvp?.firstName ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 !h-[50px] outline-none`}
                            />
                            {errors.mvp?.firstName && touched.mvp?.firstName && (
                              <div className="text-red-500 text-xs mt-1 text-left">{errors.mvp.firstName}</div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-normal text-[#39394A] font-relay text-start mb-1">
                              Last Name
                            </label>
                            <Field name='mvp.lastName'
                              className={`border text-[#39394A] font-relay ${errors.mvp?.lastName && touched.mvp?.lastName ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 !h-[50px] outline-none`}
                            />
                            {errors.mvp?.lastName && touched.mvp?.lastName && (
                              <div className="text-red-500 text-xs mt-1 text-left">{errors.mvp.lastName}</div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-normal text-[#39394A] font-relay text-start mb-1">
                              Email Address
                            </label>
                            <Field
                              name='mvp.email'
                              type='email'
                              className={`border text-[#39394A] font-relay ${errors.mvp?.email && touched.mvp?.email ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 !h-[50px] outline-none`}
                            />
                            {errors.mvp?.email && touched.mvp?.email && (
                              <div className="text-red-500 text-xs mt-1 text-left">{errors.mvp.email}</div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-normal text-[#39394A] font-relay text-start mb-1">
                              Phone Number
                            </label>
                            {/* <Field name='mvp.phone' type='tel'
                              className={`border ${errors.mvp?.phone && touched.mvp?.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 !h-[50px] outline-none`}
                            /> */}
                            <Field name="mvp.phone">
                              {({ field, form }) => (
                                <PhoneInput
                                  field={field}
                                  form={form}
                                  type="tel"
                                  placeholder="(555) 000-0000"
                                  className={`border text-[#39394A] font-relay ${errors.mvp?.phone && touched.mvp?.phone
                                    ? 'border-red-500'
                                    : 'border-gray-200'
                                    } rounded-lg px-3 !h-[50px] outline-none`}
                                />
                              )}
                            </Field>
                            {errors.mvp?.phone && touched.mvp?.phone && (
                              <div className="text-red-500 text-xs mt-1 text-left">{errors.mvp.phone}</div>
                            )}

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
