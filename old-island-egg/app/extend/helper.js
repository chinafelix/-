/**
 * 期刊类型
 */
const favorTypes = {
  MOVIE: 100,
  MUSIC: 200,
  SENTENCE: 300
}

/**
 * 登陆类型:
 * 包括账号密码登陆、微信登陆、手机登录
 * 暂时只做了微信登陆
 */
const loginType = {
  USE_MINI_PROGRAM: 100,
  USE_EMAIL: 200,
  USE_MOBILE: 300
}

/**
 * 微信登陆配置
 */
const wx = {
  appId: 'wx9ed9b1369747a89c',
  appSecret: '6d14f587a4f20dbcc27e8bacb4abb610',
  loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
}

/**
 * 鱼书 配置
 */
const book = {
  detailUrl:'http://t.yushu.im/v2/book/id/%s',
  keywordUrl:'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
}


module.exports = {
  favorTypes,
  loginType,
  wx,
  book
}