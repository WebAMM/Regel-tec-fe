import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
 
const PopUpSection = ({ center, zipcode, setSelectedMarker }) => {
  const navigate = useNavigate();
  const handleCenter = (item) => {
    navigate("/prescreen", { state: { center: item, userLocation: zipcode } });
  };
  return (
    <div className="bg-white p-1 rounded-lg">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="font-[600] leading-[1] mb-1 text-[#121229] font-relay text-[16px]">
            Local Study Center
          </div>
          <p className="text-[#39394A]  text-[14px] font-relay">{center?.name}</p>
        </div>
        <button
          onClick={() => setSelectedMarker(null)}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "26px",
            lineHeight: "1",
            cursor: "pointer",
            color: "#888",
          }}
          aria-label="Close popup"
        >
          &times;
        </button>
      </div>
 
      <p className="text-gray-700 text-[14px] mb-5">
        {center?.city}, {center?.state}, {center?.zipCode}
      </p>
      <div className="flex items-center text-gray-600 mb-5 gap-2">
       <FaMapMarkerAlt />
        <span className="text-[14px] font-[400]">
          {center?.distanceFromUserLocation?.distance ||
            center?.distanceFromUser?.distance ||
            0.0}{" "}
          miles away
        </span>
      </div>
      <button
        className="w-full bg-[#00B4F1] text-white rounded-full py-2 hover:bg-cyan-600 transition-colors font-normal text-sm"
        onClick={() => handleCenter(center)}
      >
        Select This Location
      </button>
    </div>
  );
};
 
export default PopUpSection;