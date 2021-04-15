import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import { AccountPage } from '../pages/account';
import { PastTransferPage } from '../pages/PastTransfer';
import '../App.css'

export default function AdminApp(props) {
  return (
      <Switch>
      {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
        <Route path="/pasttransfers">
            <PastTransferPage/>
          </Route>
          <Route path="/">
            <AccountPage />
          </Route>
      </Switch>
  );
}
