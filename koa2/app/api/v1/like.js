const Router = require('koa-router')
const Auth = require('../../../middlewares/auth')
const { Favor } = require('../../models/favor')

const router = new Router({
  prefix: '/v1/like'
})

router.post('/', new Auth().m , async (ctx) => {
  // 验证就跳过去了
  // ctx.body = ctx.auth
  const r = await Favor.like(ctx.request.body.art_id, ctx.request.body.type, ctx.auth.uid)

  throw new global.errs.Success()
})

module.exports = router
