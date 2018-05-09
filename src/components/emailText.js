import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

export default function EmailBody(props) {
  return (

      <TextField className="email-body" hintText="Email Body"
        value={props.emailText}
        floatingLabelText="Email Body"
        multiLine={true} rows={10} rowsMax={20}
        textareaStyle={{backgroundColor: 'linen', color: 'black'}}
        onChange={ (event, newBody) => props.handleEmailTextChange(newBody) }
        />

  );
}

EmailBody.defaultProps = {
  emailText: ''
};

EmailBody.propTypes = {
  emailText: PropTypes.string,
  handleEmailTextChange: PropTypes.func.isRequired
};
