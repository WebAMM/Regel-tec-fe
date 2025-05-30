import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { BiSearch } from "react-icons/bi";
import PopUpSection from "./PopUpSection";
import { useLazyGetRadiusBasedStudyCenterQuery } from "../api/apiSlice";
import Loader from "./Loader";
import MarkerImage from '../assets/images/locationIcon.png';
 
const customIcon = L.icon({
  iconUrl: MarkerImage,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
 
const MyMapWithSearch = ({ center }) => {
  const [position, setPosition] = useState([33.9137, -98.4934]);
  const [zoom, setZoom] = useState(5);
  const [zipcode, setZipcode] = useState("");
  const [radiusBasedCenters, setRadiusBasedCenters] = useState(null);
 
  const [trigger, { isLoading, isFetching }] = useLazyGetRadiusBasedStudyCenterQuery();
 
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
 
  const mapRef = useRef();
 
  useEffect(() => {
    if (!selectedMarker || !mapRef.current) return;
 
    const updatePopupPosition = () => {
      const map = mapRef.current;
      const point = map.latLngToContainerPoint([selectedMarker.coordinates.lat, selectedMarker.coordinates.long]);
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
      const point = map.latLngToContainerPoint([center.coordinates.lat, center.coordinates.long]);
      setPopupPos({ x: point.x, y: point.y });
    };
 
    return (
      <>
        {centers?.map((center, idx) => (
          <Marker
            key={idx}
            position={[center.coordinates.lat, center.coordinates.long]}
            icon={customIcon}
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
    <div className="flex flex-col gap-5 relative" style={{ height: "100vh", width: "100%" }}>
      {/* Search Bar */}
      <div className="z-[410] absolute w-full flex items-center justify-center py-5">
        <div className="mx-auto p-4 flex gap-4">
          <div className="relative flex items-center rounded-[12px] min-w-[420px] bg-white shadow-sm overflow-hidden">
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
            className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
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
            left: popupPos.x,
            transform: "translate(-50%, -120%)",
            zIndex: 1000,
            backgroundColor: "white",
            padding: "12px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            pointerEvents: "auto",
            minWidth: "300px",
            width: "auto"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <PopUpSection center={selectedMarker} setSelectedMarker={setSelectedMarker} zipcode={zipcode} />
        </div>
      )}
    </div>
  );
};
 
export default MyMapWithSearch;