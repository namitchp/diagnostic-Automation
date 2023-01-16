import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Auth/Login";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import MainLayout from "./layouts/layout";
import SwitchApp from "./pages";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#d3d3d3",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#fff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
    custom: {
      main: "#ffffff",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

function App() {
  const isAuthorised = localStorage.getItem("login");

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            {isAuthorised ? (
              <MainLayout />
            ) : (
              <React.Fragment>
                <Route path="/switch" component={SwitchApp} />
                <Route path="/login" component={Login} />
                <Redirect from="/" to="/login" />
              </React.Fragment>
            )}
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
