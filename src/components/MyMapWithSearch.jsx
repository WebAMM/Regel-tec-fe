import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { BiSearch } from "react-icons/bi";
import PopUpSection from "./PopUpSection";
import { useLazyGetRadiusBasedStudyCenterQuery } from "../api/apiSlice";
import Loader from "./Loader";

// This component will update the map view when position changes
function ChangeMapView({ position, zoom }) {
    const map = useMap();

    useEffect(() => {
        map.setView(position, zoom);
    }, [map, position, zoom]); // Include position and zoom in dependency array

    return null;
}

const MyMapWithSearch = () => {
    const [position, setPosition] = useState([51.505, -0.09]); // Default position
    const [zoom, setZoom] = useState(10);
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
            setZoom(10);
        } catch (error) {
            console.error("Error searching location:", error);
            alert("An error occurred while searching. Please try again.");
        }
    };

    return (
        <div className="flex flex-col gap-5 relative">
            <div className="z-[999] absolute w-full flex items-center justify-center py-5">
                <div className="mx-auto p-4 flex gap-4">
                    <div className="relative flex items-center rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden">
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

            <MapContainer center={position} zoom={zoom} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <ChangeMapView position={position} zoom={zoom} />
                {radiusBaseedCenters && radiusBaseedCenters.map((center, index) => (
                    <Marker
                        key={index}
                        position={[center?.coordinates?.lat, center?.coordinates?.long]}
                    >
                        <Popup>
                            <PopUpSection center={center} />
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MyMapWithSearch;