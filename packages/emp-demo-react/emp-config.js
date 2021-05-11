const path = require('path')
const packagePath = path.join(path.resolve('./'), 'package.json')
const {dependencies} = require(packagePath)
module.exports = ({config, env, empEnv}) => {
  const port = 8001
  const url = {
    prod: 'https://emp-react-base.yourdomain.com/',
    test: 'https://emp-react-base-test.yourdomain.com/',
    dev: `http://localhost:${port}/`,
  }
  console.log("=========>empEnv", empEnv)
  const publicPath = empEnv ? url[empEnv] : `http://localhost:${port}/`
  // 设置项目URL
  config.output.publicPath(publicPath)
  // 设置项目端口
  config.devServer.port(port)
  config.plugin('mf').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        name: 'ReactComponents',
        // 暴露项目的全局变量名
        library: {type: 'var', name: 'ReactComponents'},
        exposes: {
          './components/Hello': 'src/components/Hello',
        },
        remotes: {
          '@emp/vueComponents': 'vue2Components',
        },
        // shared: {
        //   react: {eager: true, singleton: true, requiredVersion: '^16.13.1'},
        //   'react-dom': {eager: true, singleton: true, requiredVersion: '^16.13.1'},
        //   'react-router-dom': {requiredVersion: '^5.1.2'},
        // },
        shared: {...dependencies},
        // 被远程引入的文件名
        filename: 'emp.js',
      },
    }
    return args
  })

  // 配置 index.html
  config.plugin('html').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        // head 的 title
        title: 'EMP REACT BASE',
        // 远程调用项目的文件链接
        files: {
          js: ['http://localhost:8006/emp.js']
        },
      },
    }
    return args
  })
}
