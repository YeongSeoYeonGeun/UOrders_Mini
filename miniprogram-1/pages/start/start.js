const app = getApp()

Page({
  onLoad: function () {
    console.log('page load')
    
  },
  logIn : function(){

    const that = this

    if(app.globalData.userInfo != null){
      wx.reLaunch({
        url: '../main/main',
      })
    } else {
      wx.showModal({
        title: 'Apply',
        content: 'Can we user your name and Id?',
        success (res) {
          if (res.confirm) {
            console.log('"OK" is tapped')
            
            that.temp();

            // wx.reLaunch({
            //   url: '../main/main',
            // })
          } else if (res.cancel) {
            console.log('"Cancel" is tapped')
            // Todo: 앱 종료
          }
        }
      })
      
    }
  },
  temp : function(){
    wx.login({
      success (res) {
        if (res.code) {
          console.log(res.code);
          // wx.request({
          //   url: 'https://test.com/onLogin',
          //   data: {
          //     code: res.code
          //   }
          // })
        } else {
          console.log('Login failed' + res.errMsg)
        }
      },
      fail: function(err){
        console.log('error : ' + err.errMsg)
        wx.hideLoading();
      }
    })
  }
})