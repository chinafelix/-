
module.exports = app => {
  const { INTEGER } = app.Sequelize

  const Flow = app.model.define('flow',{
    id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    artId: INTEGER(11),
    index: INTEGER(11),
    type: INTEGER(11),
    status: INTEGER(6)
  })


  return Flow
}