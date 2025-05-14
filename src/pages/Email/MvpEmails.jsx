import React, { useState } from 'react'
import ReusableTable from '../../components/ReusableTable';
import { useGetAllEmailsQuery } from '../../api/apiSlice';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import EmailDetail from './EmailDetail';

const MvpEmails = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: emails, isLoading } = useGetAllEmailsQuery()
    console.log(emails?.data, 'emails')
    const handleDetail = (row) => {
        console.log(row, 'row')
        setIsOpen(true)
    }
    const columns = [
        { accessor: "to", header: "From" },
        { accessor: "subject", header: "Subject" },
        { accessor: "date", header: "Date" },
        {
            accessor: "questionStatus", header: "Status", render: ({ questionStatus }) => {
                return (

                    <div className="flex items-center justify-center border rounded-sm border-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <p className="text-base text-gray-800">{questionStatus ? "Assined" : 'unAssined'}</p>
                    </div>
                )
            }
        },
        {
            accessor: "", header: "Action", render: (row) => {
                return (
                    <div className='flex gap-2'>
                        <button
                            type='button'
                            className=' rounded-[99px] bg-[#f2f9ff] text-blue-500 text-[18px] flex items-center justify-center cursor-pointer hover:shadow-lg'
                            onClick={() => handleDetail(row)}
                        >
                            <MdOutlineRemoveRedEye color="gray" size={18} />
                        </button>
                        <button
                            type='button'
                            className=' rounded-[99px] bg-[#f2f9ff] text-blue-500 text-[18px] flex items-center justify-center cursor-pointer hover:shadow-lg'
                        //   onClick={() => handleDetail(row)}
                        >
                            <RiDeleteBin6Line color="gray" size={18} />
                        </button>



                    </div>
                )
            }
        },
    ];
    if (isLoading) return <div>Loading...</div>
    return (
        <>
            <ReusableTable columns={columns} data={emails?.data} />
            <EmailDetail open={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
}

export default MvpEmails