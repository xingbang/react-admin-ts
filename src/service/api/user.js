import request from '../http';

// 生成token（登录）
export function getToken(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/token',
    method: 'post',
    params
  });
}
