import React, {useState, useEffect} from 'react';
import Nav from 'react-bootstrap/Nav'
import { ReactComponent as AccountIcon } from '../../../assets/accountIcon.svg';
import { ReactComponent as TransferIcon } from '../../../assets/transferIcon.svg';
import { ReactComponent as BillsIcon } from '../../../assets/billsIcon.svg';
import { ReactComponent as ProfileIcon } from '../../../assets/profileIcon.svg';
import { ReactComponent as SignOutIcon } from '../../../assets/signOutIcon.svg'
import './SideNavigation.css';

const SideNavigation = props => {

  useEffect(() => {
  }, []);

  function signOut (e) {
    e.preventDefault();
    alert("SignOut");
  };

  return (
    <div className="side-navigation h-100">
      <Nav defaultActiveKey="/dashboard" className="flex-column pt-3">
          <Nav.Link href="/dashboard" className="row mx-0"><AccountIcon className="sidebar-icon col-5 px-1"/><h4 className="sidebar-title col-auto">Accounts</h4></Nav.Link>
          <Nav.Link href="/transfers" eventKey="transactions"className="row mx-0" ><TransferIcon className="sidebar-icon col-5 px-1"/><h4 className="sidebar-title col-auto">Transfers</h4></Nav.Link>
          <Nav.Link href="/bills" eventKey="bills" className="row mx-0"><BillsIcon className="sidebar-icon col-5 px-1"/><h4 className="sidebar-title col-auto">Bill payment</h4></Nav.Link>
          <Nav.Link href="/profile" eventKey="profile" className="row mx-0"><ProfileIcon className="sidebar-icon col-5 px-1"/><h4 className="sidebar-title col-auto">Profile</h4></Nav.Link>
          <Nav.Link eventKey="signout" className="row mx-0" onClick={signOut}><SignOutIcon className="sidebar-icon col-5 px-1"/><h4 className="sidebar-title col-auto">Sign Out</h4></Nav.Link>
        </Nav>
    </div>
  );
}

export default SideNavigation;
