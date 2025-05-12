import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup"; // You can install Yup for schema validation
import { addStudyCenterValidation } from "../../../schemas/validations";
import { useAddStudyCenterMutation } from "../../../api/apiSlice";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

const AddStudyCenterModal = ({ open, onClose }) => {
  const [addStudyCenter, { isLoading }] = useAddStudyCenterMutation()

  const initialValues = {
    name: '',
    address: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    status: false,
    zipCode: '',
    searchRadius: ''
  };

  // Yup validation schema


  const handleSubmit = async (values) => {
    try {
      const formData = {
        ...values,
        status: Boolean(values.status),

      };
      // console.log(formData, 'values');
      await addStudyCenter(formData).unwrap()
      onClose()

    } catch (error) {
      console.log(error)
      toast.error(error?.data?.mesage || 'Study Center Failed to Add ')
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#00000085] z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add New Study Center</h2>
          <button onClick={onClose} className="text-gray-500 text-xl font-bold">&times;</button>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={addStudyCenterValidation} // Attach validation schema
        >
          {({ errors, touched }) => (
            <>
              <Form>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Study Center Name</label>
                    <Field name="name" type="text" placeholder="Study Center Name" className="w-full border rounded-md px-3 py-2" />
                    {errors.name && touched.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Field name="email" type="email" placeholder="Enter Email" className="w-full border rounded-md px-3 py-2" />
                    {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <Field name="phone" type="text" placeholder="Enter Number" className="w-full border rounded-md px-3 py-2" />
                    {errors.phone && touched.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Radius</label>
                    <Field name="searchRadius" type="number" placeholder="Enter Radius" className="w-full border rounded-md px-3 py-2" />
                    {errors.searchRadius && touched.searchRadius && <div className="text-red-500 text-sm">{errors.searchRadius}</div>}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <Field name="address" type="text" placeholder="Enter Address" className="w-full border rounded-md px-3 py-2" />
                    {errors.address && touched.address && <div className="text-red-500 text-sm">{errors.address}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <Field name="city" type="text" placeholder="Enter City" className="w-full border rounded-md px-3 py-2" />
                    {errors.city && touched.city && <div className="text-red-500 text-sm">{errors.city}</div>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <Field name="state" type="text" placeholder="Enter State" className="w-full border rounded-md px-3 py-2" />
                    {errors.state && touched.state && <div className="text-red-500 text-sm">{errors.state}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                    <Field name="zipCode" type="text" placeholder="Enter Zip Code" className="w-full border rounded-md px-3 py-2" />
                    {errors.zipCode && touched.zipCode && <div className="text-red-500 text-sm">{errors.zipCode}</div>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <Field
                      as="select"
                      name="status"
                      className="w-full border rounded-md px-3 py-2"
                    >
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </Field>
                    {errors.status && touched.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                  </div>
                </div>

                <div className="flex justify-end items-center gap-3 mt-6">
                  <button onClick={onClose} type="button" className="px-6 py-2 border rounded-md text-gray-700">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-[#00B4F1] text-white rounded-md">
                    {isLoading ? (
                      <Loader />
                    ) : (
                      "Add Study Center"
                    )}
                  </button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddStudyCenterModal;
