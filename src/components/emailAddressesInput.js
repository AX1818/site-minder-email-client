import React, { Component } from 'react';
import PropTypes from 'prop-types';

import isEmail from 'validator/lib/isEmail';
import Chip from 'material-ui/Chip';

import AutoCompleteEmailAddressInput from './autoCompleteEmailInput';

export default class EmailAddressesInput extends Component {
  constructor(props) {
    super(props);

    this.state = { addNew: false };

    this.styles = {
      chip: { margin: 4 },
      wrapper: { display: 'flex', flexWrap: 'wrap' },
    };

    this.handleClick = this.handleClick.bind(this);
    this.finalizeAddresses = this.finalizeAddresses.bind(this);
    this.onNewEmailAddress = this.onNewEmailAddress.bind(this);
  }

  onNewEmailAddress(newEmail) {
    const newEmailAddress = newEmail;
    this.props.handleAddressAdd(newEmailAddress);
    this.setState({...this.state, addNew: false});
  }

  handleClick(event) {
    event.preventDefault();

    if (this.state.addNew) {
      return;
    }
  
    this.setState({...this.state, addNew: true});
  }

  finalizeAddresses() {
    if (!this.state.addNew) {
      return;
    }
    this.setState({...this.state, addNew: false});
  }

  render() {
    const addEmailComponent = this.state.addNew ? <AutoCompleteEmailAddressInput onClose={this.finalizeAddresses} onNewEmailAddress={this.onNewEmailAddress} /> : null;

    return (
      <div role="searchbox" style={this.styles.wrapper} className="email-addresses-input" tabIndex={this.props.tabIndex || 0}
        onClick={this.handleClick}
        onKeyDown={ (event) => event.keyCode === 13 && this.handleClick(event) }>
        {
          this.props.emailAddresses.map((emailAddress) => {
            let invalidEmailChipStyle = {};
            if (!isEmail(emailAddress)) {
              invalidEmailChipStyle = {
                style: { margin: 4, borderWidth: 1, borderStyle: 'dashed', borderColor: 'red' },
                labelStyle: {color: 'red', textDecoration: 'underline'}
              };
            } 
            return (
              <Chip style={this.styles.chip} {...invalidEmailChipStyle}
                key={emailAddress}
                onRequestDelete={ () => this.props.handleAddressDelete(emailAddress) }
              >
                {emailAddress}
              </Chip>
            );
          })
        }

       { addEmailComponent }
      </div>
    );
  }
}

EmailAddressesInput.defaultProps = {
  tabIndex: 0,
  emailAddresses: [],
};

EmailAddressesInput.propTypes = {
  tabIndex: PropTypes.number,
  emailAddresses: PropTypes.PropTypes.arrayOf(PropTypes.string),
  handleAddressAdd: PropTypes.func.isRequired,
  handleAddressDelete: PropTypes.func.isRequired
};
