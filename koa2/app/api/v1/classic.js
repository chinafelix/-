const Router = require('koa-router')
const {Flow} = require('../../models/flow')
const { Art } = require('../../models/art')

const router = new Router({
  prefix: '/v1/classic'
})

router.get('/latest', async (ctx, next) => {
  const flow = await Flow.findOne({
    order: [
      ['index', 'desc']
    ]
  })

  const art = await Art.getData(flow.art_id, flow.type)
  art.setDataValue('index', flow.index)
  ctx.body = art
})

// router.get('')

module.exports = router
