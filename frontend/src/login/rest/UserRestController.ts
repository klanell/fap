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

        // Super tolles Error Handling yay
    } catch (error) {
        console.error('Error submitting jsx Form', error);
        throw error;
    }

    const data = await response.json();


    //Hier kann nicht auf ergebnis gefiltert werden, weil Login kein Ergebnis hat, sondern nur die UserId liefert (╯°□°)╯︵ ┻━┻
    // if (data.ergebnis.equals(false)) {
    //     throw new Error(data.meldung);
    // }
    return data;
}

export const checkUsernameValid = async (username: string): Promise<any> => {
    let response: Response;
    try {
        response = await fetch('http://localhost:8080/FAPServer/service/fapservice/checkLoginName?id=' + username, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }


    }
    catch (error) {
        console.error('Error submitting jsx Form', error);
        throw error;
    }
    const data = await response.json();
    if(username.length <= 1) return false
    return data.ergebnis;
}