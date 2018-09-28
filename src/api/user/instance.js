import {
  createAPI
} from '../util';
import config from '../config';

const baseUrl = {
  mock: 'http://47.98.217.136:7300/mock/5ba09ddddbb5311e7a7f74e6/admin/user',
  dev: 'http://localhost:9800/admin/user',
  pre: '',
  prod: 'https://edaoe.com/admin/user'
}[config.env || 'mock'];

export default createAPI(baseUrl);