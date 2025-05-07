import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { BiSearch } from "react-icons/bi";

const MyMapWithSearch = () => {
    const [position, setPosition] = useState([51.505, -0.09]); // Default position
    const [zoom, setZoom] = useState(13);
    const [zipcode, setZipcode] = useState("");

    const handleSearch = async () => {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?postalcode=${zipcode}&format=json`
        );
        const data = await response.json();

        if (data && data[0]) {
            const { lat, lon } = data[0];
            setPosition([lat, lon]);
            setZoom(13);
        } else {
            alert("Location not found!");
        }
    };

    // Custom hook to change the map view when position is updated
    function ChangeMapView() {
        const map = useMap();
        useEffect(() => {
            map.setView(position, zoom); // This will update the map view when position changes
        }, [map]);

        return null;
    }

    return (
        <div className="flex flex-col gap-5 relative ">
            <div className="z-[999] absolute w-full flex items-center justify-center py-5">
                <div className=" mx-auto p-4 flex gap-4">
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
                        />
                    </div>
                    <button
                        className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>

            </div>

            <MapContainer center={position} zoom={zoom} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <ChangeMapView /> {/* Custom hook to update map view */}
                <Marker position={position}>
                    <Popup>
                        A marker at {position[0]}, {position[1]}!
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MyMapWithSearch;
