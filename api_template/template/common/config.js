export default {
  // 4种环境 mock dev pre prod
  // mock: 'https://www.easy-mock.com/mock/5afcf3ffb3da6b4aafaebacc/banmutang-admin',
  // dev: 'http://localhost:9000',
  // pre: '',
  // prod: 'https://edaoe.com'

  //env:'prod'
  env: process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
};