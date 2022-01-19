import request from '../http';

// 新增角色
export function createRoleApi(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/role/create',
    method: 'post',
    data: params
  });
}

// 删除角色
export function delRoleApi(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/role/delete/' + params,
    method: 'delete'
  });
}

// 修改角色
export function putRoleApi(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/role/update',
    method: 'put',
    data: params
  });
}

// 角色列表
export function getRoleListApi(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/role/list',
    method: 'get',
    params
  });
}
