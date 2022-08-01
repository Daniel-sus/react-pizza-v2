import { createTheme } from "@mui/material/styles";

const Colors = {
  primary: "#fe5f1e",
  secondary: "#fe5f1e",
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },
});

export default theme;
