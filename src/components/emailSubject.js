import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

const EmailSubject = (props) => (
  <div className="email-subject">
    <TextField
      id="subject"
      value={props.subject}
      onChange={(event, newSubject) => props.handleSubjectChange(newSubject)}
      fullWidth={true}
    />
  </div>
);

EmailSubject.defaultProps = {
  subject: ''
};

EmailSubject.propTypes = {
  subject: PropTypes.string,
  handleSubjectChange: PropTypes.func.isRequired
};

export default EmailSubject;
