import { useLocation } from "react-router-dom";
import InfoHeader from "./InfoHeader"
import MvpInformation from "./MvpInformation"
import ScreenerQuestions from "./ScreenerQuestions";
import { useGetMvpDetailQuery } from "../../../api/apiSlice";

const MvpDetail = () => {
    const { state } = useLocation()
    const { data } = state
    const { data: mvpDetail, isLoading } = useGetMvpDetailQuery(data?.id)
    console.log(mvpDetail?.data, 'mvpDetail')

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className="space-y-2">
            <InfoHeader 
                userName={mvpDetail?.data?.user?.name} 
                mvpId={data?.id} 
            />
            <MvpInformation mvpData={mvpDetail?.data?.user} />
            <ScreenerQuestions questions={mvpDetail?.data?.PreScreenerAnswers} />
        </div>
    )
}

export default MvpDetail