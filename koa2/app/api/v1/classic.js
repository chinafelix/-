const Router = require('koa-router')

const router = new Router()

router.get('/v1/classic/latest', (ctx, next) => {
  ctx.body = {
    content: 'classic'
  }
})

module.exports = router
