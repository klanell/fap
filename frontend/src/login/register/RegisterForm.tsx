import React, {useState} from 'react';
// import '../loginForm/LoginForm.css';
import './RegisterForm.css';

import {FaCity, FaGlobe, FaLock, FaMapPin, FaPhone, FaRoad, FaUser} from "react-icons/fa";
import {RegisterFormData} from "../rest/register/RegisterFormData";
import {checkUsernameValid, postForm} from "../rest/UserRestController";
import {useNavigate} from 'react-router-dom';
import {IoMail} from "react-icons/io5";
import MapComponent, {Standort} from "../../map/MapComponent";
import {Bounce, toast} from "react-toastify";


const RegisterForm: React.FC = () => {

    const [formData, setFormData] = React.useState<RegisterFormData>({
        email: {adresse: ""},
        land: "",
        loginName: "",
        nachname: "",
        ort: "",
        passwort: {passwort: ""},
        plz: "",
        strasse: "",
        telefon: "",
        vorname: ""

    })
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<String | null>(null);
    const [submitted, setSubmitted] = React.useState(false);
    const [apiResponse, setApiResponse] = React.useState(null);
    const navigate = useNavigate();
    const [standort, setStandort] = useState<Standort>();


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

    const checkUsername = () => {
        const loginNameInputField = document.getElementsByName("loginName")[0] as HTMLFormElement;
        //Sobald hier einer mehr als eine loginName-Komponente hinzufügt krachts gewaltig!
        if (formData.loginName !== "") {
            checkUsernameValid(formData.loginName).then((valid) => {
                loginNameInputField.style.outline = valid ? "2px solid green" : "2px solid red";
                if (!valid) {
                    toast.warn('Nutzername ist vergeben', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            });
        } else loginNameInputField.style.outline = "none";
    }


    //Handelt den Traffic hin zur API und feuert die Form dagegen
    const onPost = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);


        try {
            const data = await postForm(formData, 'http://localhost:8080/FAPServer/service/fapservice/addUser');
            //Wenn von der API hier nix zurück kommt wirds unangenehm. Statuscodes? Never heard of her!
            if (data.ergebnis) {
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
        if (!submitted) {
            event.preventDefault();
        }
    }

    const handleBlurOnLocationChange = () => {
        try {
            fetch(`http://localhost:8080/FAPServer/service/fapservice/getStandortPerAdresse?land=${formData.land}&ort=${formData.ort}&plz=${formData.plz}&strasse=${formData.strasse}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'} // Setzt den Content-Type im Header
            }).then(
                res => res.json()).then((res: Standort
            ) => {
                if (res) {
                    setStandort(res)
                }
            }).catch(error => {
                console.log(error);
            });
            // Überprüft, ob die Anfrage erfolgreich war

        } catch (error) {
            console.error(error); // Loggt Fehler
            setError((error as Error).message); // Setzt den Fehlerstatus
        } finally {
            setLoading(false); // Setzt den Loading-Zustand auf false
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
                            <input type="text" placeholder="First Name" name="vorname" value={formData.vorname}
                                   onChange={handleChange}
                                   required/>
                            <FaUser className='register-icon'/>
                        </div>
                        <div className="input-container">
                            <input type="text" placeholder="Username" name="loginName" value={formData.loginName}
                                   onChange={handleChange}
                                   onBlur={checkUsername}
                                   required/>
                            <FaUser className='register-icon'/>
                        </div>
                    </div>

                    <div className="input-box">
                        <div className="input-container"><input type="text" placeholder="Surname" name="nachname"
                                                                value={formData.nachname}
                                                                onChange={handleChange}
                                                                required/>
                            <FaUser className='register-icon'/>
                        </div>
                        <div className="input-container"><input type="password" placeholder="Password"
                                                                name="passwort"
                                                                value={formData.passwort.passwort}
                                                                onChange={handleChange}
                                                                required/>
                            <FaLock className='register-icon'/></div>

                    </div>
                    <div className="input-box">
                        <div className="input-container"><input type="email" placeholder="E-Mail"
                                                                name="email"
                                                                value={formData.email.adresse} onChange={handleChange}
                                                                required/>
                            <IoMail className='register-icon'/>
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
                                   onBlur={handleBlurOnLocationChange}
                                   required/>
                            <FaCity className='register-icon'/>
                        </div>
                        <div className="input-container">
                            <input type="text" placeholder="Country" name="land" value={formData.land}
                                   onChange={handleChange}
                                   onBlur={handleBlurOnLocationChange}
                                   required/>
                            <FaGlobe className='register-icon'/>
                        </div>
                    </div>

                    <div className="input-box">
                        <div className="input-container"><input type="text" placeholder="Postal Code" name="plz"
                                                                value={formData.plz}
                                                                onChange={handleChange}
                                                                onBlur={handleBlurOnLocationChange}
                                                                required/>
                            <FaMapPin className='register-icon'/>
                        </div>
                        <div className="input-container"><input type="text" placeholder="Street"
                                                                name="strasse"
                                                                value={formData.strasse}
                                                                onChange={handleChange}
                                                                onBlur={handleBlurOnLocationChange}
                                                                required/>
                            <FaRoad className='register-icon'/></div>

                    </div>
                    <div className="input-box">
                        <div className="input-container"><input type="text" placeholder="Telephone"
                                                                name="telefon"
                                                                value={formData.telefon} onChange={handleChange}
                                                                required/>
                            <FaPhone className='register-icon'/>
                        </div>
                        <div className="input-container">
                            <div className="registrationMap">
                                <MapComponent nutzername={formData.loginName} sessionId={""}
                                              liveStandOrt={standort}></MapComponent>
                            </div>
                        </div>

                    </div>
                    <div className="input-box">
                        <div className="input-container"><input type="text" placeholder="Please solve:"
                                                                required={false}/>
                            <div><FaLock className='register-icon'/></div>

                        </div>
                        <div className="input-box"></div>

                    </div>
                    <div className="input-box">
                        <div className="input-container-single">
                            <button type="submit" disabled={loading}>
                                {loading ? 'Submitting...' : 'Register'}
                            </button>
                        </div>
                    </div>
                    <div className="input-box">
                        <div className="input-container-single">
                            <div className="register-link"><p>Already registered? <a href="/">Login</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    );
}
export default RegisterForm;