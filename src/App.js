import React, {useState, useEffect}from "react";
import "./App.css";
import Routes from "./Routes";
import { Provider } from "react-redux";
import store from "./store/store";
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import { ThemeProvider } from '@material-ui/core/styles';

function App() {

  const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: green,
    },
    status: {
      danger: 'orange',
    },
  });



  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Routes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
