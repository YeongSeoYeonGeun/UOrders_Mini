const api = require('../../utils/api.js')
const app = getApp()

Page({
  data: {
    cafeIndex : 0,
    cafeName: '남산학사 cafe',
    cafeLocation : '신공학관 1층', 
    favorite : 0,
    menuList: [
      {
        menuIndex: 0,
        menuName: '아메리카노',
        menuPrice: '1,000원',
        menuImage: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      }
    ]
  },
  onLoad: function (options) {
    console.log('cafemenu load')
    this.setData({
      cafeIndex : options.cafeIndex
    })
    this.getCafeMenu(options.cafeIndex)
  },
  /* 통신 */
  getCafeMenu : function(cafeIndex){
    wx.showLoading({
      title: '불러오는 중..',
    })
    var that = this

    var url = api.url + 'cafe/' + cafeIndex;
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
            cafeName : data.cafeName,
            cafeLocation : data.cafeLocation,
            favorite : data.isFavorite,
            menuList : data.menuInfo
          })
        } else {
          that.setData({
            
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
  manageLike : function(){
    var that = this
    var url = api.url + 'users/favorite';

    if(this.data.favorite == 0){
      wx.request({
        method : 'POST',
        url: url,
        header: { 
          'content-type' : 'application/json',
          'userIndex' : app.globalData.userIndex
        },
        data : {
          'cafeIndex' : this.data.cafeIndex
        },
        success: function(res){
          if(res.statusCode == 200){
            that.setData({
              favorite: 1
            })
          } else {
            wx.showToast({
              title: '매장 즐겨찾기에 실패했습니다.'
            })
          }
        },
        fail: function(err){
          console.log('like cafe error : ' + err.errMsg)
        }
      })
    } else {
      wx.request({
        method : 'DELETE',
        url: url,
        header: { 
          'content-type' : 'application/json',
          'userIndex' : app.globalData.userIndex,
          'cafeIndex' : this.data.cafeIndex
        },
        success: function(res){
          if(res.statusCode == 200){
            that.setData({
              favorite: 0
            })
          } else {
            wx.showToast({
              title: '매장 즐겨찾기 취소에 실패했습니다.'
            })
          }
        },
        fail: function(err){
          console.log('unlike cafe error : ' + err.errMsg)
        }
      })
    }
  },
  bindCart :function() {
    console.log('cafeMenu-bindCart function');
    wx.navigateTo({
      url: '../cart/cart'
    })
  },
  clickMenu : function(){
    wx.navigateTo({
      url: '../menuDetail/menuDetail',
    })
  },
  back : function(){
    wx.navigateBack({
      delta: 0,
    })
  },
})
