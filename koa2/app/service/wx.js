const util = require('util')
const axios = require('axios')

const User = require('../models/users')
const {generateToken} = require('../../cores/util');
const Auth = require('../../middlewares/auth');

class WXManager {
  constructor(){

  }

  static async codeToToken(code) {
    // code 是小程序生成
    // openid 用户在小程序的唯一标识
    // 总共需要appid、appsecret、code三个参数， 其中appid、appsecret是固定的
    const url = util.format(global.config.wx.loginUrl, global.config.wx.appId, global.config.wx.appSecret, code);
    const result = await axios.get(url)
    if(result.status !== 200) {
      throw new global.errs.AuthFailed(result)
    }
    if(result.data.errcode) {
      throw new global.errs.AuthFailed(result.data.errmsg)
    }

    // 拿到openid后，生成一份user数据， 包含 uid
    let user = await User.getUserByOpenId(result.data.openid)
    if(!user) {
      user = await User.registerUserByOpenId(result.data.openid)
    }
    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {WXManager}
