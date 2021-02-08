import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Cost from '../pages/Cost';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Cost} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
