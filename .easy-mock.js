module.exports = {
  host: 'http://47.98.217.136:7300',
  output: 'src/api',
  template: './api_template',
  projects: [
    {
      id: '5bae3492dbb5311e7a7f74f0',
      // 生成到 api/common 目录下
      name: 'common'
    },
    {
      id: '5bae3432dbb5311e7a7f74ed',
      name: 'user'
    }
  ]
}
