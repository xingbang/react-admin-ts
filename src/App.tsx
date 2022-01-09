import React, { Suspense } from 'react';
import { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from '@src/contextStore/GlobalProvider';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '@src/pages/Login';
import LayoutDefault from '@src/layout';
import OnLogin from '@src/components/OnLogin';

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <BrowserRouter>
        {/* 使用了路由懒加载，所以需要使用<Suspense>包起来 */}
        <Suspense fallback={<div></div>}>
          <GlobalProvider>
            <OnLogin />
            <Switch>
              <Route path="/login" component={Login} />
              <Route component={LayoutDefault} />
              <Redirect from="/" to="/user/list" />
            </Switch>
          </GlobalProvider>
        </Suspense>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
