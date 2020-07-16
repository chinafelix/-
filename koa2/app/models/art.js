const { Movie, Music, Sentence } = require('./classic')
const { Op } = require('sequelize')

const _finder = async (type, _f, userScope, art_id) => {
  let art = null
  const scope = userScope && 'del_time' || null
  switch (type) {
    case 100:
      art = await Movie.scope(scope).findOne(_f)
      break;
    case 200:
      art = await Music.scope(scope).findOne(_f)
      break;
    case 300:
      art = await Sentence.scope(scope).findOne(_f)
      break;
    case 400:     // 书籍
      const { Book } = require('./book')
      art = await Book.findAll(_f)
      if(!art) {
        art = await Book.create({
          id: art_id
        })
      }
      break;
    default:
      break;
  }
  return art
}

class Art {
  constructor(art_id, type) {
    this.art_id = art_id
    this.type = type
  }

  async getDetail(uid){
    const { Favor } = require('./favor')
    const art = await Art.getData(this.art_id, this.type, false)
    const likeStatus = await Favor.userLikeIt(this.art_id, this.type, uid)
    if(!art) {
      throw new global.errs.NotFound()
    }

    return { ...art.dataValues, like_status: likeStatus}
  }

  static async getData(art_id, type, userScope) {
    const finder = {
      where: {
        id: art_id
      }
    }
    return await _finder(parseInt(type), finder, userScope, art_id)
  }

  static async getList(artList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: []
    }
    let arts = []

    for(let art of artList) {
      artInfoObj[art.type].push(art.art_id)
    }

    for(let key in artInfoObj) {
      const ids = artInfoObj[key];
      if(!ids.length) {
        continue
      }
      // console.log('-----------------------------------', await Art.getListByType(ids, parseInt(key)))
      // arts = [...arts, ...await Art.getListByType(ids, parseInt(key))]
      arts.push(await Art.getListByType(ids, parseInt(key)))
    }

    return arts.flat()
  }

  static async getListByType(ids, type){
    let art = []
    const _f = {
      where: {
        id: {
          [Op.in]: ids
        }
      }
    }
    switch (type) {
      case 100:
        art = await Movie.findAll(_f)
        break;
      case 200:
        art = await Music.findAll(_f)
        break;
      case 300:
        art = await Sentence.findAll(_f)
        break;
      case 400:
        
        break;
  
      default:
        break;
    }
    return art
  }

}

module.exports = { Art }
