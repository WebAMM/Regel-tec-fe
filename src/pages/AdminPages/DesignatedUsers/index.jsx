import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { GoPlusCircle } from "react-icons/go";
import { LuSearch, LuPencil, LuTrash2 } from "react-icons/lu";
import { useFetchDesignatedUsersQuery } from "../../../api/apiSlice";
import ReusableTable from "../../../components/ReusableTable";
import Pagination from "../../../components/Pagination";
import { useDebounce } from "../../../components/hooks/useDebounce";
import { LoaderCenter } from "../../../utilities/Loader";

const DesignatedUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading } = useFetchDesignatedUsersQuery({
    searchByEmail: debouncedSearch,
    page: currentPage,
    dataPerPage: pageSize,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const columns = [
    { accessor: "email", header: "Designated Users" },
    {
      header: "Action",
      render: (row) => (
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-blue-500">
            <LuPencil size={16} />
          </button>
          <button className="text-gray-500 hover:text-red-500">
            <LuTrash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <LoaderCenter />;

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className="relative min-w-[300px]">
          <input
            type="text"
            className="border-[1px] border-[#B2B2B25E] px-[10px] ps-[30px] w-full h-[50px] rounded-[12px]"
            placeholder="Search Designated Users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <LuSearch className="absolute top-[18px] left-[8px]" />
        </div>
        <Button className="bg-[#00B4F1] h-[50px] text-white rounded-[12px] flex items-center gap-2">
          <GoPlusCircle />
          Add New Email
        </Button>
      </div>
      <ReusableTable columns={columns} data={data?.data?.data} />
      <Pagination
        currentPage={currentPage}
        totalPages={data?.data?.totalPages || 1}
        total={data?.data?.totalCount || 0}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </>
  );
};

export default DesignatedUsers;
