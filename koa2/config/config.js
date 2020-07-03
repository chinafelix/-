module.exports = {
  env: 'dev',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'fengxia'
  },
  security: {
    secretKey: 'tangzhipanmingyue',
    expiresIn: 24 * 60 * 60
  },
  wx: {
    appId: 'wx9ed9b1369747a89c',
    appSecret: '6d14f587a4f20dbcc27e8bacb4abb610',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}