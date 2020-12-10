
const api = require('../../utils/api.js')
const app = getApp()

Page({
  data : {
    languageIndex: 0,
    languageType: ['한국어', '中文', 'English'],
    startText : ''
  },
  onLoad: function () {
    // 언어 설정
    var lang = wx.getStorageSync('lang')
    if(lang == 'ko'){
      this.setData({
        languageIndex : 0,
        startText : '시작하기'
      })
    } else if(lang == 'zh'){
      this.setData({
        languageIndex : 1,
        startText : '入门'
      })
    } else if(lang == 'en'){
      this.setData({
        languageIndex : 2,
        startText : 'Start'
      })
    }

    // userName 가져오기
    var that = this
    wx.getStorage({
      key: 'userNickName',
      success (res) {
        app.globalData.userName = res.data
      }
    })


     // userIndex 받아오기
     wx.getStorage({
       key: 'userIndex',
       success (res) {
        //  that.setData({
        //   userIndex : res.data
        //  })
         app.globalData.userIndex = res.data
       },
       fail: function(err){
         this.login()
         console.log('get userIndex error : ' + err.errMsg)
       }
     })
    
  },
  loginSuccess : function(){
    const that = this

    // wx.showModal({
    //   title: 'Apply',
    //   content: 'Can we user your name and Id?',
    //   success (res) {
    //     if (res.confirm) {
    //       console.log('"OK" is tapped')

    //       that.login()
    //     } else if (res.cancel) {
    //       console.log('"Cancel" is tapped')
    //       // Todo: 앱 종료
    //     }
    //   }
    // })

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

  },
  login : function(){
    var that = this;
    wx.login({
      success (res) {
        if (res.code) {
          console.log('code ' + res.code);

          var url = api.url + 'users/login';
          wx.request({
            method : 'POST',
            url: url,
            header: { 
              'content-type' : 'application/json'
            },
            data : {
              'userIndex' : app.globalData.userIndex,
              'userName' : app.globalData.userName,
              'js_code' : res.code
            },
            success: function(res){
              if(res.statusCode == 200){
                console.log(res.data)
                app.globalData.userIndex = res.data.data.userIndex
                 wx.setStorageSync('userIndex', res.data.data.userIndex)
                wx.reLaunch({
                  url: '../main/main',
                })
              } else {
                console.log(res)
              }
            },
            fail: function(err){
              console.log('getOrderHistory error : ' + err.errMsg)
            }
          })

          
        } else {
          console.log('Login failed' + res.errMsg)
        }
      },
      fail: function(err){
        console.log('error : ' + err.errMsg)
        wx.hideLoading();
      }
    })
  },
  getUserSetting : function() {
    var that = this;
    
    this.loginSuccess()

    // wx.getSetting({
    //   success(res){
    //     console.log(res.authSetting);

    //     if(!res.authSetting){
    //       wx.getUserInfo({
    //         lang: 'en',
    //         success(res) { 
    //           console.log(res.userInfo);
    //           app.globalData.userInfo = res.userInfo
    //         }
    //       })
    //     } else {
    //       that.login();
    //     }
        
    //   }
    // })
  },
  setLanguage : function(e){
    this.setData({
      languageIndex: e.detail.value
    })

    var lang = ''

    if(this.data.languageIndex == 0){
      lang = 'ko'
      wx.setStorageSync('lang', 'ko')
      this.setData({
        startText : '시작하기'
      })
    } else if(this.data.languageIndex == 1){
      lang = 'zh'
      wx.setStorageSync('lang', 'zh')
      this.setData({
        startText : '入门'
      })
    } else if(this.data.languageIndex == 2){
      lang = 'en'
      wx.setStorageSync('lang', 'en')
      this.setData({
        startText : 'Start'
      })
    }

    var url = api.url + 'users/language';
    wx.request({
      method : 'PUT',
      url: url,
      header: { 
        'content-type' : 'application/json',
        'userIndex' : app.globalData.userIndex
      },
      data : {
        'languageCode' : lang
      }
    })
  }
})