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
    openId: STRING
  })


  User.getUserById = async (openId) => {
    const user = await User.findOne({
      where: {
        openId
      }
    })
    return user
  }

  User.createUserById = async (openId) => {
    const user = await User.create({
      openId
    })
    return user
  }

  return User
}
