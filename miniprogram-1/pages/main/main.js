const api = require('../../utils/api.js')
const app = getApp()

const normalCallout = {
  id: 1,
  latitude: 37.33295,
  longitude: 127.00005,
  iconPath: '/image/location.png',
  callout: {
    content: '文本内容',
    color: '#ff0000',
    fontSize: 12,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#000000',
    bgColor: '#fff',
    padding: 5,
    display: 'ALWAYS',
    textAlign: 'center'
  },
  // label: {
  //   content: 'label 文本',
  //   fontSize: 24,
  //   textAlign: 'center',
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   bgColor: '#fff',
  //   padding: 5
  // }
}


Page({
  data: {
    userInfo: {},
    userName : '',
    userIntroFront: '안녕하세요 ',
    userIntroBack: '님!',
    intro : '오늘은 어떤 음료를 주문하시겠어요?',
    nearStore : '가까운 매장',
    favoriteStore : '즐겨찾는 매장',
    nearCafeSelected : true,
    listSelected : true,
    cafeList : [],
    latitude: 37.558183,
    longitude: 127.000132,
    markers: [],
    customCalloutMarkerIds: [],
    num: 1
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
    console.log('main load')
    this.setData({
      listSelected : true
    })

    this.setUserInfo(wx.getStorageSync('userInfo'));
    // 통신 필요 (사용자 이름)
    this.getCafeList();
  },
  getCafeList : function(){
    wx.showLoading({
      title: '불러오는 중..',
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
            userName : data.userName,
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
      title: '불러오는 중..',
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
            cafeList : res.data.data.cafeInfo
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
    console.log('../cafemenu/cafemenu?cafeIndex=' + item.cafeIndex)

    wx.navigateTo({
      url: '../cafemenu/cafemenu?cafeIndex=' + item.cafeIndex,
    })
    console.log("hiroo")
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
  