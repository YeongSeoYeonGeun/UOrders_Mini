const app = getApp()

Page({
  login : function() {
    console.log('login')
    wx.login({
      success (res) {
        console.log('hi')
        if (res.code) {
          // Send a network request
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('Login failed' + res.errMsg)
        }
      }
    })
  }
})