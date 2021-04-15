import React, {useEffect, useState} from "react";
import { AmplifyAuthenticator} from '@aws-amplify/ui-react'
import { Hub, Logger } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { TopNavComponent } from './components/layout/top-navigation';
import { SideNavComponent } from './components/layout/side-navigation';
import  AdminApp from './apps/AdminApp'
import  CustomerApp from './apps/CustomerApp'
import './App.css'

export default function App() {
  const uType = {
    admin: 'admin',
    customer: 'customer',
    guest: 'guest'
  }
  const [user, setUser] = useState();
  const [userType, setUserType] = useState(uType.guest)

  const getUserInfo = () => {
    Auth.currentAuthenticatedUser().then(user => {
      setUser(user);
      if (user && user.signInUserSession.accessToken.payload['cognito:groups']?.includes("Admin"))
        setUserType(uType.admin)
      else if (user) {
        setUserType(uType.customer)
      }
    })
  }

  const listener = (data) => {
      switch (data.payload.event) {
          case 'signIn':
              getUserInfo();
              break;
      }
  }

  useEffect(() => {
     Hub.listen('auth', listener);
     if (!user)
      getUserInfo()
  }, [])

  return (
    <AmplifyAuthenticator>
    {
      (userType != uType.guest) &&
      <Router>
        <div className="page-container">
          <TopNavComponent admin={userType == uType.admin} user={user}/>
          <Container fluid="true" className="d-flex h-100 flex-column">
            <Row className="flex-fill d-flex ">
              <Col sm="auto">
                <SideNavComponent admin={userType == uType.admin}/>
              </Col>
              <Col>
                {userType == uType.admin ? <AdminApp user={user} /> : <CustomerApp user={user} />}
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    }
    </AmplifyAuthenticator>
  );
}
