import React, {useEffect, useState} from 'react';
import "leaflet/dist/leaflet.css";
import {MapContainer, Popup, TileLayer, Marker, useMap} from 'react-leaflet'
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [13, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapComponent() {
    const [marker, setMarker] = useState<{ breitengrad: number, laengengrad: number }>();
    useEffect(() => {
        fetch("http://localhost:8080/FAPServer/service/fapservice/getStandort?login=tester&session=6443ca6b-b511-438d-90c0-d23c4932d0c4&id=tester").then(res => res.json()).then((res: {
            breitengrad: number,
            laengengrad: number
        }) => {
            setMarker(res);
        }).catch(error => {
            console.log(error);
        })
    });

    return (
        <MapContainer center={[51.9481, 10.26517]} zoom={6} scrollWheelZoom={true}
                      style={{height: "50rem", width: "80rem"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                marker ?
                    <Marker position={[marker.breitengrad, marker.laengengrad]}>
                        <Popup>
                            Klara ist hier
                        </Popup>
                    </Marker> : null
            }

        </MapContainer>
    );
}

export default MapComponent;