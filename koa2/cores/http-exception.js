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

module.exports = {
  HttpException,
  ParameterException,
  Success
}
