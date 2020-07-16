const {Sequelize, Model, Op} = require('sequelize')
const { db } = require('../../cores/db')
const { Favor } = require('./favor')
const favor = require('./favor')

class HotBook extends Model {
  
  // 查询所有的书籍
  static async getAll(){
    const books = await HotBook.findAll({
      order: ['index']
    })
    const ids = []
    books.forEach(book => {
      ids.push(book.id)
    })
    const favors = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: ids
        },
        type: 400
      },
      group: ['art_id'],
      attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']]
    })

    books.forEach(book => {
      HotBook._getEachBooksStatus(book, favors)
    })
    return books
  }

  static _getEachBooksStatus(book, favors){
    let count = 0
    favors.forEach(favor => {
      if(book.id === favor.art_id) {
        count = favor.get('count')
      }
    })
    book.setDataValue('count', count)
    return book
  }

}

HotBook.init({
  index: Sequelize.INTEGER,       // 用于排序
  image: Sequelize.STRING,
  author: Sequelize.STRING,
  title: Sequelize.STRING
}, {
  sequelize: db,
  tableName: 'hot_book'
})

module.exports = {
  HotBook
}
