import React, { useState } from "react";

const questionTypes = [
  "Single Text Box",
  "Single Numeric Box",
  "Dropdown",
  "Radio Button",
];

const AddPrescreener = () => {
  const [sections, setSections] = useState([
    {
      heading: "",
      questions: [{ questionText: "", type: questionTypes[0] }],
    },
  ]);

  const updateSectionHeading = (index, value) => {
    const updated = [...sections];
    updated[index].heading = value;
    setSections(updated);
  };

  const updateQuestion = (sectionIndex, questionIndex, key, value) => {
    const updated = [...sections];
    updated[sectionIndex].questions[questionIndex][key] = value;
    setSections(updated);
  };

  const addQuestion = (sectionIndex) => {
    const updated = [...sections];
    updated[sectionIndex].questions.push({ questionText: "", type: questionTypes[0] });
    setSections(updated);
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        heading: "",
        questions: [{ questionText: "", type: questionTypes[0] }],
      },
    ]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold">Add Pre-Screener Question</h2>
      <p className="text-gray-500 mb-6">
        Define a new question to be used in the MVP pre-screening process.
      </p>

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-gray-50 p-4 rounded-md mb-4 shadow">
          <h3 className="font-semibold mb-2">Section {sectionIndex + 1}</h3>
          <input
            type="text"
            placeholder="Enter Heading"
            value={section.heading}
            onChange={(e) => updateSectionHeading(sectionIndex, e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
          />

          {section.questions.map((q, questionIndex) => (
            <div key={questionIndex} className="flex flex-col md:flex-row gap-4 items-start mb-4">
              <div className="w-full">
                <label className="text-sm font-medium">Question {questionIndex + 1}</label>
                <input
                  type="text"
                  placeholder="Enter your question"
                  value={q.questionText}
                  onChange={(e) =>
                    updateQuestion(sectionIndex, questionIndex, "questionText", e.target.value)
                  }
                  className="w-full mt-1 px-4 py-2 border rounded"
                />
              </div>

              <div className="w-full md:w-1/2">
                <label className="text-sm font-medium">Question Type</label>
                <select
                  value={q.type}
                  onChange={(e) =>
                    updateQuestion(sectionIndex, questionIndex, "type", e.target.value)
                  }
                  className="w-full mt-1 px-4 py-2 border rounded"
                >
                  {questionTypes.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <button
            onClick={() => addQuestion(sectionIndex)}
            className="mt-2 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
          >
            + Next Question
          </button>
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button
          onClick={addSection}
          className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
        >
          + Add Section
        </button>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancel</button>
          <button className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPrescreener;
