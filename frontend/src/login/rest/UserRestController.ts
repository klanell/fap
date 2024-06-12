import {RegisterFormData} from "./register/RegisterFormData";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {AbstractFormLoginData} from "./AbstractFormLoginData";

export const postForm = async (formData: AbstractFormLoginData, url: string): Promise<any> => {
    let response: Response;
    try {
        response = await fetch(url, {
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

    //Wie kann man einfach nicht konsequent ein scheiß Attribut an der Anfrage lassen (╯°□°)╯︵ ┻━┻
    // if (data.ergebnis.equals(false)) {
    //     throw new Error(data.meldung);
    // }
    return data;
}