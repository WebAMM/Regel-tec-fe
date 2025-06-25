import { CiGlobe } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import { MdForwardToInbox } from "react-icons/md";
import { useGetEmailByIdQuery } from "../../api/apiSlice";

const EmailDetail = ({ open, onClose, id }) => {
  const { data: emailDetail, isLoading } = useGetEmailByIdQuery(id);

  // console.log(emailDetail?.data, 'emailDetail')
  if (!open) return null;
  if (isLoading) return <div></div>;

  return (
    <div className="fixed inset-0 bg-[#00000085] z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            New Pre-Screener Submission for [Study Center Name]
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 text-xl font-bold cursor-pointer"
          >
            &times;
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">From Email</p>
            <p className="text-sm">{emailDetail?.data?.fromEmail}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">To Email</p>
            <p className="text-sm">{emailDetail?.data?.toEmail}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Date</p>
          <p className="text-sm">{emailDetail?.data?.createdAt}</p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-gray-500 mb-1">
            {emailDetail?.data?.subject}
          </p>
          <div className="border-t border-gray-200 pt-3">
            <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
              {/* <p className="text-sm mb-2">{emailDetail?.data?.body}</p> */}
              <p className="text-sm mb-2" style={{ whiteSpace: "pre-line" }}>
                {emailDetail?.data?.body}
              </p>

              <div className="flex items-center text-sm mb-1">
                <span className="text-gray-400 mr-2">
                  <MdForwardToInbox />
                </span>
                <span className="text-blue-600">
                  support@regeltecstudies.com
                </span>
              </div>

              <div className="flex items-center text-sm">
                <span className="text-gray-400 mr-2">
                  <CiGlobe />
                </span>
                <a
                  href="https://regeltec.com/"
                  target="_blank"
                  className="text-blue-600"
                >
                  www.regeltecstudies.com
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">Attachment</p>
          <div className="flex items-center bg-amber-50 px-4 py-3 rounded-md cursor-pointer">
            <div className="flex items-center flex-grow">
              <span className="text-amber-600 mr-2">
                <GrAttachment />
              </span>
              <span className="text-sm">Pre-Screener.PDF</span>
            </div>
            <button className="text-gray-500">
              <FiDownload />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
