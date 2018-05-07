import React, { Component } from 'react';
import Chip from 'material-ui/Chip';

import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import "./emailAddressesInput.css";

import AutoCompleteExampleDataSource from './autoCompleteEmailInput';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const errorStyles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

export default class EmailAddressesInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addNew: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.finalizeAddresses = this.finalizeAddresses.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  handleClick(event) {
    if (this.state.addNew) {
      return;
    }
  
    this.setState({addNew: true});
  }

  onKeyDown(event) {
    let keyPressed = event.which;

    if (keyPressed === 13) {
      const newEmailAddress = event.target.value;
      console.info('nwq email: ', event.target.value);
      this.props.handleAddressAdd(newEmailAddress);
      this.setState({addNew: false});
    }
  }

  finalizeAddresses(event) {
    this.setState({addNew: false});
  }

  render() {
    console.log('this.state.addNew: ', this.state.addNew);

    let addEmailComponent = this.state.addNew ? <TextField  hintText="Type new email address"  hintStyle={errorStyles.errorStyle}
      onBlur={this.finalizeAddresses}
      onKeyDown={this.onKeyDown}/> : null;
    console.log('addEmailComponent: ', addEmailComponent); 

    return (
      <div className="email-addresses-input" onClick={this.handleClick}>
        {
          this.props.emailAddresses.map(emailAddress => 
            <Chip style={styles.chip} key={emailAddress.address}  onRequestDelete={() => this.props.handleAddressDelete(emailAddress.address)}>
              {emailAddress.address}
            </Chip>
          )
        }
       
       { addEmailComponent }

       <AutoCompleteExampleDataSource/>
      </div>
    );
  }
}