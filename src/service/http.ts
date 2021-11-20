import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
import { getSession } from '@src/utils';

const Request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 6000
});

// 请求拦截器
Request.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    if (getSession('TOKEN')) {
      config.headers['Authorization'] = 'Bearer ' + getSession('TOKEN');
    }
    return config;
  },
  (error) => {
    message.error('服务器异常，请联系管理员');
    return Promise.resolve(error);
  }
);

// 响应拦截器
Request.interceptors.response.use(
  (response: AxiosResponse | any) => {
    if (response.data.error_code != 0) {
      message.error(response.data.msg);
      return Promise.reject();
    } else {
      return response.data;
    }
  },
  (error) => {
    message.error('服务器异常，请联系管理员');
    return Promise.resolve(error);
  }
);

export default Request;
