import React, { Component } from 'react';


import EmailBody from './emailBody';

import RaisedButton from 'material-ui/RaisedButton';

import EmailAddressesInput from './emailAddressesInput';

export default class EmailSender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      to: [{address: "ausitn.xie@gmail.com"}, {address: "weiyu.xie@yeah.net"}],
      cc: [],
      bcc: [],
      subject: '',
      body: ''
    };

    this.handleSend = this.handleSend.bind(this);
    this.handleAddressDelete = this.handleAddressDelete.bind(this);
    this.handleAddressAdd = this.handleAddressAdd.bind(this);
  }

  handleSend(event) {
    alert('you clicked me!');
  }

  handleAddressDelete(email) {
    console.log(email);
    alert('You clicked the delete button to delete ' + email);
    this.state.to = this.state.to.filter(emailAddress => emailAddress.address !== email);
    console.log(' this.state.to: ',  this.state.to);
    this.setState(this.state);
  }

  handleAddressAdd(newEmail) {
    this.state.to.push({address: newEmail});
  }

  render() {
    return (
      <form onSubmit={this.handleSend}>
        <label>
          To:
          {/* <input type="text" name="To" value={this.state.to} onChange={this.handleAddressChange} /> */}
          <EmailAddressesInput emailAddresses={this.state.to} handleAddressDelete={this.handleAddressDelete} handleAddressAdd={this.handleAddressAdd}/>
        </label>
        <br/>
        <label>
          Cc:
          {/* <input type="text" name="Cc" value={this.state.cc} onChange={this.handleAddressChange} /> */}
        </label>
        <br />
        <EmailBody {...this.props} cols="50" rows="10"></EmailBody>
        <br/>

        <RaisedButton label="Send" />
      </form>
    );
  }
}