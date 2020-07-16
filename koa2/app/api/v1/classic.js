const Router = require('koa-router')
const {Flow} = require('../../models/flow')
const { Art } = require('../../models/art')
const { Favor } = require('../../models/favor')
const auth = require('basic-auth')
const Auth = require('../../../middlewares/auth')

const router = new Router({
  prefix: '/v1/classic'
})

// 最新
router.get('/latest', async (ctx, next) => {
  const flow = await Flow.findOne({
    order: [
      ['index', 'desc']
    ]
  })

  const art = await Art.getData(flow.art_id, flow.type, false)
  const like = await Favor.userLikeIt(flow.art_id, flow.type, ctx,auth.uid)
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', like)
  ctx.body = art
})

// 下一条
router.get('/next/:index', new Auth().m, async (ctx, next) => {
  const index = Number(ctx.params.index)
  const flow = await Flow.findOne({
    where: {
      index: index + 1
    }
  })
  // console.log('******index*****', flow)

  if(!flow) {
    throw new global.errs.NotFound()
  }
  const art = await Art.getData(flow.art_id, flow.type, false)
  const likeStatus = await Favor.userLikeIt(flow.art_id, flow.type, ctx,auth.uid)
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', likeStatus)
  ctx.body = art
})

// 点赞信息
router.get('/:id/:type/favor', new Auth().m, async ctx => {
  const { id, type } = ctx.params
  const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
  ctx.body = {
    fav_nums:  artDetail.fav_nums,
    like_status: artDetail.like_status
  }
})

// 点赞详情， 和点赞信息非常类似
router.get('/:id/:type', new Auth().m, async ctx => {
  const { id, type } = ctx.params
  const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
  ctx.body = artDetail
})

// 用户所有的喜欢
router.get('/favor', new Auth().m, async ctx => {
  const uid = ctx.auth.uid;
  
  ctx.body = await Favor.getMyClassicFavors(uid)
})

module.exports = router
