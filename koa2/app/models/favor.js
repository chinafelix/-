const {Sequelize, Model, Op} = require('sequelize')
const { db } = require('../../cores/db')
// const { sequelize } = require('./users')
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

      const art = await Art.getData(art_id, type, false)
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

      const art = await Art.getData(art_id, type, false)
      await art.decrement('fav_nums', { by: 1, transaction: t })
    })
  }

  static async userLikeIt (art_id,type, uid){
    const favor = await Favor.findOne({
      where: {
        art_id,type, uid
      }
    })

    return favor && true || false
  }

  static async getMyClassicFavors (uid){
    const favors = await Favor.findAll({
      where: {
        uid,
        type: {
          [Op.not]: 400
        }
      }
    })

    return await Art.getList(favors)
  }

  static async getBookFavor(uid, book_id) {
    const favor_num = await Favor.count({
      where: {
        art_id: book_id
      }
    })
    const myFavor = await Favor.findOne({
      where: {
        art_id: book_id,
        uid,
        type: 400
      }
    })
    return {
      favor_num,
      like_status: myFavor && 1 || 0
    }
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
