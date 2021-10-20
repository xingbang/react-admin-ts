import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '@src/router';

const Routes = () => {
  return (
    <Switch>
      {routes.map((routeItem) => {
        return routeItem.children.map((mainPage) => {
          return (
            <Route
              exact
              key={mainPage.path}
              path={mainPage.path}
              render={(props) => {
                return <mainPage.component {...props} />;
              }}
            />
          );
        });
      })}
    </Switch>
  );
};

export default Routes;
