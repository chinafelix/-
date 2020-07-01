const Koa = require('koa')
const parser = require('koa-bodyparser')

const InitManager = require('./cores/init')
const catchError = require('./middlewares/exception')
// const User = require('./app/models/users')

/** 
 * require-directory 自动帮助我们导入对一个文件夹下的所有文件，
 * 这里我用来导入路由文件，放在 InitManager 类里面处理
 * 使用 'require-directory' 中间件后，无需再倒入路由文件 
 */ 
// const book = require('./api/v1/book')
// const classic = require('./api/v1/classic')

const app = new Koa()
// new User()

// 注册中间件
app.use(catchError)
app.use(parser())

// 初始类， 路由初始化也放在这个类下面
InitManager.init(app)

// api要慨率兼容多个版本，所以创建router时，建议分版本， v1，v2
// app.use(book.routes())
//   .use(classic.routes())

app.listen(3000)
