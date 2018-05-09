import axios from 'axios';

import emailConfig from './emailConfig';

export default class EmailService {
  constructor() {
    this.axios = axios.create({
      baseURL: emailConfig.endpoint,
      timeout: 10000,
      headers: {
        // Mock JWT Token to be replaced by the real credentails after implementing Authentication function
        'Authorization': 'To be a JWT Token',
        'Accept': 'application/json',
       },
      // withCredentials: true,
      // crossDomain: true
    });

  }

  sendEmail(email) {
    return this.axios.put('/email', email)
    .then( (response) => ({ status: 'OK', statusCode: response.status, message: 'Email sent successfully!' }) )
    .catch( error => {
      let message;
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        message = `${error.response.status} error! Email sending failed.`
      } else if (error.request) {
        // The request was made but no response was received
        message = 'No response recevied!'
      } else {
        // Something happened in setting up the request that triggered an Error
        message = error.message;
      }

      return { status: 'FAILED', message, statusCode: error.response && error.response.status };
    });
  }

}
