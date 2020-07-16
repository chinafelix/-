const Router = require('koa-router')
const { PositiveIntegerValidator } = require('../../validators/validator')
const Auth = require('../../../middlewares/auth')
const { HotBook } = require('../../models/hot_book')
const { Book } = require('../../models/book')
const { Favor } = require('../../models/favor')
const {Comment} = require('../../models/comment')

const router = new Router({
  prefix: '/v1/book'
})

router.get('/hot_list',async (ctx, next) => {
  const books = await HotBook.getAll()
  ctx.body = {books}
})

// 书籍详情
router.get('/detail/:id', async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const book = new Book()
  ctx.body =await book.detail(v.get('path.id'))
})

// 书籍搜索
router.get('/search', async ctx => {
  const { query, start=0, count=20 } = ctx.query
  const result = await Book.searchBookFormYuShu(query, start, count)
  ctx.body = result
})

// 获取我喜欢的数量
router.get('/favor/count', new Auth().m, async ctx => {
  const count = await Book.getMyFavorCount(ctx.auth.uid)
  ctx.body = {
    count
  }
})

// 书籍的点赞数
router.get('/favor/:book_id', new Auth().m, async ctx => {
  const book_id = ctx.params.book_id
  const result = await Favor.getBookFavor(ctx.auth.uid, book_id)
  ctx.body = result
})

// 新增短评
router.post('/add/short_comment', new Auth().m, async ctx => {
  const { book_id, content } = ctx.request.body
  const result = await Comment.addComment(book_id, content)
  ctx.body = result
})

// 获取短评
router.get('/show/short_comment/:book_id', new Auth().m, async ctx => {
  const { book_id } = ctx.params
  const comments = await Comment.getComments(book_id)
  ctx.body = {
    comments
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
