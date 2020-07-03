const requireDirectory = require('require-directory')     // 导出指定目录下的所有文件
const Router = require('koa-router')

class InitManager {
  static init(app) {
    // 调用类的静态方法
    InitManager.initRouter(app)
    InitManager.initErrorException()
    InitManager.initConfig()
  }

  // 初始化路由的方法
  static initRouter (app) {
    /**
     *  自动注册 requireDirectory 导入的路由对象
     * @param {*} obj 路由文件导出的对象
     */
    const loadModule = (obj) => {
      if(obj instanceof Router) {
        app.use(obj.routes())
      }
    }
    /** 
     * require-directory 自动帮助我们导入对一个文件夹下的所有文件，
     * 这里我用来导入路由文件，放在 InitManager 类里面处理
     * 使用 'require-directory' 中间件后，无需再倒入路由文件 
     */ 
    requireDirectory(module, '../app/api', {
      visit: loadModule
    })
  }

  // 异常处理类挂载到global全局对象
  static initErrorException = () => {
    const exception = require('./http-exception')
    global.errs = exception
  }

  // 初始化配置文件
  static initConfig = () => {
    const config = require(process.cwd() + '/config/config')
    global.config = config
  }

}

module.exports = InitManager
