
const api = require('../../utils/api.js')
const app = getApp()

Page({
  onLoad: function () {
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
         console.log('get userIndex error : ' + err.errMsg)
       }
     })
    
  },
  loginSuccess : function(){
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
            
            that.login();

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
  login : function(){
    var that = this;
    wx.login({
      success (res) {
        if (res.code) {
          console.log(res.code);

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
                that.loginSuccess();
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
    wx.getSetting({
      success(res){
        console.log(res.authSetting);

        if(!res.authSetting){
          wx.getUserInfo({
            lang: 'en',
            success(res) { 
              console.log(res.userInfo);
              app.globalData.userInfo = res.userInfo
            }
          })
        } else {
          that.login();
        }
        
      }
    })
  }
})