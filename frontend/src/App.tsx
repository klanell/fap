import React from 'react';
import './App.css';
import MapComponent from "./map/MapComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import ReactDOM from "react-dom/client";

function App() {
    return (

        <div className={"app"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MapComponent/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}


export default App;
