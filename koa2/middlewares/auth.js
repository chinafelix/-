const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

/**
 * 权限验证中间件，不在全局注册，而是在接口调用的时候传入， book.js/   /latest接口有示例
 */
class Auth {
  constructor(level){
    this.level = level || 1     // 实例属性
    Auth.USER = 8               // 类属型
    Auth.ADMIN = 16;
    Auth.SUPER_ADMIN = 32
  }

  get m () {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token不合法';
      let decode = {}
      if(!userToken || !userToken.name) {
        throw new global.errs.Forbidden(errMsg)
      }
      try {
        decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (error) {
        if(error.name === 'TokenExpiredError') {
          errMsg = 'token过期' 
        }
        throw new global.errs.Forbidden(errMsg)
      }

      if(decode.scope < this.level) {
        throw new global.errs.Forbidden('权限不足')
      }
      
      // 取出uid、scope
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }

      await next()
    }
  }

  static verifyToken(token){
    try {
      jwt.verify(token, global.config.security.secretKey)
      return true
    } catch (error) {
      return false
    }
  }

}

module.exports = Auth