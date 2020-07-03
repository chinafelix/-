const bcrypt = require('bcryptjs')

const {Sequelize, Model} = require('sequelize')
const { db } = require('../../cores/db')

class User extends Model {      // 必须继承Model
  static async verifyEmailPassword (email, plainPassword) {
    const user = await User.findOne({
      where: { email }
    })
    if(!user) throw new global.errs.NotFound('用户不存在')

    const correct = bcrypt.compareSync(plainPassword, user.password)
    if(!correct) throw new global.errs.AuthFailed('密码不正确')

    return user
  }
  
  static async getUserByOpenId (openid){
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
  }

  static async registerUserByOpenId (openid){
    const user = await User.create({
      openid
    })
    return user
  }
}

User.init({     // 数据库字段的数据类型
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  password: {
    type: Sequelize.STRING,
  },
  openid: {         // 小程序openid
    type: Sequelize.STRING(64),     // 64位长度
    unique: true
  }
}, {
  sequelize: db,
  tableName: 'user'         // 配置表名
})

module.exports = User
