const { Movie, Music, Sentence } = require('./classic')

const _finder = async (type, _f) => {
  let art = null
  switch (type) {
    case 100:
      art = await Movie.findOne(_f)
      break;
    case 200:
      art = await Music.findOne(_f)
      break;
    case 300:
      art = await Sentence.findOne(_f)
      break;
    case 400:

      break;

    default:
      break;
  }
  return art
}

class Art {
  static async getData(art_id, type) {
    const finder = {
      where: {
        id: art_id
      }
    }
    return await _finder(type, finder)
  }
}

module.exports = { Art }
