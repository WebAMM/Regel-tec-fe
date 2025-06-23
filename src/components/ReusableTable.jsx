const ReusableTable = ({ columns, data, onClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr className="bg-gray-100 text-left">
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-3 whitespace-nowrap"
                style={{ width: column.width || "auto" }}
              >
                {column.header}{" "}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr
              key={row._id}
              className={`border-t border-gray-200 `}
              onClick={onClick}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`p-4 `}
                  style={{ width: column.width || "auto" }}
                >
                  {column.render
                    ? column.render(row)
                    : typeof column.accessor === "function"
                    ? column.accessor(row)
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
