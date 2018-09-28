import {
  createAPI
} from '../util';
import config from '../config';

const baseUrl = {
  mock: 'http://47.98.217.136:7300/mock/5ba09d70dbb5311e7a7f74e2/common',
  dev: 'http://localhost:9800/common',
  pre: '',
  prod: 'https://edaoe.com/common'
}[config.env || 'mock'];

export default createAPI(baseUrl);