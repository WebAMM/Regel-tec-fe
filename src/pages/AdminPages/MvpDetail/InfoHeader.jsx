import React, { useState } from 'react'
import { Button } from '@material-tailwind/react'
import { MdOutlineFileDownload } from 'react-icons/md'
import { useExportMvpPdfReportMutation } from '../../../api/apiSlice'
import Swal from 'sweetalert2'

const InfoHeader = ({ userName, mvpId }) => {
    const [exportMvpPdfReport, { isLoading: isExporting }] = useExportMvpPdfReportMutation();

    const handleExport = async () => {
        if (!mvpId) {
            Swal.fire({
                title: 'Error!',
                text: 'MVP ID is required for export',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            const response = await exportMvpPdfReport(mvpId).unwrap();
            
            // Create blob URL and download
            const url = window.URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = url;
            link.download = `MVP_Report_${userName || 'Unknown'}_${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            // Show success message
            Swal.fire({
                title: 'Success!',
                text: 'MVP report downloaded successfully',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });

        } catch (error) {
            console.error('Export error:', error);
            Swal.fire({
                title: 'Error!',
                text: error?.data?.message || 'Failed to export MVP report',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <>
            <div className='flex justify-between items-center w-full'>
                <h1 className='font-bold text-3xl'>MVP Profile: <span>{userName}</span></h1>
                <Button 
                    className="bg-[#A2A1A833] border-[1px] border-[#A2A1A833] shadow-none h-[50px] text-[#000000] rounded-[12px] flex items-center gap-2"
                    onClick={handleExport}
                    disabled={isExporting}
                >
                    <MdOutlineFileDownload />
                    {isExporting ? 'Exporting...' : 'Export'}
                </Button>
            </div>
            <p>Detailed information, study center status, and pre-screener submission.</p>
        </>
    )
}

export default InfoHeader