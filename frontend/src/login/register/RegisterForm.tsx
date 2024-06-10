import React from 'react';
import '../loginForm/LoginForm.css';
import './RegisterForm.css';

import {FaLock, FaUser} from "react-icons/fa";
import {RegisterFormData} from "../rest/register/RegisterFormData";
import {postForm} from "../rest/UserRestController";
import {useNavigate} from 'react-router-dom';

const RegisterForm: React.FC = () => {

    // Zu Testzwecken hinterlegt, zur Demo removen. Kanns mir echt nicht antuen bei jedem Scheiß Registrierungstest 10 fucking Felder auszufüllen
    const [formData, setFormData] = React.useState<RegisterFormData>({
        email: {adresse: ""},
        land: "Deutschland",
        loginName: "",
        nachname: "",
        ort: "Großengottern",
        passwort: {passwort: ""},
        plz: "99991",
        strasse: "Marktstraße 48",
        telefon: "036022 942 0",
        vorname: ""

    })
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<String | null>(null);
    const [submitted, setSubmitted] = React.useState(false);
    const [apiResponse, setApiResponse] = React.useState(null);
    const navigate = useNavigate();

    //Wird bei jedem Change in der Form invoked und ändert das oben initialisierte Interface entsprechend
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setFormData(prevFormData => {
            if (name === 'passwort') {
                return {
                    ...prevFormData,
                    passwort: {passwort: value},
                };
            } else if (name === 'email') {
                return {
                    ...prevFormData,
                    email: {adresse: value},
                };
            } else {
                return {
                    ...prevFormData,
                    [name]: value,
                };
            }
        });
    };

    //Handelt den Traffic hin zur API und feuert die Form dagegen
    const onPost = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await postForm(formData,'http://localhost:8080/FAPServer/service/fapservice/addUser');
            //Wenn von der API hier nix zurück kommt wirds unangenehm. Statuscodes? Never heard of her!
            if(data.ergebnis){
                setApiResponse(data.ergebnis) //Hier immer "true"
                //Form wurde vom Server akzeptiert, wir können auf die Hauptseite redirecten
                setSubmitted(true);
                //Redirect mit Navigate
                navigate("/");
            }
            console.log('Successfully registered User');
        } catch (error) {
            console.error(error)
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    }
    //Blockt den Request bei einer fehlerhaften Registrierung weg -> i.e Api sagt: Ergebnis: false und es kommt kein Redirect auf Login
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if(!submitted){
            event.preventDefault();
        }
    }


    //Non - Portable Callback Hell
    //Tatsächliche (fast) HTML-Implementierung der Komponente

    return (
        <div className="register-wrapper">
            <form onSubmit={onPost}>
                <div className="personalInformation">
                <h1>Register</h1>
                <h2>to Friends and Places</h2>
                <div className="input-box">
                    <div className="input-container">
                        <input type="text" placeholder="First Name" name="vorname" value={formData.vorname} onChange={handleChange}
                               required/>
                        <FaUser className='register-icon'/>
                    </div>
                    <div className="input-container">
                        <input type="text" placeholder="Username" name="loginName" value={formData.loginName} onChange={handleChange}
                               required/>
                        <FaUser className='register-icon'/>
                    </div>
                </div>

                <div className="input-box">
                    <div className="input-container"><input type="text" placeholder="Surname" name="nachname" value={formData.nachname}
                                                            onChange={handleChange}
                                                            required/>
                        <FaLock className='register-icon'/>
                    </div>
                    <div className="input-container"><input type="password" placeholder="Password"
                                                            name="passwort"
                                                            value={formData.passwort.passwort} onChange={handleChange}
                                                            required/>
                        <FaLock className='register-icon'/></div>

                </div>
                <div className="input-box">
                    <div className="input-container"><input type="email" placeholder="E-Mail"
                                                            name="email"
                                                            value={formData.email.adresse} onChange={handleChange}
                                                            required/>
                        <FaUser className='register-icon'/>
                    </div>
                    <div className="input-container"></div>
                </div>
                </div>

                {/*Locationstuff*/}

                <div className="location">
                    <h1>Your Location</h1>
                    <h2>tell us more about yourself</h2>
                    <div className="input-box">
                        <div className="input-container">
                            <input type="text" placeholder="City" name="ort" value={formData.ort}
                                   onChange={handleChange}
                                   required/>
                            <FaUser className='register-icon'/>
                        </div>
                        <div className="input-container">
                            <input type="text" placeholder="Country" name="land" value={formData.land}
                                   onChange={handleChange}
                                   required/>
                            <FaUser className='register-icon'/>
                        </div>
                    </div>

                    <div className="input-box">
                        <div className="input-container"><input type="text" placeholder="Postal Code" name="plz"
                                                                value={formData.plz}
                                                                onChange={handleChange}
                                                                required/>
                            <FaLock className='register-icon'/>
                        </div>
                        <div className="input-container"><input type="text" placeholder="Street"
                                                                name="strasse"
                                                                value={formData.strasse}
                                                                onChange={handleChange}
                                                                required/>
                            <FaLock className='register-icon'/></div>

                    </div>
                    <div className="input-box">
                        <div className="input-container"><input type="text" placeholder="Telephone"
                                                                name="telefon"
                                                                value={formData.telefon} onChange={handleChange}
                                                                required/>
                            <FaUser className='register-icon'/>
                        </div>
                        <div className="input-container"></div>
                    </div>
                    <div className="input-box">
                        <div className="input-container"><input type="text" placeholder="Please solve:"
                                                                required={false}/>
                            <div><FaLock className='register-icon'/></div>

                        </div>
                        <div className="input-container">
                            <button type="submit" disabled={loading}>
                                {loading ? 'Submitting...' : 'Register'}
                            </button>
                            {/*Absolutes Kriegsverbrechen, aber funktioniert*/}
                            <div><FaLock className='register-icon'/></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default RegisterForm;