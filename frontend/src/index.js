import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

Amplify.configure({
    aws_cognito_region: process.env.REACT_APP_REGION,
    aws_user_pools_id:  process.env.REACT_APP_USER_POOL_ID,
    aws_user_pools_web_client_id: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
});
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
