const { Model, Sequelize } = require('sequelize')
const { db } = require('../../cores/db')

class Comment extends Model {
  static async addComment (bookId, content){
    // 输入同内容短评，不插入，而是+1
    const comment = await Comment.findOne({
      where: {
        book_id: bookId,
        content
      }
    })
    if(!comment) {
      return await Comment.create({
        book_id: bookId,
        nums: 1,
        content
      })
    }
    return await comment.increment('nums', { by: 1 })
  }

  static async getComments(book_id){
    const comments = await Comment.findAll({
      where: {
        book_id
      }
    })
    return comments
  }
}

Comment.init({
  content: Sequelize.STRING(12),
  nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  book_id: Sequelize.INTEGER
}, {
  sequelize: db,
  tableName: 'comment'
})

module.exports = {
  Comment
}
