import React from 'react'

const Pagination = ({
    currentPage = 1,
    totalPages = 1,
    total = 0,
    pageSize = 10,
    onPageChange = () => { },
    onPageSizeChange = () => { },
}) => {
    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        
        if (totalPages <= maxPagesToShow) {
            // Show all pages if total pages is less than max
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show pages with ellipsis logic
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, currentPage + 2);
            
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            
            // Add first page and ellipsis if needed
            if (startPage > 1) {
                if (startPage > 2) {
                    pages.unshift('...');
                }
                pages.unshift(1);
            }
            
            // Add last page and ellipsis if needed
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pages.push('...');
                }
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
            <div className="flex items-center space-x-2 text-sm">
                <span>Showing</span>
                <select 
                    className="border rounded px-2 py-1 text-gray-600"
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div className="text-sm text-gray-600">
                Showing {currentPage * pageSize - pageSize + 1} to {Math.min(currentPage * pageSize, total)} of {total} records
            </div>
            <div className="flex items-center space-x-2">
                {/* Previous button */}
                <button
                    className="w-8 h-8 rounded-full text-sm border text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>

                {/* Page numbers */}
                {pageNumbers.map((pageNum, index) => (
                    <button
                        key={index}
                        className={`w-8 h-8 rounded-full text-sm border ${
                            pageNum === currentPage 
                                ? "bg-blue-500 text-white border-blue-500" 
                                : pageNum === '...' 
                                    ? "cursor-default border-transparent" 
                                    : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => pageNum !== '...' && onPageChange(pageNum)}
                        disabled={pageNum === '...'}
                    >
                        {pageNum}
                    </button>
                ))}

                {/* Next button */}
                <button
                    className="w-8 h-8 rounded-full text-sm border text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        </div>
    )
}

export default Pagination