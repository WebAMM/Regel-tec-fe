import { CiGlobe } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import { MdForwardToInbox } from "react-icons/md";

const EmailDetail = ({ open, onClose }) => {


    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-[#00000085] z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">New Pre-Screener Submission for [Study Center Name]</h2>
                    <button onClick={onClose} className="text-gray-500 text-xl font-bold cursor-pointer">&times;</button>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">From Date</p>
                        <p className="text-sm">noreply@regeltecstudies.com</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">To Date</p>
                        <p className="text-sm">22/04/2022</p>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-1">Date</p>
                    <p className="text-sm">22/04/2022</p>
                </div>
                <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Reason / Subject</p>
                    <div className="border-t border-gray-200 pt-3">
                        <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                            <p className="text-sm mb-2">Hello [Study Center Name] Team,</p>
                            <p className="text-sm mb-2">You have received a new participant pre-screener submission via the ReGelTec system.</p>
                            <p className="text-sm mb-3">Please find the attached PDF with all details.</p>

                            <p className="text-sm mb-1">Submitted On: [Date, e.g., April 17, 2025]</p>
                            <p className="text-sm mb-1">Study Center: [Study Center Name]</p>
                            <p className="text-sm mb-4">Location: [City, State]</p>

                            <p className="text-sm mb-1">If you have any questions, feel free to contact the ReGelTec admin team.</p>
                            <p className="text-sm mb-1">Thank you,</p>
                            <p className="text-sm mb-2">ReGelTec Clinical Team</p>

                            <div className="flex items-center text-sm mb-1">
                                <span className="text-gray-400 mr-2">
                                    <MdForwardToInbox />

                                </span>
                                <span className="text-blue-600">support@regeltecstudies.com</span>
                            </div>

                            <div className="flex items-center text-sm">
                                <span className="text-gray-400 mr-2">
                                    <CiGlobe />
                                </span>
                                <a href="http://www.regeltecstudies.com" className="text-blue-600">www.regeltecstudies.com</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-sm text-gray-500 mb-2">Attachment</p>
                    <div className="flex items-center bg-amber-50 px-4 py-3 rounded-md cursor-pointer" >
                        <div className="flex items-center flex-grow">
                            <span className="text-amber-600 mr-2">
                                <GrAttachment />
                            </span>
                            <span className="text-sm">Pre-Screener.PDF</span>
                        </div>
                        <button className="text-gray-500">
                            <FiDownload />
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default EmailDetail