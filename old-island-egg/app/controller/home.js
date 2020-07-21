'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    console.log('******************************')
    console.log('******************************',ctx.model.User.addUser)
    const r = await ctx.model.User.addUser()
    // const r = ctx.model.User
    ctx.body = JSON.stringify({
      data: r
    });
  }
}

module.exports = HomeController;
