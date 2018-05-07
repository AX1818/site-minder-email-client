import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import EmailSender from './components/emailSender';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'


class App extends Component {
  render() {
    const muiTheme = getMuiTheme(darkBaseTheme);
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Site Minder Email Client</h1>
          </header>
          <EmailSender/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
