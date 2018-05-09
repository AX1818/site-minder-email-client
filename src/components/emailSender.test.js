import React from 'react';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import sinon from 'sinon';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import EmailAddressesInput from './emailAddressesInput';
import EmailSubject from './emailSubject';
import EmailText from './emailText';

import './emailSender.css';

import EmailSender from './emailSender';

configure({ adapter: new Adapter() });

describe('<EmailSender />', () => {
  test('renders three <EmailAddressesInput/> components', () => {
    const wrapper = shallow(<EmailSender />);
    expect(wrapper.find(EmailAddressesInput)).to.have.length(3);
  });
  
  test('renders One <EmailSubject/> components', () => {
    const wrapper = shallow(<EmailSender />);
    expect(wrapper.find(EmailSubject)).to.have.length(1);
  });
  
  test('renders One <EmailText/> components', () => {
    const wrapper = shallow(<EmailSender />);
    expect(wrapper.find(EmailText)).to.have.length(1);
  });
  
  test('renders two <RaisedButton/> components', () => {
    const wrapper = shallow(<EmailSender />);
    expect(wrapper.find(RaisedButton)).to.have.length(2);
  });

});
