import React from 'react';
import "leaflet/dist/leaflet.css";
import {MapContainer, Popup, TileLayer, Marker, useMap} from 'react-leaflet'

function MapComponent() {
    return (

        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{height: "20vh"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default MapComponent;