import { HandThumbDownIcon } from '@heroicons/react/24/solid';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import * as Yup from 'yup';
import { addQuestionValidation } from '../../../schemas/validations';
import { useLocation } from 'react-router-dom';
import { useAddSectionsQuestionsMutation } from '../../../api/apiSlice';
import { toast } from 'react-toastify';

const AddPreScreenerQuestions = () => {
    const { state } = useLocation()
    const [addSectionsQuestions, { isLoading }] = useAddSectionsQuestionsMutation()
    const questionTypes = [
        "TextBox",
        "NumericBox",
        "DropDown",
        "TrueFalse",
    ];
    const boolType = [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
    ];

    const dropdownType = [
        { label: "", value: "" },
    ];
    const textType = {
        placeholder: "Enter Answer",
        options: [],
    };
    const numericType = {
        placeholder: "Enter Answer",
        options: [],
    };
    const dropdownMeta = {
        options: dropdownType,
    };

    const radioButtonMeta = {
        options: boolType,
    };




    const initialValues = {
        payload: [
            {
                title: "",
                order: state?.latestSectionOrder + 1,
                questions: [
                    {
                        title: "",
                        type: questionTypes[0],
                        order: 1,
                        meta: textType
                    },
                ]
            },
        ]
    };

    const handleSubmit = async (values) => {
        try {
            await addSectionsQuestions(values).unwrap()
            toast.success('Question Added Successfully')
            console.log(values, 'values');

        } catch (error) {
            console.log(error)
            toast.error(error.data?.message || 'Question Added Successfully')
        }
    };
    const getMetaForQuestionType = (questionType) => {
        switch (questionType) {
            case "TextBox":
                return textType;
            case "NumericBox":
                return numericType;
            case "DropDown":
                return dropdownMeta;
            case "TrueFalse":
                return radioButtonMeta;
            default:
                return textType; // Default to Text Box if no type matches
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Add Pre-Screener Question</h2>
            <p className="text-gray-500 mb-6">
                Define a new question to be used in the MVP pre-screening process.
            </p>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={addQuestionValidation}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <FieldArray name="payload">
                            {({ remove: removeSection, push: pushSection }) => (
                                <div>
                                    {values.payload.length > 0 &&
                                        values.payload.map((section, sectionIndex) => (
                                            <div className="mb-6 p-4 border rounded shadow-sm" key={sectionIndex}>
                                                <div className="mb-4">
                                                    <div className='flex py-3 justify-between items-center'>
                                                        <label className="font-semibold mb-2 block" htmlFor={`payload.${sectionIndex}.title`}>
                                                            Section {sectionIndex + 1}
                                                        </label>
                                                        <button
                                                            type="button"
                                                            className=" p-2 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center"
                                                            onClick={() => removeSection(sectionIndex)}
                                                        >
                                                            Delete Section
                                                        </button>
                                                    </div>
                                                    <Field
                                                        name={`payload.${sectionIndex}.title`}
                                                        placeholder="Enter Heading"
                                                        type="text"
                                                        className="w-full px-4 py-2 border rounded"
                                                    />
                                                    <ErrorMessage
                                                        name={`payload.${sectionIndex}.title`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                <FieldArray name={`payload.${sectionIndex}.questions`}>
                                                    {({ remove: removeQuestion, push: pushQuestion }) => (
                                                        <div>
                                                            {section.questions.map((question, questionIndex) => (
                                                                <div key={questionIndex} className="flex items-center justify-between gap-3 mb-4">
                                                                    <div className="w-9/12">
                                                                        <label className="text-sm font-medium block">
                                                                            Question {questionIndex + 1}
                                                                        </label>
                                                                        <Field
                                                                            name={`payload.${sectionIndex}.questions.${questionIndex}.title`}
                                                                            placeholder="Enter your question"
                                                                            type="text"
                                                                            className="w-full px-4 py-2 border rounded"
                                                                        />
                                                                        <ErrorMessage
                                                                            name={`payload.${sectionIndex}.questions.${questionIndex}.title`}
                                                                            component="div"
                                                                            className="text-red-500 text-sm mt-1"
                                                                        />
                                                                    </div>
                                                                    <div className="w-3/12">
                                                                        <label className="text-sm font-medium block">
                                                                            Question type
                                                                        </label>
                                                                        <Field
                                                                            as="select"
                                                                            name={`payload.${sectionIndex}.questions.${questionIndex}.type`}
                                                                            className="w-full px-4 py-2 border rounded"
                                                                            onChange={(e) => {
                                                                                const selectedType = e.target.value;
                                                                                setFieldValue(
                                                                                    `payload.${sectionIndex}.questions.${questionIndex}.type`,
                                                                                    selectedType
                                                                                );
                                                                                setFieldValue(
                                                                                    `payload.${sectionIndex}.questions.${questionIndex}.meta`,
                                                                                    getMetaForQuestionType(selectedType)
                                                                                );
                                                                            }}
                                                                        >
                                                                            {questionTypes.map((type, i) => (
                                                                                <option key={i} value={type}>
                                                                                    {type}
                                                                                </option>
                                                                            ))}
                                                                        </Field>
                                                                        <ErrorMessage
                                                                            name={`payload.${sectionIndex}.questions.${questionIndex}.type`}
                                                                            component="div"
                                                                            className="text-red-500 text-sm mt-1"
                                                                        />
                                                                    </div>

                                                                    <FieldArray name={`payload.${sectionIndex}.questions.${questionIndex}.meta.options`}>
                                                                        {({ remove: removeOption, push: pushOption }) => (
                                                                            <div className='flex gap-4 items-center justify-center'>
                                                                                {/* Render options dynamically if there are any */}
                                                                                {question?.meta?.options?.length > 0 &&
                                                                                    question?.meta.options.map((meta, index) => (
                                                                                        <div key={index} className="flex items-center gap-3">
                                                                                            {/* Option Label Field */}
                                                                                            <div>
                                                                                                <label className="text-sm font-medium block">Option {index + 1}</label>
                                                                                                <Field
                                                                                                    placeholder="Enter option label"
                                                                                                    type="text"
                                                                                                    className="px-4 py-2 border rounded"
                                                                                                    name={`payload.${sectionIndex}.questions.${questionIndex}.meta.options[${index}].label`}  // Name mapped correctly
                                                                                                    onChange={(e) => {
                                                                                                        // Set the label field to the value's value dynamically
                                                                                                        const newValue = e.target.value;
                                                                                                        setFieldValue(`payload.${sectionIndex}.questions.${questionIndex}.meta.options[${index}].label`, newValue);
                                                                                                        setFieldValue(`payload.${sectionIndex}.questions.${questionIndex}.meta.options[${index}].value`, newValue);
                                                                                                    }}
                                                                                                />


                                                                                            </div>

                                                                                            {/* Remove Button for Option */}
                                                                                            {question?.type === "DropDown" && (<span
                                                                                                onClick={() => removeOption(index)}  // Remove the option at the current index
                                                                                                className="px-2 py-1 bg-sky-500 text-white rounded-full cursor-pointer"
                                                                                            >
                                                                                                -
                                                                                            </span>)}

                                                                                        </div>


                                                                                    ))
                                                                                }

                                                                                {/* Add New Option Button */}
                                                                                {question?.type === "DropDown" && (
                                                                                    <span
                                                                                        onClick={() => pushOption({ label: "", value: "" })}  // Add a new empty option to the options array
                                                                                        className="px-2 py-1 bg-sky-500 text-white rounded-full cursor-pointer"
                                                                                    >
                                                                                        +
                                                                                    </span>
                                                                                )}

                                                                            </div>
                                                                        )}
                                                                    </FieldArray>
                                                                    {question?.type === "TrueFalse" && (
                                                                        <div>
                                                                            <label className="text-sm font-medium block">Select Correct Option</label>
                                                                            <Field as="select" name={`payload.${sectionIndex}.questions.${questionIndex}.meta.correct`} className="px-4 py-2 border rounded">
                                                                                <option value="">Select an option</option>
                                                                                {question?.meta?.options?.map((option, index) => (
                                                                                    <option key={index} value={option.value}>{option.label}</option>
                                                                                ))}
                                                                            </Field>
                                                                        </div>
                                                                    )}

                                                                    <div>
                                                                        <button
                                                                            type="button"
                                                                            className="mt-6 p-2 text-red-600 rounded-ful cus flex items-center justify-center cursor-pointer"
                                                                            onClick={() => removeQuestion(questionIndex)}
                                                                        >
                                                                            <RiDeleteBin6Line />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}

                                                            <div className="flex justify-end">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => pushQuestion({
                                                                        title: "",
                                                                        type: questionTypes[0],
                                                                        order: section.questions.length + 1,
                                                                        meta: textType
                                                                    })}
                                                                    className="mt-2 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
                                                                >
                                                                    + Add Question
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </FieldArray>
                                            </div>
                                        ))}

                                    <div className="mt-4 flex justify-between">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const lastSectionOrder = values.payload[values.payload.length - 1]?.order || 0;
                                                pushSection({
                                                    title: "",
                                                    order: lastSectionOrder + 1,
                                                    questions: [
                                                        {
                                                            title: "",
                                                            type: questionTypes[0],
                                                            order: 1,
                                                            meta: textType,
                                                        },
                                                    ],
                                                });
                                            }}
                                            className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
                                        >
                                            + Add Section
                                        </button>

                                        <div className='flex gap-3'>
                                            <button
                                                type="button"
                                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
                                            >
                                                {isLoading ? 'Loading' : 'Save'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </FieldArray>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddPreScreenerQuestions;