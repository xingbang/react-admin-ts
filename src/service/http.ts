import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from '@src/utils';

const Request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 6000
});

// 请求拦截器
Request.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    if (getToken('SET_TOKEN')) {
      config.headers['Authorization'] = 'Bearer ' + getToken('SET_TOKEN');
    }
    return config;
  },
  (error) => {
    error.data = {};
    error.data.msg = '服务器异常，请联系管理员';
    return Promise.resolve(error);
  }
);

// 响应拦截器
Request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    error.data = {};
    error.data.msg = '服务器异常，请联系管理员';
    return Promise.resolve(error);
  }
);

export default Request;
