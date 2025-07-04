import studyIcon from "../../assets/images/study-icon.png";
import mvpIcon from "../../assets/images/mvp-icon.png";
import prescreenIcon from "../../assets/images/prescreen-icon.png";
import refferalIcon from "../../assets/images/refferal-icon.png";
import statesIcon from "../../assets/images/states-icon.png";
import ReusableTable from '../../components/ReusableTable';
import { useGetPreScreeningReportQuery, } from '../../api/apiSlice';
import { useLocation } from 'react-router-dom';
import { CgNotes } from 'react-icons/cg';
import { Button } from '@material-tailwind/react';



const PreScreeningReport = () => {
    const { state } = useLocation()
    const { values } = state
    console.log(state, 'state')
    const { data: screeningReport, isLoading } = useGetPreScreeningReportQuery(values)
    const baseUrl = 'https://regel-medical-be.vercel.app/api'
    // const baseUrl = "https://regel-medical-be.duckdns.org/api"
    // const [trigger, { isLoading: excelLoader }] = useLazyGeneratePreScreeningExcelReportQuery()
    const totalCards = [
        {
            icon: studyIcon,
            number: screeningReport?.data?.totalStudyCenters,
            name: "Total Study Centers",
        },
        {
            icon: mvpIcon,
            number: screeningReport?.data?.registeredMVP,
            name: "Registered MVPs",
        },
        {
            icon: prescreenIcon,
            number: screeningReport?.data?.totalPreScreenersSubmitted,
            name: "Pre-Screeners Submitted",
        },
        {
            icon: refferalIcon,
            number: screeningReport?.data?.referralEmailsCount,
            name: "Total Referral Emails Sent",
        },
        {
            icon: statesIcon,
            number: screeningReport?.data?.totalStatesCovered,
            name: "States Covered",
        },
        {
            icon: mvpIcon,
            number: screeningReport?.data?.awaitingMvpCount,
            name: "MVPs Awaiting Local Study Center",
        },
    ];

    // const downLoadExcel = async () => {
    //     // try {
    //     //     const response = await trigger().unwrap()
    //     //     console.log(response?.header, 'response')
    //     // } catch (error) {
    //     //     console.log(error)
    //     // }
    //     <a href="https://regel-medical-be.vercel.app/api/report/generateExcelReport" class="download-button">
    //         Download Excel Report
    //     </a>
    // }
    // const columns = [

    //     { accessor: "userPublicId", header: "User ID" },
    //     { accessor: "name", header: "Name" },
    //     { accessor: "email", header: "Email" },
    //     { accessor: "locationSelected", header: "Location Selected" },
    //     {
    //         accessor: "answers", header: "Q1: Zip", render: (value) => {
    //             console.log(value, 'value')
    //             return (
    //                 <div>{value ? 'value' : '-'}</div>
    //             )
    //         }
    //     },
    //     { accessor: "", header: "Q2: Age" },
    //     { accessor: "to", header: "Q3: Pain" },
    //     { accessor: "subject", header: "Q4: Surgery" },
    //     { accessor: "", header: "Q5: BMI (G/H/W)" },
    //     { accessor: "bmi", header: "BMI" },
    //     { accessor: "subject", header: "Q6: Tobacco" },
    //     { accessor: "", header: "Q7: T1 Diabetes" },
    //     { accessor: "", header: "Q8: MRI" },
    //     { accessor: "to", header: "% Complete" },
    //     { accessor: "assignedStudyCenterCenter", header: "Assigned Study Center" },
    //     { accessor: "date", header: "Date" },
    // ];
    // Define helper function to get answer by question title or section
    const getAnswer = (record, questionTitle) => {
        const question = record.answers.find(q => {
            if (questionTitle === "Zip") return q.title === "Zip Code";
            if (questionTitle === "Age") return q.title.includes("22 and 85 years old");
            if (questionTitle === "Pain") return q.title.includes("chronic low back pain");
            if (questionTitle === "Surgery") return q.title.includes("back surgery");
            if (questionTitle === "BMI (G/H/W)") {
                return q.title === "Gender" || q.title.includes("tall") || q.title.includes("weigh");
            }
            if (questionTitle === "Tobacco") return q.title.includes("smoke") || q.title.includes("tobacco");
            if (questionTitle === "T1 Diabetes") return q.title.includes("diabetes");
            if (questionTitle === "MRI") return q.title.includes("MRI");
            return false;
        });

        if (!question) return '-';

        if (questionTitle === "BMI (G/H/W)") {
            const gender = record.answers.find(q => q.title === "Gender")?.answer || '-';
            const height = record.answers.find(q => q.title.includes("tall"))?.answer || '-';
            const weight = record.answers.find(q => q.title.includes("weigh"))?.answer || '-';
            return `${gender}/${height}"/${weight}lbs`;
        }

        return question.answer || '-';
    };
    const columns = [
        {
            accessor: "userPublicId", header: "Referral ID", render: ({ userPublicId }) => {
                return (
                    <div>
                        {userPublicId ? userPublicId : '-'}
                    </div>
                )
            }
        },
        {
            accessor: "name", header: "Name", render: ({ name }) => {
                return (
                    <div>
                        {name === ' ' ? '-' : name}
                    </div>
                )
            }
        },
        {
            accessor: "email", header: "Email", render: ({ email }) => {

                return (
                    <div className='text-center'>
                        {email ? email : '-'}
                    </div>
                )
            }
        },
        {
            accessor: "locationSelected", header: "Location Selected", render: ({ locationSelected }) => {

                return (
                    <div className='text-center'>
                        {locationSelected ? locationSelected : '-'}
                    </div>
                )
            }
        },
        { accessor: (row) => getAnswer(row, "Zip"), header: "Q1: Zip" },
        { accessor: (row) => getAnswer(row, "Age"), header: "Q2: Age" },
        { accessor: (row) => getAnswer(row, "Pain"), header: "Q3: Pain" },
        { accessor: (row) => getAnswer(row, "Surgery"), header: "Q4: Surgery" },
        { accessor: (row) => getAnswer(row, "BMI (G/H/W)"), header: "Q5: BMI (G/H/W)" },
        {
            accessor: "bmi", header: "BMI", render: ({ bmi }) => {

                return (
                    <div className='text-center'>
                        {bmi ? bmi : '-'}
                    </div>
                )
            }
        },
        { accessor: (row) => getAnswer(row, "Tobacco"), header: "Q6: Tobacco" },
        { accessor: (row) => getAnswer(row, "T1 Diabetes"), header: "Q7: T1 Diabetes" },
        { accessor: (row) => getAnswer(row, "MRI"), header: "Q8: MRI" },
        // { accessor: (row) => calculateCompletion(row), header: "% Complete" },
        {
            accessor: "assignedStudyCenterCenter", header: "Assigned Study Center", render: ({ assignedStudyCenterCenter }) => {

                return (
                    <div className='text-center'>
                        {assignedStudyCenterCenter ? assignedStudyCenterCenter : '-'}
                    </div>
                )
            }
        },
        {
            // accessor: (row) => new Date(row.date).toLocaleDateString(),
            header: "Date",
            render: (row) => {
                return (
                    <span>
                        {row.date ? new Date(row.date).toLocaleDateString() : '-'}
                    </span>
                );
            }
        },
    ];

    console.log(values, 'values')

    if (isLoading) return <div>Loading...</div>
    return (
        <>
            <div className='flex justify-between items-center w-full my-4'>
                <h1 className='font-bold text-3xl'>Pre-Screening Report</h1>
                <a
                    href={`${baseUrl}/report/generateExcelReport?fromDate=${values?.fromDate}&toDate=${values?.toDate}&studyCenterId=${values?.studyCenterId}`}
                    className="bg-[#00B4F1] border-[1px] border-[#A2A1A833] shadow-none  h-[50px] text-white  rounded-[12px] flex items-center gap-2 p-2">
                    <CgNotes size={22} />
                    Download Report
                </a>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {totalCards.map((item, i) => {
                    return (
                        <>
                            <div key={i} className="bg-[#fff] border-[1px] border-[#0000001F] rounded-[12px] p-5 flex items-center gap-3">
                                <img src={item.icon} alt="" />
                                <div>
                                    <div className="text-[24px] font-[400] text-[#000]">
                                        {item.number}
                                    </div>
                                    <div className="text-[14px] font-[400] text-[#00000099]">
                                        {item.name}
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
            <div className='max-w-[1600px]'>
                <ReusableTable columns={columns} data={screeningReport?.data?.preScreeningReport} />
            </div>
        </>
    )
}

export default PreScreeningReport