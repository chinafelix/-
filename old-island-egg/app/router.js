'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = async app => {
  const { router, controller, middleware, config } = app;

  const options = config.jwt
  const auth = await middleware.auth(options)

  // 登陆
  router.post('/api/user/login', controller.user.login)
  
  // 最新期刊
  router.get('/api/flow/latest', auth, controller.user.latest)

  // 上一期或者下一期
  router.get('/api/flow/:index', auth, controller.user.getFlowByIndex)

  // 热门书籍列表
  router.get('/api/book/list', controller.user.getBookList)

  // 关键字搜索
  router.get('/api/book/search', controller.user.getBookByKeyword)

};
