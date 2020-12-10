const api = require('../../utils/api.js')
const app = getApp()

Page({
  data: {
    menuDetailText : '',
    cafeIndex : 0,
    menuIndex : 0,
    menuName: '',
    menuPrice : 0,
    menuPriceText : '',
    sizeSelectText : '',
    addCartText : '',
    wonText : '',
    menuImage : '',
    count : 1,
    totalPrice : 0,
    temperature : '',
    takeType :'',
    sizeIndex: 0,
    sizeType: ['SMALL', 'REGULAR', 'LARGE'],
    /* view에 보여주기 용 */
    selectTemperature : true,
    selectSize : true
  },
  onLoad: function(options) {
    console.log('menuDetail load')
    console.log(options)

    this.setData({
      menuIndex : options.menuIndex,
      cafeIndex : options.cafeIndex
    })
    this.getMenuDetail(options.cafeIndex, options.menuIndex)
  },
  /* 통신 */
  getMenuDetail(cafeIndex, menuIndex){
    var that = this

    console.log(cafeIndex + ", " + menuIndex)

    var url = api.url + 'menu?cafeIndex=' + cafeIndex + '&menuIndex=' + menuIndex;
    wx.request({
      method : 'GET',
      url: url,
      header: { 
        'content-type' : 'application/json',
        'userIndex' : app.globalData.userIndex
      },
      success: function(res){
        if(res.statusCode == 200){
          console.log(res.data)
          let data = res.data.data

          that.setData({
            menuDetailText : data.menuDetailText,
            addCartText : data.addCartText,
            wonText : data.wonText,
            sizeSelectText : data.sizeSelectText,
            menuPriceText : data.menuPriceText,
            menuImage : data.menuImage,
            menuName : data.menuName,
            menuPrice : data.menuPrice,
            totalPrice : data.menuPrice,
            selectTemperature :  data.selectTemperature,
            selectSize : data.selectSize
          })
        } else {
          console.log(res)
        }
      },
      fail: function(err){
        console.log('getMenuDetail error : ' + err.errMsg)
      }
    })
  },
  addCart : function(){

    console.log('cafeIndex ' + this.data.cafeIndex);

    var size = ''
    if(this.data.selectSize){
      size = this.data.sizeType[this.data.sizeIndex];
    } else {
      size = 'NONE'
    }

    var temp = ''
    if(this.data.selectTemperature){
      temp = this.data.temperature
    } else {
      temp = 'NONE'
    }

    const that = this
    var url = api.url + 'users/cartMenu';
    wx.request({
      method : 'POST',
      url: url,
      header: { 
        'content-type' : 'application/json',
        'userIndex' : app.globalData.userIndex,
      },
      data : {
        'cafeIndex' : this.data.cafeIndex,
        'menuIndex' : this.data.menuIndex,
        'menuName': this.data.menuName,
        'menuCount': this.data.count ,
        'menuTemperature': temp ,
        'menuSize': size,
        'menuTakeType': this.data.takeType,
        'menuTotalPrice' : this.data.totalPrice
      },
      success: function(res){
        console.log(res)
        if(res.statusCode == 200){
          that.clickBack()
        } else {
          wx.toast({
            title: '추가 실패',
          })
        }
      },
      fail: function(err){
        console.log('addCart error : ' + err.errMsg)
      }
    })
  },
  /* button */
  clickHot : function() {
    this.setData({
      temperature: 'HOT'
    })
  },
  clickIced : function() {
    this.setData({
      temperature: 'ICED'
    })
  },
  clickHere : function() {
    this.setData({
      takeType: 'HERE'
    })
  },
  clickTogo : function() {
    this.setData({
      takeType: 'TOGO'
    })
  },
  clickBack : function(){
    wx.navigateBack({
      delta: 0,
    })
  },
  selectSize: function (e) {
    this.setData({
      sizeIndex: e.detail.value
    })
  }, 
  add : function(){
    var tempCount = this.data.count + 1
    var tempTotalPrice = tempCount * this.data.menuPrice
      this.setData({
        count: tempCount,
        totalPrice : tempTotalPrice
      })
  },
  reduce : function(){
    var tempCount = this.data.count
    if(tempCount > 1 ){
      tempCount = tempCount - 1
      var tempTotalPrice = tempCount * this.data.menuPrice
      this.setData({
        count: tempCount,
        totalPrice : tempTotalPrice
      })
    }
  },
  clickAddCart : function(){

    let temperatureBool = this.data.selectTemperature
    let takeTypeBool = false

    if(temperatureBool && this.data.temperature == '') temperatureBool = false
    if(this.data.takeType != '') takeTypeBool = true

    if(temperatureBool && takeTypeBool
      || !this.data.selectTemperature || !this.data.selectSize){
      this.addCart()
    } else {
      wx.showModal({
        title: '장바구니 담기 실패',
        content: '입력되지 않은 정보가 있습니다.'
      })
    }
    
  }
})
  