const app = getApp()


Page({
  data: {
    menuName: '아메리카노',
    menuPrice : 1500,
    count : 1,
    totalPrice : 1500,
    temperature : '',
    takeType :'',
    sizeIndex: 0,
    sizeType: ['Small', 'Large']
  },
  onLoad: function () {
    console.log('main load')
    this.setData({
      listSelected : true
    })
    // 통신 필요 (사용자 이름)
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
  