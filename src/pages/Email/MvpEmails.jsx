import React, { useState } from 'react'
import ReusableTable from '../../components/ReusableTable';
import { useDeleteEmailByIdMutation, useGetMvpEmailsQuery } from '../../api/apiSlice';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import EmailDetail from './EmailDetail';

const MvpEmails = ({ searchTerm }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: emails, isLoading } = useGetMvpEmailsQuery({ search: searchTerm })
    const [deleteEmailById] = useDeleteEmailByIdMutation()
    const [id, setId] = useState(false);

    console.log(emails?.data, 'emails')
    const handleDetail = (row) => {
        setId(row?.id)
        setIsOpen(true)
    }
    const handleDelete = async (row) => {
        try {
            console.log(row.id)
            await deleteEmailById(row?.id).unwrap()
        } catch (error) {
            console.log(error)
        }

    }
    const columns = [
        { accessor: "to", header: "To" },
        { accessor: "subject", header: "Subject" },
        { accessor: "date", header: "Date" },

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
                            onClick={() => handleDelete(row)}
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
            <EmailDetail open={isOpen} onClose={() => setIsOpen(false)} id={id} />
        </>
    )
}

export default MvpEmails