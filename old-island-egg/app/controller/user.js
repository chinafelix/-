'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async login() {
    const { ctx } = this;
    const res = await ctx.service.user.login()
    ctx.body = res || {}
  }

  async latest () {
    const { ctx } = this;
    const res = await ctx.service.user.latest()
    ctx.body = res || {}
  }

  async getFlowByIndex (){
    const {ctx} = this
    
    const result = await ctx.service.user.getFlowByIndex()
    ctx.body = result || {}
  }

  async getBookList (){
    const {ctx} = this

    const result = await ctx.service.user.getBookList()
    ctx.body = result || {}
  }

  async getBookByKeyword(){
    const { ctx, app } = this
    const { query, start = 0, count = 20, summary = 1 } = ctx.query

    const errs = app.validator.validate({ query: 'boolean' }, ctx.query)

    const list = await ctx.service.user.getBooksByKeyword(query, start, count, summary)

    ctx.body = list
  }

}

module.exports = HomeController;
