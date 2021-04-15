import React, {useState, useEffect} from 'react';
import {
  Link
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../../assets/logo.png'
import './TopNavigation.css';

const TopNavigation = props => {
  const [user, setUser] = useState(null);
  const [userInitials, setUserInitials] = useState("");

  useEffect(() => {
    if (!props.admin && props.user.attributes) {
      setUser({name: props.user.attributes.given_name, lastName: props.user.attributes.family_name});
      if (props.user.attributes.given_name && props.user.attributes.family_name)
        setUserInitials(props.user.attributes.given_name[0] +  props.user.attributes.family_name[0]);
    }
  }, [props.user]);

  return (
    <>
    <Navbar className="top-navigation">
      <Navbar.Brand href="/">
        <img
        src={logo}
        className="d-inline-block align-middle logo-img"
        alt="TechnoSpartanBank"
      />
        <div className="d-inline-block logo-name">
          <h4>Spartan Bank</h4>
        </div>
      </Navbar.Brand>
      {!props.admin && <div className="ml-auto user-profile">{userInitials}</div>}
    </Navbar>
    </>
  );
}

export default TopNavigation;
