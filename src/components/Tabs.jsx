import React from 'react';

const TabItem = ({ label, isActive, onClick }) => {
    return (
        <button
            className={`px-6 py-3 text-lg font-medium transition-colors duration-200 ${isActive
                ? 'bg-[#00B4F1] text-white rounded-lg'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};
const Tabs = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex space-x-2 bg-white p-2 rounded-lg shadow-sm">
            {tabs.map((tab, index) => (
                <TabItem
                    key={index}
                    label={tab}
                    isActive={activeTab === index}
                    onClick={() => onTabChange(index)}
                />
            ))}
        </div>
    );
};
export default Tabs;