import React, {useEffect, useState} from 'react';
import "leaflet/dist/leaflet.css";
import {MapContainer, Popup, TileLayer, Marker} from 'react-leaflet'
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "./Map.css";

// Definieren eines benutzerdefinierten Icons für Marker
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [13, 41]
});

// Setzen des benutzerdefinierten Icons als Standard für alle Marker
L.Marker.prototype.options.icon = DefaultIcon;

// Typendefinitionen für die Props der Komponente und die Datenstruktur der Marker
type MapComponentsProps = {
    sessionId: string,
    nutzername: string,
    selectedBenutzer?: Benutzer[], // Optionaler Parameter für ausgewählte Benutzer
    liveStandOrt?: Standort // Optionaler Parameter für den aktuellen Standort
};

interface Benutzer {
    loginName: string;
    vorname: string;
    nachname: string;
};

export interface Standort {
    breitengrad: number;
    laengengrad: number;
};

function MapComponent({ sessionId, nutzername, selectedBenutzer, liveStandOrt }: MapComponentsProps) {
    // Initialisieren des States für die Marker
    const [marker, setMarker] = useState<Standort[]>([]);

    // Marker werden auf Basis der ausgewählten Benutzer aktualisiert
    useEffect(() => {
        if (selectedBenutzer && selectedBenutzer.length > 0) {
            const fetchMarkers = async () => {
                const newMarkers: Standort[] = [];
                for (const user of selectedBenutzer) {
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
        } else if (liveStandOrt) {
            const newMarkers: Standort[] = [liveStandOrt];
            setMarker(newMarkers);
        }
    }, [selectedBenutzer]); // Abhängigkeit dieses Effekts von selectedBenutzer

    // Effekt, der die Marker basierend auf dem aktuellen Standort aktualisiert
    useEffect(() => {
        if (liveStandOrt) {
            const newMarkers: Standort[] = [liveStandOrt];
            setMarker(newMarkers);
        }
    }, [liveStandOrt]); // Abhängigkeit dieses Effekts von liveStandOrt

    // Rendering der Karte und der Marker
    return (
        <MapContainer center={[51.9481, 10.26517]} zoom={6} scrollWheelZoom={true} style={{ height: "50rem" }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {marker.map((markerInstance, i) => (
                <Marker position={[markerInstance.breitengrad, markerInstance.laengengrad]}>
                    <Popup>
                        {selectedBenutzer && selectedBenutzer.length > 0? (
                            <>
                                {`${selectedBenutzer[i].vorname} ${selectedBenutzer[i].nachname} (${selectedBenutzer[i].loginName})`}
                            </>
                        ) : null}
                        {liveStandOrt? nutzername : null}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default MapComponent;
