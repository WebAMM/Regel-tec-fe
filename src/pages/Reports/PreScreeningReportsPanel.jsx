
const PreScreeningReportsPanel = ({ onClick }) => {
    const reportOptions = [
        "Submission Statistics",
        "Conversion Rates",
        "Total Study Centers",
        "Registered MVPs",
        "Pre-Screeners Submitted",
        "Total Referral Emails Sent",
        "States Covered",
        "MVPs Awaiting Local Study Center"
    ];

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-medium text-gray-800">Pre-Screening Reports</h1>
                <button className="text-[#00B4F1] font-medium flex items-center" onClick={onClick}>
                    <span className="mr-1">+</span> Generate Report
                </button>
            </div>

            <div className="space-y-4">
                {reportOptions.map((option, index) => (
                    <div
                        key={index}
                        className="p-3 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                    >
                        <span className="text-gray-700">{option}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreScreeningReportsPanel;