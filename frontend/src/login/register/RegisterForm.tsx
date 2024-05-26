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
                        <input type="text" placeholder="First Name" required/>
                        <FaUser className='register-icon'/>
                    </div>
                    <div className="input-container">
                        <input type="text" placeholder="Username" required/>
                        <FaUser className='register-icon'/>
                    </div>
                </div>

                <div className="input-box">
                    <div className="input-container"><input type="text" placeholder="Surname" required/>
                        <FaLock className='register-icon'/>
                    </div>
                    <div className="input-container"><input type="password" placeholder="Password" required/>
                        <FaLock className='register-icon'/></div>

                </div>
                <div className="input-box">
                    <div className="input-container"><input type="text" placeholder="Username" required/>
                        <FaUser className='register-icon'/>
                    </div>
                    <div className="input-container"></div>
                </div>
                {/*<div className="remember-forgot">*/}
                {/*    <label><input type="checkbox"/>Remember me</label>*/}
                {/*</div>*/}
                <div className="input-box">
                    <div className="input-container"><input type="text" placeholder="Blub" required/>
                        <div><FaLock className='register-icon'/></div>

                    </div>
                    <div className="input-container">
                        <button type="submit">Register</button>
                        {/*Absolutes Kriegsverbrechen, aber funktioniert*/}
                        <div><FaLock className='register-icon'/></div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default RegisterForm;