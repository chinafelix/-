const { HttpException } = require('../cores/http-exception')

/**
 *  HttpException仅仅用来判断错误是不是已知错误
 *  这是一个中间件，因为它在app.js通过use注册了，所以包含ctx和next参数
 *  不用显式调用，在接口抛出异常后，它会自动触发
 * @param {Object} ctx 
 * @param {Function} next 
 */
const catchError = async (ctx, next) => {       
  try {
    await next()
  } catch (error) {
    const idDev = global.config.env === 'dev'
    const isHttpException = error instanceof HttpException
    if(idDev && !isHttpException) {
      throw error
    }

    // 已知错误，格式是自己在接口抛出异常时定义的
    if(isHttpException) {
      ctx.body = {
        ...error,
        url: `${ctx.method} ${ctx.path}` 
      }
      ctx.status = error.status
    } else {      //  未知错误
      ctx.body = {
        message: error.message,
        code: 9999,
        url: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError
