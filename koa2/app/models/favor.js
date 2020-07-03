const {Sequelize, Model, INTEGER} = require('sequelize')
const { db } = require('../../cores/db')
const { sequelize } = require('./users')
const { Art } = require('./art')

class Favor extends Model {
  static async like( art_id, type, uid ){
    // 向favor表插入数据，并且修改classic的一个模型的数据
    const favor = Favor.findOne({
      where: {
        art_id, type, uid
      }
    })
    if(favor) {
      throw new global.errs.LikeException()
    }
    db.transaction(async t => {
      await Favor.create({
        art_id, type, uid
      }, { transaction: t })

      const art = await Art.getData(art_id, type)
      await art.increment('fav_nums', { by: 1, transaction: t })
    })
  }

  static async dislike(art_id, type, uid){  

  }
}

Favor.init({
  uid: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize: db,
  tableName: 'favor'
})

module.exports = {
  Favor
}
