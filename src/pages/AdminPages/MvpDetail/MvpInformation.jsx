import InfoHeader from './InfoHeader'

const MvpInformation = ({ mvpData }) => {

    return (
        <>
            <div className=" mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold mb-6">MVP Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Left Column */}
                    <div>
                        <div className="mb-4">
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="text-base text-gray-800">{mvpData.name}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-base text-gray-800">{mvpData.email}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-500">Contact Number</p>
                            <p className="text-base text-gray-800">{mvpData.contactNumber}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">State</p>
                            <p className="text-base text-gray-800">{mvpData.state}</p>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        <div className="mb-4">
                            <p className="text-sm text-gray-500">City</p>
                            <div className="flex items-center">
                                <p className="text-base text-gray-800">{mvpData.city}</p>

                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-500">Zip Code</p>
                            <p className="text-base text-gray-800">{mvpData.zipCode}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-500">Study Center</p>
                            <p className="text-base text-gray-800">{mvpData.studyCenter}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <p className="text-base text-gray-800">{mvpData.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MvpInformation