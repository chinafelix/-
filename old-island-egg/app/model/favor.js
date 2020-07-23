
module.exports = app => {
  const { INTEGER } = app.Sequelize

  const Favor = app.model.define('favor',{
    id: {
      type: INTEGER(10),
      primaryKey: true,
      autoIncrement: true
    },
    artId: INTEGER,
    uid: INTEGER,
    type: INTEGER
  })

  Favor.isLike = async (artId, type, uid) => {
    const favor = await Favor.findOne({
      where: {
        artId, type, uid
      }
    })
    if(favor) {
      return true
    }
    return false
  }


  return Favor
}