const app = getApp()

Page({
  onLoad: function () {
    console.log('page load')
    
  },
  logIn : function(){
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
            // Todo : 로그인 통신
            wx.reLaunch({
              url: '../main/main',
            })
          } else if (res.cancel) {
            console.log('"Cancel" is tapped')
            // Todo: 앱 종료
          }
        }
      })
      
    }
  }
})