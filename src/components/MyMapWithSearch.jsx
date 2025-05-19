import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { BiSearch } from "react-icons/bi";
import PopUpSection from "./PopUpSection";
import { useLazyGetRadiusBasedStudyCenterQuery } from "../api/apiSlice";
import Loader from "./Loader";
import MarkerImage from '../assets/images/marker.png'
import { FaMapMarkerAlt } from "react-icons/fa";
import { renderToStaticMarkup } from "react-dom/server";

// This component will update the map view when position changes
function ChangeMapView({ position, zoom }) {
    const map = useMap();

    useEffect(() => {
        map.setView(position, zoom);
    }, [map, position, zoom]); // Include position and zoom in dependency array

    return null;
}
const iconMarkup = renderToStaticMarkup(<FaMapMarkerAlt size={32} color="#00a6f4" />);

// const customIcon = L.icon({
//     iconUrl: MarkerImage,
//     iconSize: [32, 32], // Adjust the size as needed
//     iconAnchor: [16, 32], // Point of the icon which corresponds to marker's location
//     popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
// });
const customIcon = L.divIcon({
    html: iconMarkup,
    className: '', // Optional: add custom class names if needed
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const MyMapWithSearch = () => {
    const [position, setPosition] = useState([35.481918, -97.508469]); // Default position
    const [zoom, setZoom] = useState(4);
    const [zipcode, setZipcode] = useState("");
    const [radiusBaseedCenters, setRadiusBaseedCenters] = useState(null);

    const [trigger, { isLoading }] = useLazyGetRadiusBasedStudyCenterQuery();

    const handleSearch = async () => {
        try {
            // Get study centers first
            const studyCenter = await trigger(zipcode).unwrap();

            if (studyCenter?.data && studyCenter.data.length > 0) {
                // Set position from study center data
                setPosition([
                    studyCenter.data[0].coordinates.lat,
                    studyCenter.data[0].coordinates.long
                ]);
                setRadiusBaseedCenters(studyCenter.data);
            } else {
                // Fallback to OpenStreetMap if no study centers found
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?postalcode=${zipcode}&format=json`
                );
                const data = await response.json();

                if (data && data[0]) {
                    const { lat, lon } = data[0];
                    setPosition([parseFloat(lat), parseFloat(lon)]);
                } else {
                    alert("Location not found!");
                }
            }

            // Always zoom to 13 when searching
            setZoom(4);
        } catch (error) {
            console.error("Error searching location:", error);
            alert("An error occurred while searching. Please try again.");
        }
    };
    return (
        <div className="flex flex-col gap-5 relative">
            <div className="z-[999] absolute w-full flex items-center justify-center py-5">
                <div className="mx-auto p-4 flex gap-4">
                    <div className="relative flex items-center rounded-[12px] min-w-[420px]  bg-white shadow-sm overflow-hidden">
                        <div className="pl-4 text-gray-400">
                            <BiSearch size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your zip code to find nearby study centers"
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                            className="w-full py-3 px-3 text-gray-500 focus:outline-none "
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                        />
                    </div>
                    <button
                        className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
                        onClick={handleSearch}
                    >
                        {isLoading ? <Loader /> : 'Search'}
                    </button>
                </div>
            </div>

            <MapContainer center={position} zoom={zoom} style={{ height: "100vh", width: "100%" }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <ChangeMapView position={position} zoom={zoom} />
                {radiusBaseedCenters && radiusBaseedCenters.map((center, index) => (
                    <Marker
                        key={index}
                        position={[center?.coordinates?.lat, center?.coordinates?.long]}
                        icon={customIcon}
                    >
                        <Popup>
                            <PopUpSection center={center} zipcode={zipcode} />
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MyMapWithSearch;