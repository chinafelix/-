const Koa = require('koa')
const parser = require('koa-bodyparser')
const path = require('path')
const static = require('koa-static')

const InitManager = require('./cores/init')
const catchError = require('./middlewares/exception')
// const User = require('./app/models/users')

const app = new Koa()
// new User()

// 注册中间件
app.use(catchError)
app.use(parser())
app.use(static(path.join(__dirname, 'static')))       // koa的静态资源处理

// 初始类， 路由初始化也放在这个类下面
InitManager.init(app)

// api要考虑兼容多个版本，所以创建router时，建议分版本， v1，v2
// app.use(book.routes())
//   .use(classic.routes())

app.listen(3000)
