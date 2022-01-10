import { createTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./components/pages/Home";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8ab8bd",
    },
    secondary: {
      main: "#2b828a",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Home>Hola</Home>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
