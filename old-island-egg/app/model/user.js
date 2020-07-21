// 'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: STRING(30),
    password: STRING(32),
    email: STRING,
    openid: STRING
  })


  User.addUser = async () => {
    return await User.create({
      name: '冯侠',
      password: '123456',
      email: '123456@qq.com',
      openid: '14353defined53'
    })
  }

  return User
}