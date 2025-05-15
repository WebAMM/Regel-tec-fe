import { Field, Form, Formik } from 'formik';
import React from 'react'

const GenerateNewReport = ({ open, onClose }) => {
    const initialValues = {
        studyCenter: '',
        exportFormat: '.xlsx',
        fromDate: '',
        toDate: '',
    };
    const handleSubmit = async (values) => {
        console.log(values, 'values')
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-[#00000085] z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Generate New Report</h2>
                    <button onClick={onClose} className="text-gray-500 text-xl font-bold">&times;</button>
                </div>

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <>
                            <Form>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Study Center</label>
                                        <Field
                                            as='select'
                                            name="studyCenter"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        >
                                            <option value="">study 1</option>


                                        </Field>
                                        {errors.studyCenter && touched.studyCenter && <div className="text-red-500 text-sm">{errors.studyCenter}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
                                        <Field name="exportFormat" type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                                        {errors.exportFormat && touched.exportFormat && <div className="text-red-500 text-sm">{errors.exportFormat}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                                        <Field name="fromDate" type="date" placeholder="Enter Number" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                                        {errors.fromDate && touched.fromDate && <div className="text-red-500 text-sm">{errors.fromDate}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                                        <Field name="toDate" type="date" placeholder="Enter Radius" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                                        {errors.toDate && touched.toDate && <div className="text-red-500 text-sm">{errors.toDate}</div>}
                                    </div>

                                </div>

                                <div className="flex justify-end items-center gap-3 mt-6">
                                    <button onClick={onClose} type="button" className="px-6 py-2 border rounded-md text-gray-700">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-[#00B4F1] text-white rounded-md">
                                        Generate Report
                                    </button>
                                </div>
                            </Form>
                        </>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default GenerateNewReport