const Router = require('koa-router')
const { TokenValidator, NotEmptyValidator } = require('../../validators/validator')
const { loginType } = require('../../utils/enum')
const User = require('../../models/users')
const {WXManager} = require('../../service/wx')
const { generateToken } = require('../../../cores/util')
const Auth = require('../../../middlewares/auth')

const router = new Router({
  prefix: '/v1/token'
})

router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  let token;
  switch(v.get('body.type')) {
    case loginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break;
    case loginType.USER_MINI_PROGRAM:
      token = await WXManager.codeToToken(v.get('body.account'))
      break;
    default:
      throw new global.errs.ParameterException('没有相应的处理函数')
  }

  ctx.body = {
    token
  }
})

router.post('/verify', async (ctx) => {
  const v = await new NotEmptyValidator().validate(ctx)
  const result = Auth.verifyToken(v.get('body.token'))
  ctx.body = {
    is_valid: result
  }
})

async function emailLogin (account, secret){
  const user = await User.verifyEmailPassword(account, secret)
  return generateToken(user.id, 8)
}

module.exports = router
