import React, {useState} from 'react';
import './App.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ColorModeContext, useMode} from "./theme";
import Sidebar from "./global/Sidebar";
import Topbar from "./global/Topbar";
import {ToastContainer} from "react-toastify";
import FriendsMapPage from "./map/FriendsMapPage";
import LoginForm from "./login/loginForm/LoginForm";
import StandortAendern from "./standortaendern/StandortAendernForm";
import RegisterForm from "./login/register/RegisterForm";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [theme, colorMode] = useMode();
    const [nutzername, setNutzername] = useState<string>("");
    const [sessionId, setSessionId] = useState<string>("");

    return (
        <React.StrictMode>
            <BrowserRouter>
                <ColorModeContext.Provider value={colorMode}>
                    <ToastContainer/>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <div className="app">
                            {sessionId ? <>
                                    <Sidebar nutzername={nutzername}/>
                                    <main className="content">
                                        <Topbar nutzername={nutzername} sessionId={sessionId} setNutzername={setNutzername} setSessionId={setSessionId}/>
                                        <div className="MapWrapper"><Routes>
                                            <Route path="/"
                                                   element={<FriendsMapPage nutzername={nutzername} sessionId={sessionId}/>}/>
                                            <Route path="/standortAendern" element={<StandortAendern nutzername={nutzername} sessionId={sessionId}/>}/>

                                        </Routes>
                                        </div>
                                    </main>
                                </>
                                :
                                <Routes>
                                    <Route path="/"
                                           element={<LoginForm setNutzername={setNutzername}
                                                               setSessionId={setSessionId}/>}/>
                                    <Route path="/register" element={<RegisterForm/>}/>
                                </Routes>}
                        </div>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </BrowserRouter>
        </React.StrictMode>


    );
}

export default App;
