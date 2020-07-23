
module.exports = (option) => {
  return async (ctx, next) =>{
    const token = ctx.request.header.token
    let decode = ''
    if(token) {
      try {
        decode = ctx.app.jwt.verify(token, option.secret)
        // console.log('decode======>',decode);
        // ctx.body = {
        //   userId: decode.userId,
        //   scope: decode.scope
        // }

        ctx.auth = {
          uid: decode.userId
        }
        await next()
      } catch (error) {
        ctx.status = 401
        ctx.body = {
          message: error.message,
          code: 500
        }
        return
      }
    } else {
      ctx.status = 401
      ctx.body = {
        message: '请先登录'
      }
      return
    }
  }
}
