import {Box, IconButton, Tooltip, useTheme} from "@mui/material";
import React, {Dispatch, useContext} from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import {ColorModeContext} from "../theme";

type TopbarProps = {
    nutzername: string,
    sessionId: string,
    setNutzername: Dispatch<React.SetStateAction<string>>,
    setSessionId: Dispatch<React.SetStateAction<string>>,
}
const Topbar = ({nutzername, sessionId, setNutzername, setSessionId}: TopbarProps) => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    function logout() {
        fetch(`http://localhost:8080/FAPServer/service/fapservice/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json', // Akzeptiert JSON als Antwortformat
                'Content-Type': 'application/json', // Sendet JSON im Body
            },
            body: JSON.stringify({
                loginName: nutzername,
                sitzung: sessionId
            })
        }).then(() => {
                setNutzername('');
                setSessionId('');
            }
        );
    }

    return (<Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        <Box display="flex" borderRadius="3px">
        </Box>

        {/* ICONS */}
        <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                    <DarkModeOutlinedIcon/>
                ) : (
                    <LightModeOutlinedIcon/>
                )}
            </IconButton>
            <Tooltip title={"Logout"}>
                <IconButton onClick={() => logout()}>
                    <LogoutIcon/>
                </IconButton>
            </Tooltip>
        </Box>

    </Box>);
}

export default Topbar;