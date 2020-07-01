const Router = require('koa-router')
const { PositiveIntegerValidator } = require('../../validators/validator')

const router = new Router({
  prefix: '/v1/book'
})

router.get('/latest', (ctx, next) => {
  ctx.body = {
    content: 'book'
  }
})

router.post('/latest/:id', async (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.header
  const body = ctx.request.body
  
  const isInteger = await new PositiveIntegerValidator().validate(ctx)

  ctx.body = {
    path,
    query,
    headers,
    body
  }
})

module.exports = router
