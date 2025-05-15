import ReportHeader from './ReportHeader'
import PreScreeningReportsPanel from './PreScreeningReportsPanel'
import GenerateNewReport from './GenerateNewReport'
import { useState } from 'react'

const Reports = () => {
    const [open, setOpen] = useState(false)

    const openModal = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <div className='space-y-2'>
                <ReportHeader onClick={openModal} />
                <PreScreeningReportsPanel onClick={openModal} />

            </div>
            <GenerateNewReport open={open} onClose={handleClose} />
        </>
    )
}

export default Reports