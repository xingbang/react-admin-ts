import request from '../http';
// 获取图书列表
// http://t.yushu.im/v2/book/search?q=%s&start=%s&count=%s&summary=%s
export function getBook(params) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/book/search',
    method: 'get',
    params
  });
}

// 获取热门图书列表
export const getBootHot = async (params) => {
  return await request({
    url: process.env.REACT_APP_API_URL + '/api/v1/book/hot_list',
    method: 'get',
    params
  });
};

// 新增——热门图书
export function creatHotBook(data) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/book/hot_list/create',
    method: 'post',
    data
  });
}

// 跟新——热门图书
export function updateHotBook(data) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/book/hot_list/update',
    method: 'put',
    data
  });
}

// 删除——热门图书
export function deleteHotBook(index) {
  return request({
    url: process.env.REACT_APP_API_URL + '/api/v1/book/hot_list/delete/' + index,
    method: 'delete'
  });
}
