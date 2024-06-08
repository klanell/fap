export interface RegisterFormData {
    loginName: string;
    /*WARUM???*/
    passwort: {
        passwort: string;
    };
    vorname: string;
    nachname: string;
    strasse: string;
    plz: string;
    ort: string;
    land: string;
    telefon: string;
    /*WARUM???*/
    email: {
        adresse: string;
    };
}
