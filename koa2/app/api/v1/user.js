const bcrypt = require('bcryptjs')
const Router = require('koa-router')

const { RegisterValidator } = require('../../validators/validator')

const User = require('../../models/users')

const router = new Router({
  prefix: '/v1/user'
})


router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const salt = bcrypt.genSaltSync(10)     // 10表示计算机生成salt的成本，一般采用10
  const pwd = bcrypt.hashSync(v.get('body.password1'), salt)
  const user = {
    nickname: v.get('body.nickname'),
    email: v.get('body.email'),
    password: pwd,
  }
  await User.create(user)
  throw new global.errs.Success()
})

module.exports = router