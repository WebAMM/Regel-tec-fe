import React from "react";
import {
  Chip,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

const SharedTable = ({
  columns = [],        // Array of column objects: { key: 'fieldName', label: 'Header Label' }
  data = [],           // Array of row objects
  page = 1,
  pageSize = 5,
  total = 0,
  onPageChange = () => { },
}) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-xl border border-gray-200">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 whitespace-nowrap">{col.label}</th>
            ))}
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                  {col.key === "status" ? (
                    <Chip
                      value={row[col.key] === true ? "Active" : "Inactive"}
                      className={row[col.key] === true ? "text-green-400" : "text-gray-400"}
                    />
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
              <td className="px-4 py-3">
                <Menu>
                  <MenuHandler>
                    <IconButton variant="text">
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </IconButton>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>View</MenuItem>
                    <MenuItem>Delete</MenuItem>
                  </MenuList>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
        <div className="flex items-center space-x-2 text-sm">
          <span>Showing</span>
          <select className="border rounded px-2 py-1 text-gray-600">
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="text-sm text-gray-600">
          Showing {page * pageSize - pageSize + 1} to {Math.min(page * pageSize, total)} of {total} records
        </div>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map((p) => (
            <button
              key={p}
              className={`w-8 h-8 rounded-full text-sm border ${p === page ? "bg-blue-500 text-white" : "text-gray-700"
                }`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="w-8 h-8 rounded-full text-sm border text-gray-700"
            onClick={() => onPageChange(page + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharedTable;
