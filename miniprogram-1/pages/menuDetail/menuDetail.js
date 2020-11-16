const app = getApp()


Page({
  data: {
    menuName: '아메리카노',
    menuPrice : '1,500원',
    count : 1,
    temperature : '',
    takeType :'',
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
  }
})
  