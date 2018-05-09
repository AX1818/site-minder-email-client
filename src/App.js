import React, { Component } from 'react';

import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';

import './App.css';
import EmailSender from './components/emailSender';

class App extends Component {
  render() {
    const muiTheme = getMuiTheme(darkBaseTheme);;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Site Minder Email Client</h1>
          </header>
          <EmailSender />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
