import { useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import { IoChevronDown } from "react-icons/io5";


const Settings = () => {
    const [autoPdfEnabled, setAutoPdfEnabled] = useState(true);
    const [newScreenerNotification, setNewScreenerNotification] = useState(true);
    const [referralEmailNotification, setReferralEmailNotification] = useState(true);
    const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
    return (
        <div className=" p-6 bg-white rounded-lg shadow-sm">
            {/* Profile Section */}
            <div className="flex items-center justify-between py-4 px-1 border-b border-gray-100 hover:bg-gray-100">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">Profile</h3>
                    <p className="text-sm text-gray-500">Your General Information</p>
                </div>
                <MdOutlineChevronRight className="text-gray-400" size={20} />
            </div>

            {/* Language Section */}
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">Language</h3>
                    <p className="text-sm text-gray-500">Select your language</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <button
                            className="flex items-center gap-1 text-gray-900"
                            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                        >
                            English
                            <IoChevronDown size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Change Password Section */}
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                    <p className="text-sm text-gray-500">Update your password</p>
                </div>
                <MdOutlineChevronRight className="text-gray-400" size={20} />
            </div>

            {/* Auto PDF Email Section */}
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">Enable Auto PDF Email Delivery</h3>
                    <p className="text-sm text-gray-500">Automatically send user & pre-screener data in PDF format</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={autoPdfEnabled}
                        onChange={() => setAutoPdfEnabled(!autoPdfEnabled)}
                    />
                    <div className={`w-12 h-6 rounded-full peer ${autoPdfEnabled ? 'bg-green-500' : 'bg-gray-200'} peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                </label>
            </div>

            {/* New Pre-Screener Submission Section */}
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">New Pre-Screener Submission</h3>
                    <p className="text-sm text-gray-500">Get notified when a new pre-screener form is submitted</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={newScreenerNotification}
                        onChange={() => setNewScreenerNotification(!newScreenerNotification)}
                    />
                    <div className={`w-12 h-6 rounded-full peer ${newScreenerNotification ? 'bg-green-500' : 'bg-gray-200'} peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                </label>
            </div>

            {/* Referral Email Sent Section */}
            <div className="flex items-center justify-between py-4">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">Referral Email Sent</h3>
                    <p className="text-sm text-gray-500">Get confirmation when referral emails are sent</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={referralEmailNotification}
                        onChange={() => setReferralEmailNotification(!referralEmailNotification)}
                    />
                    <div className={`w-12 h-6 rounded-full peer ${referralEmailNotification ? 'bg-green-500' : 'bg-gray-200'} peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                </label>
            </div>
        </div>
    );

}

export default Settings