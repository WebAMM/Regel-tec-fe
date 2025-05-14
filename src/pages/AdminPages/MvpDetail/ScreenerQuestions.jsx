
const MvpInformation = ({ questions }) => {
    console.log(questions?.answers, 'questions')
    return (
        <>
            <div className=" mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold mb-6">Pre-Screener Questions</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Left Column */}
                    {
                        questions?.answers.map((ques, index) => (
                            <div key={index} className="mb-4">
                                <p className="text-sm text-gray-500">{ques?.questionTitle}</p>
                                <p className="font-semibold text-2xl text-gray-800">{ques?.answer}</p>
                            </div>))
                    }
                </div>
            </div>
        </>
    )
}

export default MvpInformation