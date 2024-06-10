import {StandortAenderFormData} from "./StandortAenderFormData";

type SubmitFormProps={
    nutzername: string,
    sessionId: string;
}

export const changeStandort = async (formData: StandortAenderFormData, {nutzername, sessionId}:SubmitFormProps): Promise<any> => {
    let response: Response;
    try {
        response = await fetch(`http://localhost:8080/FAPServer/service/fapservice/getStandortPerAdresse` + '?land=' + formData.country + '&ort=' + formData.place + '&plz=' + formData.postalCode + '&strasse=' + formData.street, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then()

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const getResponseData = await response.json();


        // PUT-Anruf
        const putData = {
            loginName: nutzername,
            sitzung: sessionId,
            standort: {
                breitengrad: getResponseData.breitengrad, // Breiten- und Längengrade aus der GET-Antwort
                laengengrad: getResponseData.laengengrad,
            },
        };
        const putResponse = await fetch(`http://localhost:8080/FAPServer/service/fapservice/setStandort`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(putData),
        });

        if (!putResponse.ok) {
            throw new Error(`HTTP error Status: ${putResponse.status}`);
        }

        const data = await putResponse.json();
        // Super tolles Error Handling yay
        //Sind Statuscodes too much to ask?
        console.log(data)
        return data;

        //return to startseite



    } catch (error) {
        console.error('Error submitting jsx Form', error);
        throw error;
    }

}