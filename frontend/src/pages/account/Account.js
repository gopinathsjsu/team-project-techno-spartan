import React, {useState} from 'react';
import {
  useParams
} from "react-router-dom";
import './Account.css';

const Account = props => {
  const [userLogin, setUserLogin] = useState(true);
  let { id } = useParams();
  return (
    <>
      <h1>Here will be details for Account num: {id}</h1>
    </>
  );
}

export default Account;
