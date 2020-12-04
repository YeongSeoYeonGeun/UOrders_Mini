const api = require('../../utils/api.js')
const app = getApp()

Page({
  data: {
    userInfo: {},
    userName : '',
    greetingText : '',
    mainText : '',
    nearestCafeText : '',
    favoriteCafeText : '',
    nearCafeSelected : true,
    listSelected : true,
    cafeList : []
  },
  onLaunch: function () {

    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  onLoad: function () {
    this.setData({
      listSelected : true
    })

    var that = this
    // userName 가져오기
    wx.getStorage({
      key: 'userNickName',
      success (res) {
        that.setData({
          userName : res.data
        })
      }
    })

    this.getCafeList();
  },
  getCafeList : function(){
    wx.showLoading({
      title: 'loading..',
    })
    var that = this

    var url = api.url + 'home';
    wx.request({
      method : 'GET',
      url: url,
      header: { 
        'content-type' : 'application/json',
        'userIndex' : app.globalData.userIndex
      },
      success: function(res){
        console.log(res.data);
        if(res.statusCode == 200){

          let data = res.data.data
          that.setData({
            greetingText : data.greetingText,
            mainText : data.mainText,
            nearestCafeText : data.nearestCafeText,
            favoriteCafeText : data.favoriteCafeText,
            cafeList : data.cafeInfo
          })
        } else {
          that.setData({
            cafeList : []
          })
        }

        wx.hideLoading();
      },
      fail: function(err){
        console.log('getCafeList error : ' + err.errMsg)
        wx.hideLoading();
      }
      
    })
  },
  getFavoriteCafeList : function(){
    wx.showLoading({
      title: 'loading..',
    })
    var that = this

    var url = api.url + 'users/favorite';
    wx.request({
      method : 'GET',
      url: url,
      header: { 
        'content-type' : 'application/json',
        'userIndex' : app.globalData.userIndex
      },
      success: function(res){
        if(res.statusCode == 200){
          console.log(res.data.data.cafeInfo)
          that.setData({
            cafeList : res.data.data
          })
        } else {
          that.setData({
            cafeList : []
          })
        }

        wx.hideLoading();
      },
      fail: function(err){
        console.log('getCafeList error : ' + err.errMsg)
        wx.hideLoading();
      }
      
    })
  },
  setUserInfo(userInfo = ""){
    var data = {
      hasLogin : false,
      userInfo : {
        nickName : '로그인이 필요합니다.'
      }
    };

    if(userInfo){
      data.hasLogin = true;
      data.userInfo = userInfo;
      wx.setStorageSync('userInfo', userInfo)
    } else {
      data.hasLogin = false;
      data.userInfo = data.userInfo;
      wx.removeStorageSync('userInfo')
    }
    this.setData(data);
  },
  bindCafeTap: function(e) {
    let item = e.currentTarget.dataset.item;

    wx.navigateTo({
      url: '../cafemenu/cafemenu?cafeIndex=' + item.cafeIndex,
    })
  },
  logIn(e) {
    if (e.detail.userInfo == undefined) {
      console.log('유저정보 실패!',"ERROR");
      return;
    }
    this.setUserInfo(e.detail.userInfo);
    console.log("로그인 성공!")    
  },
  logOut(e) {
    let that = this;
    wx.showModal({
      title: 'LogOut',
      confirmColor: '#b4282d',
      content: '로그아웃 하시겠습니까？',
      cancelText: "취소",
      confirmText: "확인",
      success: function (res) {
        if (res.confirm) {
          that.setUserInfo("");
        }
      }
    })
  },
  getNear : function() {
    this.setData({
      nearCafeSelected: true
    })
    this.getCafeList();
  },
  getFavorite : function() {
    this.setData({
      nearCafeSelected: false
    })
    this.getFavoriteCafeList();
  },
  showMap : function() {
    console.log('showMap 클릭')
    this.setData({
      listSelected: false
    })
  },
  showList : function(){
    console.log('showList 클릭')
    this.setData({
      listSelected: true
    })
  },
  orderHistory : function(){
    wx.navigateTo({
      url: '../orderHistory/orderHistory',
    })
  }

})
  