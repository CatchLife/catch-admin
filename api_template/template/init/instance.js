import {
  createAPI
} from '{{$$.relative("util")}}';
import config from '{{$$.relative("config")}}';

const baseUrl = {
  mock: '{{$$.joinUrl(config.host, "mock", data.project._id, data.project.url)}}',
  dev: 'http://localhost:9800{{$$.joinUrl( data.project.url)}}',
  pre: '',
  prod: 'https://edaoe.com{{$$.joinUrl( data.project.url)}}'
}[config.env || 'mock'];

export default createAPI(baseUrl);