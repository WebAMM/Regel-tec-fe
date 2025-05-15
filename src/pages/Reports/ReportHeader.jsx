import { Button } from '@material-tailwind/react'
import { CgNotes } from 'react-icons/cg'

const ReportHeader = ({ onClick }) => {
    return (
        <>
            <div className='flex justify-between items-center w-full'>
                <h1 className='font-bold text-3xl'>Reports</h1>
                <Button
                    onClick={onClick}
                    className="bg-[#00B4F1] border-[1px] border-[#A2A1A833] shadow-none  h-[50px] text-white  rounded-[12px] flex items-center gap-2">
                    <CgNotes size={22} />
                    Generate New Report
                </Button>
            </div>
            <p>Manage and analyze your study data through comprehensive reports.</p>
        </>
    )
}

export default ReportHeader