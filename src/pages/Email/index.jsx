import React, { useState } from 'react'
import filterIcon from "../../assets/images/filter.png";
import { LuSearch } from 'react-icons/lu';
import { Button } from '@material-tailwind/react';
import { GoPlusCircle } from 'react-icons/go';
import Tabs from '../../components/Tabs'
import StudyCenterEmail from './StudyCenterEmail';
import MvpEmails from './MvpEmails';
const Emails = () => {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ['Study Center Emails', 'MVP Emails'];

    const handleTabChange = (index) => {
        setActiveTab(index);
    };
    return (
        <>
            <div className="flex items-center justify-between mb-5">
                <div className="flex justify-between items-center gap-4">

                    <div className="relative min-w-[400px] max-w-[400px]">
                        <input
                            type="text"
                            className="border-[1px] border-[#B2B2B25E] px-[10px] ps-[30px] w-full h-[50px] rounded-[12px]"
                            placeholder="search By Name..."
                        />
                        <LuSearch className="absolute top-[18px] left-[8px]" />
                    </div>
                    <Button
                        variant="outlined"
                        className="h-[50px] border-[#A2A1A833] text-[#000] rounded-[12px] flex items-center gap-2"
                    >
                        <img src={filterIcon} alt="" />
                        Filter
                    </Button>
                </div>

            </div>
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />
            <div className="mt-6 p-4 ">
                {activeTab === 0 && (
                    <StudyCenterEmail />
                )}

                {activeTab === 1 && (
                    <MvpEmails />
                )}
            </div>
        </>
    )
}

export default Emails