import React from 'react';
import '../loginForm/LoginForm.css';
import './RegisterForm.css';

import {FaLock, FaUser} from "react-icons/fa";
import {TbPassword} from "react-icons/tb";

const RegisterForm = () => {
    return (
        <div className="register-wrapper">
            <form action="">
                <h1>Register</h1>
                <h2>to Friends and Places</h2>
                <div className="input-box">
                    <div className="input-container">
                        <input type="text" placeholder="Username" required/>
                        <FaUser className='icon'/>
                    </div>
                    <div className="input-container">
                        <input type="text" placeholder="Username" required/>
                        <FaUser className='icon'/>
                    </div>
                </div>

                <div className="input-box">
                    <input type="password" placeholder="Password" required/>
                    <FaLock className='icon'/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Confirm Password" required/>
                    <TbPassword className='icon'/>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox"/>Remember me</label>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
export default RegisterForm;