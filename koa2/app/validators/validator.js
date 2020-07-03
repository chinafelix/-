const { LinValidator, Rule } = require('../../cores/lin-validator-v2')
const { loginType } = require('../utils/enum')

class PositiveIntegerValidator extends LinValidator {
  constructor(){
    super()
    this.id = [
      new Rule('isInt', '必须数字id', { min: 1 })
    ]
  }
}

class RegisterValidator extends LinValidator {
  constructor () {
    super()
    this.nickname = [
      new Rule('isLength', '长度在2~32位字符', {min: 2, max: 32})
    ],
    this.email = [
      new Rule('isEmail', '邮箱格式错误')
    ],
    this.password1 = [
      new Rule('isLength', '长度在6~32位字符', {min: 6, max: 32})
    ]
    this.password2 = this.password1
  }

  validatePassword(values){
    const { password1, password2 } = values.body
    if(password1 !== password2) {
      throw new Error('两个密码必须相同')
    }
  }
}

// 校验token的颁发
class TokenValidator extends LinValidator {
  constructor(){
    super()
    this.account = [
      new Rule('isLength', '账号常度在6~32位字符之间', { min: 6, max: 32 })
    ]
    this.secret = [
      new Rule('isOptional'),       // 可填、可为空
      new Rule('isLength', '至少6位字符', { min: 6, max: 128 })
    ]
    
  }
  validateLoginType(val){
    if(!val.body.type) {
      throw new Error('type是必须参数')
    }
    if(!loginType.isThisType(val.body.type)) {
      throw new Error('type参数不合法')
    }
  }
}

class NotEmptyValidator extends LinValidator {
  constructor(){
    super()
    this.token = [
      new Rule('isLength', '不能为空', {min: 1})
    ]
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator
}
