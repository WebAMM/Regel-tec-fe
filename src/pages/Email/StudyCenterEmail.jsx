import { MdOutlineRemoveRedEye } from "react-icons/md";
import {
  useDeleteEmailByIdMutation,
  useGetReferralEmailsQuery,
} from "../../api/apiSlice";
import ReusableTable from "../../components/ReusableTable";
import { FaDeleteLeft } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import EmailDetail from "./EmailDetail";
import { useState } from "react";
import DeleteModal from "./StudyCenterDeleteModal";
import moment from "moment";
import { LoaderCenter } from "../../utilities/Loader";

const StudyCenterEmail = ({ searchTerm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { data: emails, isLoading } = useGetReferralEmailsQuery({
    search: searchTerm,
  });
  const [deleteEmailById] = useDeleteEmailByIdMutation();
  console.log(emails?.data, "emails");
  const handleDetail = (row) => {
    setId(row?.id);
    setIsOpen(true);
  };
  const handleDelete = (row) => {
    setDeleteId(row?.id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEmailById(deleteId).unwrap();
      setDeleteModalOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.log(error);
    }
  };
  const formatDate = (dateString) => {
    return moment(dateString).format("MMM DD, YYYY, h:mm A");
  };
  const columns = [
    { accessor: "to", header: "To" },
    { accessor: "subject", header: "Subject" },
    {
      accessor: "date",
      header: "Date",
      render: (row) => formatDate(row.date),
    },

    {
      accessor: "",
      header: "Action",
      render: (row) => {
        return (
          <div className="flex gap-2">
            <button
              type="button"
              className=" rounded-[99px] bg-[#f2f9ff] text-blue-500 text-[18px] flex items-center justify-center cursor-pointer hover:shadow-lg"
              onClick={() => handleDetail(row)}
            >
              <MdOutlineRemoveRedEye color="gray" size={18} />
            </button>
            <button
              type="button"
              className=" rounded-[99px] bg-[#f2f9ff] text-blue-500 text-[18px] flex items-center justify-center cursor-pointer hover:shadow-lg"
              onClick={() => handleDelete(row)}
            >
              <RiDeleteBin6Line color="gray" size={18} />
            </button>
          </div>
        );
      },
    },
  ];
  if (isLoading) {
    return (
      <p>
        <LoaderCenter />
        <span className="ml-2">Loading...</span>
      </p>
    );
  }
  return (
    <>
      <ReusableTable columns={columns} data={emails?.data} />
      <EmailDetail open={isOpen} onClose={() => setIsOpen(false)} id={id} />
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDeleteId(null);
        }}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default StudyCenterEmail;
