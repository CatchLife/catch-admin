import axios from 'axios';
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '@/store'

const instance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function(data) {
    data = data || {}
    return Qs.stringify(data, {
      arrayFormat: 'brackets'
    })
  }]
});

instance.interceptors.response.use(
  response => {
    const data = response.data
    if (!data.ok) {
      if (data.errno === -2) {
        MessageBox.confirm(
          '您已登出，您可以继续留在本页面，或者重新登录',
          '重新登录？', {
            confirmButtonText: '重新登录',
            cancelButtonText: '留在本页面',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            // 为了重新实例化vue-router对象 避免bug
            location.reload()
          })
        })
      } else {
        Message({
          message: data.errmsg,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject('error')
    }
    return data
  }, error => {
    console.log(error)
    Message.error('服务器连接失败！')
    return Promise.reject('error')
  }
)

function createAPI(baseURL) {
  return function(conf) {
    conf = conf || {};
    return instance(Object.assign({}, {
      url: conf.url,
      baseURL: baseURL,
      method: conf.method
    }, conf.opts));
  };
}

function convertRESTAPI(url, opts) {
  if (!opts || !opts.path) return url;

  const pathKeys = Object.keys(opts.path);

  pathKeys.forEach((key) => {
    const r = new RegExp('(:' + key + '|{' + key + '})', 'g');
    url = url.replace(r, opts.path[key]);
  });

  return url;
}

export {
  createAPI,
  convertRESTAPI
};