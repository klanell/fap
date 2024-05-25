import React from 'react';
import './App.css';
import MapComponent from "./map/MapComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./login/loginForm/LoginForm";
import RegisterForm from "./login/register/RegisterForm";

function App() {
    return (

        <div className={"app"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MapComponent/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/register" element={<RegisterForm/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}


export default App;
