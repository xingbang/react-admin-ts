import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '@src/router';

const Routes = () => {
  // console.log(routes);
  return (
    <Switch>
      {routes.map((routeItem) => {
        return routeItem.children.map((mainPage) => {
          if (!mainPage.children) {
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
          } else {
            return mainPage.children.map((subPage) => {
              return (
                <Route
                  exact
                  key={subPage.path}
                  path={subPage.path}
                  render={(props) => {
                    return <subPage.component {...props} />;
                  }}
                />
              );
            });
          }
        });
      })}
    </Switch>
  );
};

export default Routes;
