import request from '../http';

// 新增用户
export function createUserApi(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/user/create',
    method: 'POST',
    data: params
  });
}

// 用户列表
export function getUserListApi(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/user/list',
    method: 'GET',
    params
  });
}

// 生成token（登录）
export function getToken(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/token',
    method: 'POST',
    data: params
  });
}
