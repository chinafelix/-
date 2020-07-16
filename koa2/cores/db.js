const {Sequelize} = require('sequelize')
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',     // 哪个数据库
  host,
  port,
  logging: true,          // 默认true，会显示sql语句
  timezone: '+08:00',     // 北京时间
  define: {
    timestamps: true,        //是否自动生成时间字段（createdAt，updatedAt）， 默认true，生成
    paranoid: true,           // deletedAt, 默认 false， 软删除
    createdAt: 'created_at',      // 默认生成createdAt， 换成 'created_at'
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,            // 多单词拼接的字段名，默认是驼峰式写法，换成下环线拼接
    freezeTableName: true,
    scopes: {
      del_time: {       // del_time 自定义的命名空间, 在 art.js里有调用示例
        attributes: {
          exclude: ['updated_at', 'created_at', 'deleted_at']     // 返回结果排除这三个字段
        }
      }
    }
  }
})

sequelize.sync()

module.exports = {
  db: sequelize
}
