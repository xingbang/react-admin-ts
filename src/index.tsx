import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import zhCn from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import './index.less';

moment.locale('zh-cn');

ReactDOM.render(
  <ConfigProvider locale={zhCn}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
