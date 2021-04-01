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
    // Check if user logged In and set users initials
    setUser({name: "Leya", lastName: "Zoya"});
    setUserInitials("LZ")
  }, []);

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
      <div className="ml-auto user-profile">{userInitials}</div>
    </Navbar>
    </>
  );
}

export default TopNavigation;
