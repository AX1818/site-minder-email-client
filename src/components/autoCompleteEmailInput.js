import React from 'react';
import PropTypes from 'prop-types';

import AutoComplete from 'material-ui/AutoComplete';

// TODO: to enhance it to read emails from cache
const dataSource = [
  {name: 'User One', emailAddress: 'one@test.com'},
  {name: 'Site Minder', emailAddress: 'new@siteminder.com'},
];
const dataSourceConfig = {
  text: 'name',
  value: 'emailAddress',
};

const styles = {
  newAddressInput: {
    marginLeft: 10
  }
};

export default function AutoCompleteEmailAddressInput(props) {
  return (
    <div style={styles.newAddressInput}>
      <AutoComplete
        floatingLabelText="Add Address"
        ref={ (autoComplete) => autoComplete && autoComplete.focus() }
        filter={AutoComplete.caseInsensitiveFilter}
        openOnFocus={true}
        dataSource={dataSource}
        dataSourceConfig={dataSourceConfig}
        onClose={props.onClose}
        onNewRequest={ (person, index) => props.onNewEmailAddress(index === -1 ? person : person.emailAddress) }
      />
    </div>
  );
};

AutoCompleteEmailAddressInput.propTypes = {
  onClose: PropTypes.func.isRequired,
  onNewEmailAddress: PropTypes.func.isRequired
};
