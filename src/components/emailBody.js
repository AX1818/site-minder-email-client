import React, { Component } from 'react';

export default function EmailBody(props) {
  console.log('props in body: ', JSON.stringify(props));
  return (
    <textarea rows={props.rows} cols={props.cols}>
    </textarea>
  );
}
