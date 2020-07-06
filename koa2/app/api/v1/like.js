const Router = require('koa-router')
const Auth = require('../../../middlewares/auth')
const { Favor } = require('../../models/favor')

const router = new Router({
  prefix: '/v1/like'
})

router.post('/:status', new Auth().m , async (ctx) => {
  // 参数验证就跳过去了
  // ctx.body = ctx.auth
  const status = parseInt(ctx.params.status)
  let r;
  if(status) {
    r = await Favor.like(ctx.request.body.art_id, ctx.request.body.type, ctx.auth.uid)
  }else {
    r = await Favor.dislike(ctx.request.body.art_id, ctx.request.body.type, ctx.auth.uid)
  }
  throw new global.errs.Success()
})

module.exports = router
