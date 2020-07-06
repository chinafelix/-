const {Sequelize, Model, INTEGER} = require('sequelize')
const { db } = require('../../cores/db')
const { sequelize } = require('./users')
const { Art } = require('./art')

class Favor extends Model {
  static async like( art_id, type, uid ){
    // 向favor表插入数据，并且修改classic的一个模型的数据
    const favor = await Favor.findOne({
      where: {
        art_id, type, uid
      }
    })
    if(favor) {
      throw new global.errs.LikeException()
    }
    return db.transaction(async t => {
      await Favor.create({
        art_id, type, uid
      }, { transaction: t })

      const art = await Art.getData(art_id, type)
      await art.increment('fav_nums', { by: 1, transaction: t })
    })
  }

  static async dislike(art_id, type, uid){
    const favor = await Favor.findOne({
      where: {
        art_id, uid, type
      }
    })
    if(!favor) {
      throw new global.errs.DisLikeException()
    }
    return db.transaction(async t => {
      await favor.destroy({
        force: true,          // 是否是软删除， false： 是， true： 否
        transaction: t
      })

      const art = await Art.getData(art_id, type)
      await art.decrement('fav_nums', { by: 1, transaction: t })
    })
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
