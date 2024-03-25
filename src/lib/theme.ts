import { deepPurple, orange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: orange[700],
            contrastText: "#fff",
        },
        secondary: {
            main: deepPurple[500],
            contrastText: "#fff",
        },
    },
});
