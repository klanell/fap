import React, {useEffect, useState} from 'react';
import "leaflet/dist/leaflet.css";
import {MapContainer, Popup, TileLayer, Marker, useMap} from 'react-leaflet'
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import {toast} from "react-toastify";
import "./Map.css";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [13, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

type MapComponentsProps = {
    sessionId: string,
    nutzername: string;
}

interface Benutzer {
    loginName: string;
    vorname: string;
    nachname: string;
}

export interface Standort {
    breitengrad: number;
    laengengrad: number;
}

function MapComponent({sessionId, nutzername}: MapComponentsProps) {
    const [marker, setMarker] = useState<Standort[]>([]);
    const [benutzer, setBenutzer] = useState<Benutzer[]>([]);

    useEffect(() => {
        if (benutzer.length > 0) {
            // Function to fetch and set markers
            const fetchMarkers = async () => {
                const newMarkers: Standort[] = [];
                for (const user of benutzer) {
                    try {
                        const response = await fetch(`http://localhost:8080/FAPServer/service/fapservice/getStandort?login=${nutzername}&session=${sessionId}&id=${user.loginName}`);
                        const data: Standort = await response.json();
                        newMarkers.push(data);
                    } catch (error) {
                        console.error(error);
                    }
                }
                setMarker(newMarkers);
            };
            fetchMarkers();
        }
    }, [benutzer]);

    useEffect(() => {
        fetch("http://localhost:8080/FAPServer/service/fapservice/getBenutzer?login=" + nutzername + "&session=" + sessionId).then(res => res.json()).then((res: {
                                                                                                                                                                "benutzerliste":
                                                                                                                                                                    Benutzer[]
                                                                                                                                                            }
        ) => {
            setBenutzer(res.benutzerliste);
        }).catch(error => {
            toast.error(error);
            console.log(error);
        })
    }, []);

    return (
        <MapContainer center={[51.9481, 10.26517]} zoom={6} scrollWheelZoom={true}
                      style={{height: "50rem", width: "80rem"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                marker?.map((markerInstance, i) => {
                    return <Marker position={[markerInstance.breitengrad, markerInstance.laengengrad]}>
                        <Popup>
                            {benutzer!.at(i)!.vorname} {benutzer!.at(i)!.nachname} ({benutzer!.at(i)!.loginName})
                        </Popup>
                    </Marker>
                })

            }

        </MapContainer>
    );
}

export default MapComponent;