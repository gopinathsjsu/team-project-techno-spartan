import React from 'react';
import { Auth } from 'aws-amplify';
import Nav from 'react-bootstrap/Nav'
import { ReactComponent as AccountIcon } from '../../../assets/accountIcon.svg';
import { ReactComponent as TransferIcon } from '../../../assets/transferIcon.svg';
import { ReactComponent as BillsIcon } from '../../../assets/billsIcon.svg';
import { ReactComponent as ProfileIcon } from '../../../assets/profileIcon.svg';
import { ReactComponent as SignOutIcon } from '../../../assets/signOutIcon.svg';
import { ReactComponent as AdminIcon } from '../../../assets/admin.svg';
import './SideNavigation.css';

const SideNavigation = props => {

  async function signOut() {
    try {
        await Auth.signOut({ global: true });
        window.location.reload();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

  return (
    <div className="side-navigation h-100">
      <Nav defaultActiveKey="/dashboard" className="flex-column pt-3">
          {!props.admin && <Nav.Link href="/dashboard" className="row mx-0"><AccountIcon className="sidebar-icon col-5 px-1"/><h4 className="sidebar-title col-auto">Accounts</h4></Nav.Link>}
          {!props.admin && <Nav.Link href="/transfers" eventKey="transactions"className="row mx-0" ><TransferIcon className="sidebar-icon col-5 px-1"/><h4 className="sidebar-title col-auto">Transfers</h4></Nav.Link>}
          {!props.admin && <Nav.Link href="/bills" eventKey="bills" className="row mx-0"><BillsIcon className="sidebar-icon col-5 px-1"/><h4 className="sidebar-title col-auto">Bill payment</h4></Nav.Link>}
          {/* props.admin && <AdminIcon className="col-10"><h4 className="sidebar-title col-auto">Admin</h4></AdminIcon> */}
          {props.admin && <div className="col"><h4 className="sidebar-title col-auto w-100 account-header py-2">Admin</h4></div>}
          <Nav.Link eventKey="signout" className="row mx-0" onClick={signOut}><SignOutIcon className="sidebar-icon col-5 px-1"/><h4 className="sidebar-title col-auto">Sign Out</h4></Nav.Link>
        </Nav>
    </div>
  );
}

export default SideNavigation;
