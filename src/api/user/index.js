import instance from './instance';
import { convertRESTAPI } from '../util';

/** 注册 */
function user_register(opts) {
  return instance({
    method: 'post',
    url:  '/register',
    opts: opts
  });
}

export {
  user_register
};
