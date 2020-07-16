const { Model, Sequelize } = require('sequelize')
const { db } = require('../../cores/db')
const util = require('util')
const axios = require('axios')
const { Favor } = require('./favor')

class Book extends Model {
  async detail(id){
    const url = util.format(global.config.yushu.detailUrl, id)
    const detail = await axios.get(url)
    return detail.data
  }

  static async searchBookFormYuShu(query, start, count, summary=1){
    const url = util.format(global.config.yushu.keywordUrl, encodeURI(query), count, start, summary)
    const result = await axios.get(url)
    return result.data
  }

  static async getMyFavorCount(uid){
    const count = await Favor.count({
      where: {
        type: 400,
        uid
      }
    })
    return count
  }

}

Book.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize: db,
  tableName: 'book'
})

module.exports = {
  Book
}
