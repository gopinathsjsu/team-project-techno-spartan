import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

import { DashboardPage } from '../pages/dashboard';
import { AccountPage } from '../pages/account';
import { UIPage } from '../pages/ui';
import { ProfilePage } from '../pages/profile';
import { BillsPage } from '../pages/bills';
import { TransfersPage } from '../pages/transfers';
import { PastTransferPage } from '../pages/PastTransfer';
import '../App.css'

export default function CustomerApp({user}) {
  return (
    <Switch>
    {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
      <Route path="/pasttransfers">
          <PastTransferPage/>
        </Route>
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
          <AccountPage user={user}/>
        </Route>
        <Route path="/dashboard">
          <DashboardPage user={user}/>
        </Route>
        <Route path="/">
          <DashboardPage user={user}/>
        </Route>
    </Switch>
  );
}
