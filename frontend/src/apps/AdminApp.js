import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import { AccountPage } from '../pages/account';
import { PastTransferPage } from '../pages/PastTransfer';
import { AdminPage } from '../pages/admin';
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
            <AdminPage />
          </Route>
      </Switch>
  );
}
