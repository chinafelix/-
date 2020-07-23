'use strict'

const Service = require('egg').Service
const axios = require('axios')
const util = require('util')

const Auth = require('../middleware/auth')

class UserService extends Service {
  async login(){
    const {ctx, app} = this
    const { appId, appSecret, loginUrl } = ctx.helper.wx
    const code = ctx.request.body.account
    const url = util.format(loginUrl, appId, appSecret, code)
    const result = await axios.get(url)
    const openid = result.data.openid
    let user = await ctx.model.User.getUserById(openid)
    if(!user) {
      user = await ctx.model.User.createUserById(openid)
    }

    const token = app.jwt.sign({
      userId: user.id,
      scope: Auth.USER
    }, app.config.jwt.secret, {
      expiresIn: app.config.jwt.expiresIn
    })

    const { id, name, openId } = user

    ctx.auth = {
      uid: id
    }

    return {
      id, name, openId,
      token
    }
  }

  async getDataByType(artId, type){
    const {ctx} = this
    const { favorTypes } = ctx.helper
    let data
    switch (type) {
      case favorTypes.MOVIE:
        data = await ctx.model.Movie.getData(artId)
        break;
      case favorTypes.MUSIC:
        data = await ctx.model.Music.getData(artId)
        break;
      case favorTypes.SENTENCE:
        data = await ctx.model.Sentence.getData(artId)
        break;
      default:
        break;
    }

    return data;
  }

  async latest(){
    const {ctx, app} = this
    const flow = await ctx.model.Flow.findOne({
      order: [
        ['index', 'desc']
      ]
    })

    if(!flow) {
      return {}
    }

    const { artId, type } = flow
    const data = await this.getDataByType(artId, type)

    const likeStatus = await ctx.model.Favor.isLike(artId, type, ctx.auth.uid)

    return { ...data.dataValues, likeStatus}
  }

  async getFlowByIndex(){
    const {ctx} = this
    const index = ctx.params.index

    const flow = await ctx.model.Flow.findOne({
      where: {
        index
      }
    })

    if(!flow) {
      return {}
    }

    const { artId, type } = flow
    const data = await this.getDataByType(artId, type)

    const likeStatus = await ctx.model.Favor.isLike(artId, type, ctx.auth.uid)

    return { ...data.dataValues, likeStatus}
  }

  async getBookList() {
    const {ctx} = this
    const bookList = await ctx.model.HotBook.getList()

    return bookList
  }

  async getBooksByKeyword (query, start, count, summary){
    const {ctx} = this
    const url = util.format(ctx.helper.book.keywordUrl, encodeURI(query), count, start, summary)
    const list = await axios.get(url)
    
    return list.data
  }

}


module.exports = UserService
