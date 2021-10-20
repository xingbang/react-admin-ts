import React, { Suspense } from 'react';
import { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import Menus from '@src/components/Menus';
import Routes from './components/Routes';

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <BrowserRouter>
        {/* 使用了路由懒加载，所以需要使用<Suspense>包起来 */}
        <Suspense fallback={<div></div>}>
          <Menus />
          <Routes />
        </Suspense>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
