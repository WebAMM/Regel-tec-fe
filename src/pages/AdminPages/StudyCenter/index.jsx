import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { LuSearch } from "react-icons/lu";
import { useGetAllStudyCenterQuery, useUpdateStudyCenterStatusMutation } from "../../../api/apiSlice";
import filterIcon from "../../../assets/images/filter.png";
import Pagination from "../../../components/Pagination";
import ReusableTable from "../../../components/ReusableTable";
import AddStudyCenterModal from "./AddStudyCenterModal";
import { toast } from "react-toastify";




const StudyCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: studyCenter, isLoading } = useGetAllStudyCenterQuery({ status: '', page: 1, limit: 10 })
  const [updateStudyCenter] = useUpdateStudyCenterStatusMutation()

  const handleStatus = async (e, row) => {
    try {
      const statusValue = e.target.value === "true";
      const data = {
        status: statusValue
      };
      await updateStudyCenter({ id: row?.id, payload: data }).unwrap();
      toast.success('Status Updated Successfully');
    } catch (error) {
      toast.error(error?.data?.message || 'Status Added Successfully')
    }
  }
  const columns = [
    { accessor: "name", header: "Study Center Name" },
    { accessor: "address", header: "Address" },
    { accessor: "email", header: "Email" },
    { accessor: "contactNumber", header: "Contact Number" },
    { accessor: "mvp_sent", header: "MVPs Sent" },
    {
      accessor: "status", header: "Status", render: (row) => {
        return (
          <div>
            <div className="flex items-center justify-center border rounded-sm border-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              {/* <p className="text-base text-gray-800">{row?.status ? "Active" : 'InActive'}</p> */}
              <select
                className="text-base text-gray-800"
                onChange={(e) => handleStatus(e, row)}
                // value={(row?.status ? "Active" : "InActive") || ""}
                value={row?.status.toString()}
              >
                <option value="true">Active</option>
                <option value="false">InActive</option>
              </select>
            </div>

          </div>
        )
      }
    },

  ];
  if (isLoading) return <div>Loading...</div>
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="relative min-w-[400px] max-w-[400px]">
            <input
              type="text"
              className="border-[1px] border-[#B2B2B25E] px-[10px] ps-[30px] w-full h-[50px] rounded-[12px]"
              placeholder="search Centers..."
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
        <Button onClick={() => setIsOpen(true)} className="bg-[#00B4F1] h-[50px] text-white rounded-[12px] flex items-center gap-2">
          <GoPlusCircle />
          Add New Study Center
        </Button>
      </div>
      <ReusableTable columns={columns} data={studyCenter?.data?.data} total={60} />
      <Pagination />
      <AddStudyCenterModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default StudyCenter;
