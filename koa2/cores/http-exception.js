// http请求异常处理基类
class HttpException extends Error {
  constructor(
    message="服务器出错",
    code="10001",
    status=500
  ){
    super()
    this.message = message
    this.code = code
    this.status = status
  }
}

// http请求 参数异常子类
class ParameterException extends HttpException {
  constructor (message, code) {
    super()
    this.message = message || '参数错误'
    this.code = code || '10001'
    this.status = 400
  }
}

// http请求 参数异常子类
class Success extends HttpException {
  constructor (message, code) {
    super()
    this.message = message || 'ok'
    this.code = code || '0'
    this.status = 200
  }
}

class NotFound extends HttpException {
  constructor (message, code) {
    super()
    this.message = message || 'not found'
    this.code = code || '10000'
    this.status = 404
  }
}

class AuthFailed extends HttpException {
  constructor (message, code) {
    super()
    this.message = message || '授权失败'
    this.code = code || '10004'
    this.status = 401
  }
}

class Forbidden extends HttpException {
  constructor (message, code) {
    super()
    this.message = message || '没有权限访问'
    this.code = code || '10005'
    this.status = 403
  }
}

class LikeException extends HttpException {
  constructor (message, code) {
    super()
    this.message = message || '你已经点过赞了'
    this.code = code || '60001'
    this.status = 400
  }
}

class DisLikeException extends HttpException {
  constructor (message, code) {
    super()
    this.message = message || '你已经取消点赞了'
    this.code = code || '60002'
    this.status = 400
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  AuthFailed,
  Forbidden,
  LikeException,
  DisLikeException
}
