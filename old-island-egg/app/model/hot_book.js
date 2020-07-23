module.exports = app => {
  const { INTEGER,STRING } = app.Sequelize

  const HotBook = app.model.define('hot_book',{
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    index: INTEGER,
    image: STRING,
    author: STRING,
    title: STRING,
    status: INTEGER
  })

  HotBook.getList = async () => {
    const list = await HotBook.findAll({
      order: [
        ['index', 'desc']
      ]
    })

    return list || []
  }

  return HotBook
}