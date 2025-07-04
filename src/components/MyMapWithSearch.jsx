import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { BiSearch } from "react-icons/bi";
import PopUpSection from "./PopUpSection";
import { useLazyGetRadiusBasedStudyCenterQuery } from "../api/apiSlice";
import Loader from "./Loader";

// Import your profile images (add these to your assets)
import profile1 from "../assets/images/profile1.png";
import profile2 from "../assets/images/profile2.png";
import profile3 from "../assets/images/profile3.png";
import profile4 from "../assets/images/profile4.png";
import profile5 from "../assets/images/profile5.png";
import profile6 from "../assets/images/profile6.png";
import profile7 from "../assets/images/profile7.png";
import profile8 from "../assets/images/profile8.png";
import profile9 from "../assets/images/profile9.png";
import profile10 from "../assets/images/profile10.png";
import profile11 from "../assets/images/profile11.png";
import profile12 from "../assets/images/profile12.png";
import profile13 from "../assets/images/profile13.png";
import profile14 from "../assets/images/profile14.png";
import profile15 from "../assets/images/profile15.png";

const profileImages = [
  profile1,
  profile2,
  profile3,
  profile4,
  profile5,
  profile6,
  profile7,
  profile8,
  profile9,
  profile10,
  profile11,
  profile12,
  profile13,
  profile14,
  profile15,
];

// Function to create custom marker with profile image
const createCustomMarker = (profileImage) => {
  const iconHtml = `
    <div style="
      width: 50px;
      height: 60px;
      position: relative;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    ">
      <div style="
        width: 50px;
        height: 50px;
        background: #0ea5e9;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        position: relative;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      ">
        <div style="
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: white;
          position: absolute;
          top: 3px;
          left: 3px;
          overflow: hidden;
          transform: rotate(45deg);
        ">
          <img src="${profileImage}" alt="Profile" style="
            width: 100%;
            height: 100%;
            object-fit: cover;
          " />
        </div>
      </div>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    iconSize: [50, 60],
    iconAnchor: [25, 60],
    popupAnchor: [0, -60],
    className: "custom-marker",
  });
};

const MyMapWithSearch = ({ center }) => {
  const [position, setPosition] = useState([33.9137, -98.4934]);
  const [zoom, setZoom] = useState(5);
  const [zipcode, setZipcode] = useState("");
  const [radiusBasedCenters, setRadiusBasedCenters] = useState(null);

  const [trigger, { isLoading, isFetching }] =
    useLazyGetRadiusBasedStudyCenterQuery();

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });

  const mapRef = useRef();

  // Function to get random profile image
  const getRandomProfileImage = () => {
    return profileImages[Math.floor(Math.random() * profileImages.length)];
  };

  // Function to assign profile images to centers
  const assignProfileImages = (centers) => {
    return centers?.map((center) => ({
      ...center,
      profileImage: center.profileImage || getRandomProfileImage(),
    }));
  };

  useEffect(() => {
    if (!selectedMarker || !mapRef.current) return;

    const updatePopupPosition = () => {
      const map = mapRef.current;
      const point = map.latLngToContainerPoint([
        selectedMarker.coordinates.lat,
        selectedMarker.coordinates.long,
      ]);
      setPopupPos({ x: point.x, y: point.y });
    };

    updatePopupPosition();

    const map = mapRef.current;
    map.on("move zoom", updatePopupPosition);

    return () => {
      map.off("move zoom", updatePopupPosition);
    };
  }, [selectedMarker]);

  const Markers = ({ centers }) => {
    const map = useMapEvents({
      click: () => {
        setSelectedMarker(null);
      },
    });

    useEffect(() => {
      mapRef.current = map;
    }, [map]);

    const handleMarkerClick = (center) => {
      setSelectedMarker(center);
      const point = map.latLngToContainerPoint([
        center.coordinates.lat,
        center.coordinates.long,
      ]);
      setPopupPos({ x: point.x, y: point.y });
    };

    const centersWithImages = assignProfileImages(centers);

    return (
      <>
        {centersWithImages?.map((center, idx) => (
          <Marker
            key={idx}
            position={[center.coordinates.lat, center.coordinates.long]}
            icon={createCustomMarker(center.profileImage)}
            eventHandlers={{
              click: () => handleMarkerClick(center),
            }}
          />
        ))}
      </>
    );
  };

  const handleSearch = async () => {
    try {
      const studyCenter = await trigger(zipcode).unwrap();

      if (studyCenter?.data) {
        setPosition([
          studyCenter.data.coordinates.lat,
          studyCenter.data.coordinates.long,
        ]);
        setRadiusBasedCenters([studyCenter.data]);
      } else {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?postalcode=${zipcode}&format=json`
        );
        const data = await response.json();

        if (data && data[0]) {
          const { lat, lon } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
          setRadiusBasedCenters(null);
        } else {
          alert("Location not found!");
        }
      }
      setZoom(13);
    } catch (error) {
      console.error("Error searching location:", error);
      alert("An error occurred while searching. Please try again.");
    }
  };

  const accessToken = import.meta.env.VITE_MAP_ACCESS_TOKEN;

  return (
    <div
      className="flex flex-col gap-5 relative"
      style={{ height: "100vh", width: "100%" }}
    >
      {/* Search Bar */}
      <div className="z-[410] absolute w-full flex items-center justify-center py-5">
        <div className="mx-auto p-4 flex flex-wrap gap-4 lg:mt-0 sm:mt-[50px] mt-[50px]">
          <div className="relative flex items-center rounded-[12px] lg:min-w-[420px] sm:min-w-[320px] min-w-[280px] bg-white shadow-sm overflow-hidden">
            <div className="pl-4 text-gray-400">
              <BiSearch size={20} />
            </div>
            <input
              type="text"
              placeholder="Enter your zip code to find nearby study centers"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              className="w-full py-3 px-3 text-gray-500 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
          <button
            disabled={isLoading}
            className="px-4 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 "
            onClick={handleSearch}
          >
            {isLoading || isFetching ? <Loader /> : "Search"}
          </button>
        </div>
      </div>

      {/* Leaflet Map */}
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url={`https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token=${accessToken}`}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Markers */}
        {radiusBasedCenters ? (
          <Markers centers={radiusBasedCenters} />
        ) : (
          <Markers centers={center} />
        )}
      </MapContainer>

      {selectedMarker && (
        <div
          style={{
            position: "absolute",
            top: popupPos.y,
            left: popupPos.x < 100 ? "160px" : popupPos.x,
            transform: "translate(-50%, -120%)",
            zIndex: 1000,
            backgroundColor: "white",
            padding: "12px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            pointerEvents: "auto",
            minWidth: "300px",
            width: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <PopUpSection
            center={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            zipcode={zipcode}
          />
        </div>
      )}
    </div>
  );
};

export default MyMapWithSearch;
