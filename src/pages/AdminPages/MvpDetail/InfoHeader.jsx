import React from 'react'
import { Button } from '@material-tailwind/react'
import { MdOutlineFileDownload } from 'react-icons/md'

const InfoHeader = ({ userName }) => {
    return (
        <>
            <div className='flex justify-between items-center w-full'>
                <h1 className='font-bold text-3xl'>MVP Profile: <span>{userName}</span></h1>
                <Button className="bg-[#A2A1A833] border-[1px] border-[#A2A1A833] shadow-none  h-[50px] text-[#000000]  rounded-[12px] flex items-center gap-2">
                    <MdOutlineFileDownload />
                    Export
                </Button>
            </div>
            <p>Detailed information, study center status, and pre-screener submission.</p>
        </>
    )
}

export default InfoHeader