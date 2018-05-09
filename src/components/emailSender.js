import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import isEmail from 'validator/lib/isEmail';

import EmailAddressesInput from './emailAddressesInput';
import EmailSubject from './emailSubject';
import EmailText from './emailText';
import EmailService from '../services/emailService';

import './emailSender.css';

export default class EmailSender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: {
        to: [],
        cc: [],
        bcc: [],
        subject: '',
        text: ''
      },
      status: null
    };

    this.handleNewEmail = this.handleNewEmail.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleAddressDelete = this.handleAddressDelete.bind(this);
    this.handleAddressAdd = this.handleAddressAdd.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleEmailTextChange = this.handleEmailTextChange.bind(this);

    this.emailService = new EmailService();
  }

  handleNewEmail(event) {
    event.preventDefault();

    this.setState({
      email: {
        to: [],
        cc: [],
        bcc: [],
        subject: '',
        text: ''
      },
      status: null
    });
  }

  handleSend(event) {
    event.preventDefault();

    const {to, cc, bcc} = {...this.state.email};
    // TODO: to add logic to prompt blank subject or email text
    console.warn('to check blank subject or email body');
    const emailAddresses = [...to, ...cc, ...bcc];
    if (!emailAddresses.length) {
      this.setState({...this.state, status: 'Email sending stopped. No email addresses found!'});
      return;
    }

    const invalidAddresses = emailAddresses.filter((emailAddress) => !isEmail(emailAddress));
    if (invalidAddresses.length) {
      this.setState({...this.state, status: 'Email sending stopped. Invaid email addresses found!'});
      return;
    }

    this.emailService.sendEmail(this.state.email).then(result => {
      if (result.status === 'FAILED') {
        // todo: to show error message
        console.error('sending email failed! ',
          JSON.stringify(result, null, 2)
        );
        this.setState({ ...this.state, status: 'sending email failed!' });
      } else {
        console.log('email sent! resp: ', result);
        this.setState({ ...this.state, status: 'email sent!' });
      }
    });
  }

  handleAddressDelete(email, emailType) {
    const idx = this.state.email[emailType].indexOf(email);
    if (idx > -1) {
      this.state.email[emailType].splice(idx, 1);
      this.setState(this.state);
    }
  }

  handleAddressAdd(newEmail, emailType) {
    const idx = this.state.email[emailType].indexOf(newEmail);
    if (idx > -1) {
      return;
    }
    this.state.email[emailType].push(newEmail);
    this.setState(this.state);
  }

  handleSubjectChange(subject) {
    const email = { ...this.state.email, subject };
    this.setState({...this.state, email});
  }

  handleEmailTextChange(newBody) {
    const email = { ...this.state.email, text: newBody };
    this.setState({...this.state, email});
  }

  render() {
    return ( 
      <form onSubmit = {this.handleSend} >
        <section>
          <div className = "row" >
            <label htmlFor="emailTo">
              <span>To:</span> 
              <EmailAddressesInput id = "emailTo" key = "emailTo" emailAddresses = { this.state.email.to }
                handleAddressDelete = { emailAddress => this.handleAddressDelete(emailAddress, 'to') }
                handleAddressAdd = { emailAddress => this.handleAddressAdd(emailAddress, 'to') } />
            </label>
          </div>

          <div className = "row">
            <label htmlFor="emailCc">
              <span>Cc:</span>
              <EmailAddressesInput id = "emailCc" key = "emailCc"  emailAddresses = { this.state.email.cc }
                handleAddressDelete = { emailAddress => this.handleAddressDelete(emailAddress, 'cc') }
                handleAddressAdd = { emailAddress => this.handleAddressAdd(emailAddress, 'cc') } />
            </label>
          </div >

          <div className = "row">
            <label htmlFor="emailBcc">
              <span>Bcc:</span> 
              <EmailAddressesInput id = "emailBcc" key = "emailBcc" emailAddresses = { this.state.email.bcc } 
                handleAddressDelete = { emailAddress => this.handleAddressDelete(emailAddress, 'bcc') }
                handleAddressAdd = { emailAddress => this.handleAddressAdd(emailAddress, 'bcc') } />
            </label>
          </div>

          <div className = "row">
            <label htmlFor="emailSubject">
              <span>Subject:</span>
              <EmailSubject id = "emailSubject" subject = { this.state.email.subject }
                handleSubjectChange = { this.handleSubjectChange } />
            </label>
          </div >
        </section>
        <section >
          <div className = "row">
            <label htmlFor="emailText">
              <span>&nbsp;</span>
              <EmailText id = "emailText" { ...this.props } emailText={ this.state.email.text } handleEmailTextChange = { this.handleEmailTextChange } />
            </label>
          </div>
        </section>
        <section>
          <div className = "row">
            {this.state.status}
          </div>
        </section>

        <section>
          <div className = "row btn-group">
            <RaisedButton id = "newEmailBtn" label = "New" style = {{margin: 12}} onClick={ this.handleNewEmail } />
            <RaisedButton label = "Send" style = {{margin: 12}} type = "submit" />
          </div>
        </section>
      </form>
    );
  }
}