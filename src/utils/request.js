/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */

import { notification } from 'antd';
import { getAuthority } from '@/utils/authority';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
  console.log(error);

  const response = error;
  const errortext = codeMessage[response.status] || response.message;
  const { status, path } = response;

  notification.error({
    message: `请求错误 ${status}: ${path}`,
    description: errortext,
  });
};


class request {

  static BASE_URL = 'http://10.20.0.129:8080/';

  static get(path, params) {
    return this.fetchData(path, 'GET', params);
  }

  static post(path, params) {
    return this.fetchData(path, 'POST', params);
  }

  static put(path, params) {
    return this.fetchData(path, 'PUT', params);
  }

  static delete(path, params) {
    return this.fetchData(path, 'DELETE', params);
  }

  static fetchData(path, type, params) {
    let token = getAuthority();
    let url = this.BASE_URL + path;

    // 拼接GET参数
    if (type === 'GET' && params) {
      let paramsArray = [];
      //拼接参数
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&');
      } else {
        url += '&' + paramsArray.join('&');
      }
    } else if (type !== 'GET' && params && params.step && params.current) {
      if (url.search(/\?/) === -1) {
        url += '?' + 'step=' + params.step + '&current=' + params.current;
      } else {
        url += '&' + 'step=' + params.step + '&current=' + params.current;
      }
    }

    return fetch(url, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': token,
      },
      method: type,
      body: type === 'GET' ? undefined : JSON.stringify(params),
    }).then(data => data.json())
      .then(data => {
        if (data.status) {
          errorHandler(data);
        } else return data;
      })
      .catch(err => {
        console.log('err: --->');
        console.log(err);
      });
  }

}


export default request;
