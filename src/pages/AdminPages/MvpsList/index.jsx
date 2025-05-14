import { Button } from "@material-tailwind/react";
import React from "react";
import { LuSearch } from "react-icons/lu";
import filterIcon from "../../../assets/images/filter.png";
import { MdOutlineFileDownload, MdOutlineRemoveRedEye } from "react-icons/md";
import { SharedTable } from "../../../components";
import { useGetAllMvpListQuery } from "../../../api/apiSlice";
import ReusableTable from "../../../components/ReusableTable";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import Pagination from "../../../components/Pagination";
import { useNavigate } from "react-router-dom";





const MvpsList = () => {
  const { data: mvpList, isLoading } = useGetAllMvpListQuery({ page: 1, limit: 10 })
  const navigate = useNavigate()

  const handleDetail = (row) => {
    console.log(row, 'row')
    navigate('/admin/mvp/detail', { state: { data: row } })
  }

  const mvpColumns = [
    { accessor: "mvp_id", header: "MVP ID" },
    { accessor: "name", header: "Name" },
    { accessor: "contactNumber", header: "Contact Number" },
    { accessor: "email", header: "Email" },
    { accessor: "zipCode", header: "Zip Code" },
    { accessor: "submittedDate", header: "Submitted Date" },
    { accessor: "studyCenter", header: "Study Center" },
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



          </div>
        )
      }
    },

  ];

  if (isLoading) {
    return <p>Loading...</p>
  }
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className="relative min-w-[400px] max-w-[400px]">
          <input
            type="text"
            className="border-[1px] border-[#B2B2B25E] px-[10px] ps-[30px] w-full h-[50px] rounded-[12px]"
            placeholder="search By Name..."
          />
          <LuSearch className="absolute top-[18px] left-[8px]" />
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outlined"
            className="h-[50px] border-[#A2A1A833] text-[#000] rounded-[12px] flex items-center gap-2"
          >
            <img src={filterIcon} alt="" />
            Filter
          </Button>
          <Button className="bg-[#A2A1A833] border-[1px] border-[#A2A1A833] shadow-none  h-[50px] text-[#000000]  rounded-[12px] flex items-center gap-2">
            <MdOutlineFileDownload />
            Export
          </Button>
        </div>
      </div>
      <ReusableTable columns={mvpColumns} data={mvpList?.data?.data} total={60} />
      <Pagination />
    </>
  );
};

export default MvpsList;
