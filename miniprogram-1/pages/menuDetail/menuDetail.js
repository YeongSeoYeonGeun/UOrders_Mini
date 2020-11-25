const api = require('../../utils/api.js')
const app = getApp()

Page({
  data: {
    menuIndex : 0,
    menuName: '아메리카노',
    menuPrice : 1500,
    count : 1,
    totalPrice : 1500,
    temperature : '',
    takeType :'',
    sizeIndex: 0,
    sizeType: ['Small', 'Regular', 'Large'],
    /* view에 보여주기 용 */
    selectTemperature : true,
    selectSize : true
  },
  onLoad: function(options) {
    console.log('menuDetail load')
    console.log(options)

    this.setData({
      menuIndex : options.menuIndex
    })
    this.getMenuDetail(options.cafeIndex, options.menuIndex)
  },
  getMenuDetail(cafeIndex, menuIndex){
    var that = this
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
          let data = res.data.data.menuInfo

          that.setData({
            menuPrice : data.menuIndex,
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
  clickHot : function() {
    console.log('hot 클릭')
    this.setData({
      temperature: 'HOT'
    })
  },
  clickIced : function() {
    console.log('iced 클릭')
    this.setData({
      temperature: 'ICED'
    })
  },
  clickHere : function() {
    console.log('hot 클릭')
    this.setData({
      takeType: 'HERE'
    })
  },
  clickTogo : function() {
    console.log('togo 클릭')
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
    console.log("add")
    var tempCount = this.data.count + 1
    var tempTotalPrice = tempCount * this.data.menuPrice
      this.setData({
        count: tempCount,
        totalPrice : tempTotalPrice
      })
  },
  reduce : function(){
    console.log("reduce")
    var tempCount = this.data.count
    if(tempCount > 1 ){
      tempCount = tempCount - 1
      var tempTotalPrice = tempCount * this.data.menuPrice
      this.setData({
        count: tempCount,
        totalPrice : tempTotalPrice
      })
    }
  }
})
  