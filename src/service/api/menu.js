import request from '../http';

// 新增菜单
export function createMenuApi(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/menu/create',
    method: 'post',
    data: params
  });
}

// 删除菜单
export function delMenuApi(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/menu/delete/' + params,
    method: 'delete'
  });
}

// 修改菜单
export function putMenuApi(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/menu/update',
    method: 'put',
    data: params
  });
}

// 菜单列表
export function getMenuistApi(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/menu/list',
    method: 'get',
    params
  });
}
