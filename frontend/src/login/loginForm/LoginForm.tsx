import React, {Dispatch, useEffect} from 'react';
import './LoginForm.css';
import {FaUser, FaLock} from "react-icons/fa";
import {LoginFormData} from "../rest/login/LoginFormData";
import {postForm} from "../rest/UserRestController";

type LoginFormProps = {
    setNutzername: Dispatch<React.SetStateAction<string>>,
    setSessionId: Dispatch<React.SetStateAction<string>>,
}

const LoginForm = ({setNutzername, setSessionId}: LoginFormProps) => {

    const [formData, setFormData] = React.useState<LoginFormData>({
        loginName: "", passwort: {passwort: ""}
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
            }
            return {
                ...prevFormData, [name]: value,
            }
        });
    }

    const onPost = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            postForm(formData, 'http://localhost:8080/FAPServer/service/fapservice/login').then((res: {sessionID: string}) => {
                setSessionId(res.sessionID);
                setNutzername(formData.loginName)
            })
            console.log('Successfully Logged in User');
        } catch (error) {
            console.error(error)
            setError((error as Error).message);
        } finally {
            setLoading(false);

        }
    }

    return (
        <div className="wrapper">
            <form onSubmit={onPost}>
                <h1>Login</h1>
                <h2>We're glad to see you again!</h2>
                <div className="input-box">
                    <input type="text" placeholder="Username" name="loginName" value={formData.loginName}
                           onChange={handleChange} required/>
                    <FaUser className='icon'/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" name="passwort" value={formData.passwort.passwort}
                           onChange={handleChange} required/>
                    <FaLock className='icon'/>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox"/>Remember me</label>
                    <a href="#">Forgot Password?</a>
                </div>
                <button type="submit">Login</button>
                <div className="register-link">
                    <p>Don't have an account? <a href="../register">Register</a></p>
                </div>
            </form>
        </div>
    );

}
export default LoginForm;