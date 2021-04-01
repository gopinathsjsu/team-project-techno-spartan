import React, {useState} from 'react';
import {
  Link
} from "react-router-dom";
import './Dashboard.css';
import { ReactComponent as Logo } from '../../assets/Logo.svg';

const Dashboard = props => {
  const [userLogin, setUserLogin] = useState(true);
  return (
    <>
      <h1>Here will be dashboard</h1>
    </>
  );
}

export default Dashboard;
