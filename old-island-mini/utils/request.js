
const request = (url, obj, type) => {
  const baseUrl = 'http://localhost:3000/v1'
  const data = obj || {}
  const token = wx.getStorageSync('token')
  let encodeToken = ''
  const method = type || 'get'
  if(token) {
    encodeToken = _edcode()
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}${url}`,
      method,
      header: {
        'content-type': 'application/json',
        Authorization: encodeToken
      },
      data,
      success: res => {
        console.log(res)
        if(String(res.statusCode).startsWith('2')) {
          resolve(res.data)
        }else {
          reject(res.data)
        }
      },
      fail(err){
  
      }
    })
  })
}

function _edcode(){
  const token =  wx.getStorageSync('token');
  const base64 = Base64.encode(token+':')
  return `Basic ${base64}`
}

module.exports = request
