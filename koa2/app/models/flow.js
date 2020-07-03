const {Sequelize, Model} = require('sequelize')
const { db } = require('../../cores/db')

class Flow extends Model {

}

Flow.init({
  index: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER,
}, {
  sequelize: db,
  tableName: 'flow'
})

module.exports = {
  Flow
}