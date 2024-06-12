import {StandortAenderFormData} from "./StandortAenderFormData";

// Definiert die Eigenschaften für das SubmitFormComponent
type SubmitFormProps = {
    nutzername: string; // Der Benutzername des aktuellen Nutzers
    sessionId: string; // Die Session-ID, die zur Identifizierung der Sitzung verwendet wird
};

/**
 * Ändert den Standort eines Nutzers basierend auf den Daten, die über eine Form bereitgestellt wurden.
 * Dieser Prozess besteht aus zwei Schritten:
 * 1. Eine GET-Anfrage, um den Standort basierend auf Adresse zu erhalten.
 * 2. Ein PUT-Anruf, um den neuen Standort zu speichern.
 *
 * @param formData - Enthält die Daten, die von der Form bereitgestellt wurden, einschließlich Land, Ort, PLZ und Straße.
 * @param props - Objekt mit dem Benutzernamen und der Session-ID.
 * @returns Ein Promise, der die Antwortdaten zurückgibt oder einen Fehler auslöst, falls einer auftritt.
 */
export const changeStandort = async (formData: StandortAenderFormData, {
    nutzername,
    sessionId
}: SubmitFormProps): Promise<any> => {
    let response: Response; // Variable zum Speichern der HTTP-Antwort

    try {
        // Erstellt die URL für die GET-Anfrage, indem die bereitgestellten Adressdaten hinzugefügt werden
        response = await fetch(`http://localhost:8080/FAPServer/service/fapservice/getStandortPerAdresse?land=${formData.country}&ort=${formData.place}&plz=${formData.postalCode}&strasse=${formData.street}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'} // Setzt den Content-Type im Header
        })

        // Überprüft, ob die Anfrage erfolgreich war
        if (!response.ok) {
            throw new Error(`HTTP error Status: ${response.status}`); // Wirft einen Fehler, wenn die Anfrage nicht erfolgreich war
        }

        // Konvertiert die Antwort in JSON
        const getResponseData = await response.json();

        // Vorbereitet die Daten für den PUT-Anruf
        const putData = {
            loginName: nutzername, // Setzt den Login-Namen des Nutzers
            sitzung: sessionId, // Setzt die Session-ID
            standort: {
                breitengrad: getResponseData.breitengrad, // Setzt den Breiten- und Längengrad aus der GET-Antwort
                laengengrad: getResponseData.laengengrad,
            },
        };

        // Führt den PUT-Anruf durch, um den neuen Standort zu speichern
        const putResponse = await fetch(`http://localhost:8080/FAPServer/service/fapservice/setStandort`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json', // Akzeptiert JSON als Antwortformat
                'Content-Type': 'application/json', // Sendet JSON im Body
            },
            body: JSON.stringify(putData), // Konvertiert die Datenobjekte in einen JSON-String
        });

        // Überprüft, ob der PUT-Anruf erfolgreich war
        if (!putResponse.ok) {
            throw new Error(`HTTP error Status: ${putResponse.status}`); // Wirft einen Fehler, wenn der PUT-Anruf nicht erfolgreich war
        }

        // Konvertiert die Antwort des PUT-Anrufs in JSON
        const data = await putResponse.json();

        // Loggt die Antwortdaten
        console.log(data);

        // Gibt die Antwortdaten zurück
        return data;

    } catch (error) {
        // Fängt alle Fehler ab und loggt sie
        console.error('Error submitting jsx Form', error);
        throw error; // Wirft den Fehler weiter, damit er behandelt werden kann
    }
};