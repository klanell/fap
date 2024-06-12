import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import React, {useState} from "react";
import {Standort} from "../../map/MapComponent";

function RegistrationMap (standort: Standort) {

    const [marker, setMarker] = useState<Standort[]>([]);


    return (
        <MapContainer center={[51.9481, 10.26517]} zoom={4.5} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                marker?.map((markerInstance) => {
                    return <Marker position={[standort.breitengrad, standort.laengengrad]}>
                    </Marker>
                })

            }

        </MapContainer>
    )
}
export default RegistrationMap;