import React, {useState} from 'react';
import './App.css';
import MapComponent from "./map/MapComponent";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ColorModeContext, useMode} from "./theme";
import Sidebar from "./global/Sidebar";
import Topbar from "./global/Topbar";
import {ToastContainer} from "react-toastify";
import LoginForm from "./login/loginForm/LoginForm";
import RegisterForm from "./login/register/RegisterForm";

function App() {
    const [theme, colorMode] = useMode();
    const [nutzername, setNutzername] = useState<string>("tester");
    const [sessionId, setSessionId] = useState<string>("66b912b3-f3f0-4b9e-9d7d-d65c3b99d69a");

    return (
        <React.StrictMode>
            <BrowserRouter>
                <ColorModeContext.Provider value={colorMode}>
                    <ToastContainer/>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <div className="app">
                            <Sidebar nutzername={nutzername}/>
                            <main className="content">
                                <Topbar/>
                                <Routes>
                                    <Route path="/"
                                           element={<MapComponent nutzername={nutzername} sessionId={sessionId}/>}/>
                                    <Route path="/login" element={<LoginForm/>}/>
                                    <Route path="/register" element={<RegisterForm/>}/>
                                </Routes>
                            </main>
                        </div>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </BrowserRouter>
        </React.StrictMode>


    );
}

export default App;
