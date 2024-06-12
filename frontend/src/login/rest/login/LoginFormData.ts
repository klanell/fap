import {AbstractFormLoginData} from "../AbstractFormLoginData";

export interface LoginFormData extends AbstractFormLoginData {
    loginName: string,
    passwort: {
        passwort: string;
    };
}