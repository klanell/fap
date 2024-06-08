import {RegisterFormData} from "./RegisterFormData";
import {Simulate} from "react-dom/test-utils";
import canPlayThrough = Simulate.canPlayThrough;
import error = Simulate.error;

export const submitForm = async (formData: RegisterFormData): Promise<any> => {
    let response: Response;
    try {
        response = await fetch(`http://localhost:8080/FAPServer/service/fapservice/addUser`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, body: JSON.stringify(formData)
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error submitting jsx Form', error);
        throw error;
    }

    const data = await response.json();
    // Super tolles Error Handling yay
    //Sind Statuscodes too much to ask?
    if (!data.ergebnis) {
        throw new Error(data.meldung);
    }
    return data;
}