import React from 'react'

const Pagination = ({
    page = 1,
    pageSize = 5,
    total = 0,
    onPageChange = () => { },
}) => {
    return (
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
    )
}

export default Pagination