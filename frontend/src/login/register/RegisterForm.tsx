import React from 'react';
import '../loginForm/LoginForm.css';
import './RegisterForm.css';

import {FaLock, FaUser} from "react-icons/fa";
import {RegisterFormData} from "../rest/register/RegisterFormData";
import {postForm} from "../rest/UserRestController";

const RegisterForm: React.FC = () => {

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

    const onPost = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await postForm(formData,'http://localhost:8080/FAPServer/service/fapservice/addUser');
            console.log('Successfully registered User');
        } catch (error) {
            console.error(error)
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="register-wrapper">
            <form onSubmit={onPost}>
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
                {/*<div className="remember-forgot">*/}
                {/*    <label><input type="checkbox"/>Remember me</label>*/}
                {/*</div>*/}
                <div className="input-box">
                    <div className="input-container"><input type="text" placeholder="Please solve:" required={false}/>
                        <div><FaLock className='register-icon'/></div>

                    </div>
                    <div className="input-container">
                        <button type="submit" disabled={loading} >
                            {loading ? 'Submitting...' : 'Register'}
                        </button>
                        {/*Absolutes Kriegsverbrechen, aber funktioniert*/}
                        <div><FaLock className='register-icon'/></div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default RegisterForm;