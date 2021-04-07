import React from "react";
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

import { DashboardPage } from './pages/dashboard';
import { AccountPage } from './pages/account';
import { UIPage } from './pages/ui';
import { ProfilePage } from './pages/profile';
import { BillsPage } from './pages/bills';
import { TransfersPage } from './pages/transfers';
import { TopNavComponent } from './components/layout/top-navigation';
import { SideNavComponent } from './components/layout/side-navigation';
import './App.css'

export default function App() {
  return (
    <Router>
      <div className="page-container">
        <TopNavComponent />
        <Container fluid="true" className="d-flex h-100 flex-column">
          <Row className="flex-fill d-flex ">
            <Col sm="auto">
              <SideNavComponent />
            </Col>
            <Col>
                {/* A <Switch> looks through its children <Route>s and
                  renders the first one that matches the current URL. */}
              <Switch>
              <Route path="/ui">
                <UIPage />
              </Route>
                <Route path="/transfers">
                  <TransfersPage />
                </Route>
                <Route path="/profile">
                  <ProfilePage />
                </Route>
                <Route path="/bills">
                  <BillsPage />
                </Route>
                <Route path="/account/:id">
                  <AccountPage />
                </Route>
                <Route path="/">
                  <DashboardPage />
                </Route>

              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}
