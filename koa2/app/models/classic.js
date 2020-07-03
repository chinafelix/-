const {Sequelize, Model} = require('sequelize')
const { db } = require('../../cores/db')

const baseFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: Sequelize.INTEGER,
  title: Sequelize.STRING,
  type: Sequelize.TINYINT
}

class Movie extends Model {

}

Movie.init(baseFields, {
  sequelize: db,
  tableName: 'movie'
})


class Sentence extends Model {

}

Sentence.init(baseFields, {
  sequelize: db,
  tableName: 'sentence'
})

class Music extends Model {

}

Music.init({...baseFields, url: Sequelize.STRING}, {
  sequelize: db,
  tableName: 'music'
})

module.exports = {
  Movie,
  Sentence,
  Music
}
