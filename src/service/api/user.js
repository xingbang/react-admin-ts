import request from '../http';

// 新增用户
export function createUserApi(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/user/create',
    method: 'post',
    data: params
  });
}

// 删除用户
export function delUserApi(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/user/delete/' + params,
    method: 'delete'
  });
}

// 修改用户
export function putUserApi(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/user/update',
    method: 'put',
    data: params
  });
}

// 用户列表
export function getUserListApi(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/user/list',
    method: 'get',
    params
  });
}

// 生成token（登录）
export function getToken(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/token',
    method: 'post',
    data: params
  });
}
