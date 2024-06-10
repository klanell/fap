import {Box, IconButton, useTheme} from "@mui/material";
import {useContext} from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import {ColorModeContext} from "../theme";

const Topbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

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
            <IconButton>
                <RefreshOutlinedIcon/>
            </IconButton>
        </Box>

    </Box>);
}

export default Topbar;