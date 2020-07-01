const {Sequelize, Model} = require('sequelize')
const { db } = require('../../cores/db')

class User extends Model {      // 必须继承Model
  
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
