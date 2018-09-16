import React from 'react';
import { Route, Switch } from 'react-router';

import * as Pages from '../pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Pages.UserListPage} />
    <Route exact path="/users" render={() => <div>users</div>} />
    <Route exact path="/user/:id" render={() => <div>user</div>} />
    <Route exact path="*" render={() => <div>404</div>} />
  </Switch>
);

export default Routes;
