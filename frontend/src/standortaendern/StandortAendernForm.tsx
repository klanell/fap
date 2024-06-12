import React from 'react';
import './StandortAendernForm.css'
import {useNavigate} from "react-router-dom"

import {MdLandscape, MdLocalPostOffice, MdPlace} from "react-icons/md";
import {FaRoad} from "react-icons/fa";
import {StandortAenderFormData} from "./rest/StandortAenderFormData";
import {changeStandort} from "./rest/StandortRestController";


type StandortAendernFormProps = { nutzername: string, sessionId: string }

// Typendefinition für die Props des StandortAenderForm-Komponenten
type StandortAenderFormProps = {
    nutzername: string; // Der Benutzername des aktuellen Nutzers
    sessionId: string; // Die Session-ID, die zur Identifizierung der Sitzung verwendet wird
};

/**
 * Komponente zum Ändern des Standorts eines Nutzers.
 * Diese Komponente ermöglicht es einem Nutzer, seine Adresse zu aktualisieren.
 */
const StandortAenderForm = ({nutzername, sessionId}: StandortAendernFormProps) => {

    // Initialisiert den Zustand für die Formulardaten
    const [formData, setFormData] = React.useState<StandortAenderFormData>({
        country: "",
        postalCode: "",
        place: "",
        street: "",
    });

    // Hook zum Navigieren zwischen Seiten
    const navigate = useNavigate();

    // Zustände für Loading-Indikator und Fehlermeldungen
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<String | null>(null);

    /**
     * Handler für Änderungen in den Eingabefeldern.
     * Aktualisiert den Zustand von formData entsprechend dem Wert des Eingabefeldes.
     * @param e Das ChangeEvent des Eingabefeldes.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));

        console.log("Daten geändert!");
    };

    /**
     * Handler für das Absenden des Formulars.
     * Ruft die changeStandort-Funktion auf, um den Standort zu aktualisieren.
     * Behandelt Loading-Zustand und Fehler.
     * @param event Das Formular-Submit-Event.
     */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Verhindert das Standardverhalten des Formulars
        setLoading(true); // Setzt den Loading-Zustand auf true
        setError(null); // Setzt den Fehler auf null

        try {
            const data = await changeStandort(formData, {nutzername, sessionId}); // Ruft die changeStandort-Funktion auf
            console.log('Successfully changed location'); // Loggt Erfolgsmeldung
        } catch (error) {
            console.error(error); // Loggt Fehler
            setError((error as Error).message); // Setzt den Fehlerstatus
        } finally {
            setLoading(false); // Setzt den Loading-Zustand auf false
            navigate('/'); // Navigiert zur Startseite
        }
    };

    // JSX-Struktur der Komponente
    return (
        <div className="wrapper">
            <h1>Standort ändern</h1>
            <form onSubmit={handleSubmit}>
                {/* Eingabefelder für Country, PostalCode, Place und Street */}
                <div className="input-box">
                    <div className="input-container">
                        <input name="country" type="text" placeholder="Country" value={formData.country} onChange={handleChange} required />
                        <MdLandscape className='icon-standort'/> {/* Icon für das Eingabefeld */}
                    </div>
                </div>
                <div className="input-box">
                    <div className="input-container">
                        <input name="postalCode" type="text" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required />
                        <MdLocalPostOffice className='icon-standort'/>
                    </div>
                </div>
                <div className="input-box">
                    <div className="input-container">
                        <input name="place" type="text" placeholder="Place" value={formData.place} onChange={handleChange} required />
                        <MdPlace className='icon-standort'/>
                    </div>
                </div>
                <div className="input-box">
                    <div className="input-container">
                        <input name="street" type="text" placeholder="Street" value={formData.street} onChange={handleChange} required />
                        <FaRoad className='icon-standort'/>
                    </div>
                </div>
                {/* Submit-Button */}
                <button type="submit" disabled={loading}>
                    {loading? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default StandortAenderForm;