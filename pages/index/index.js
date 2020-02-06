//index.js
//获取应用实例
let utils = require("../../utils/common")
Page({
  data: {
    currentOutter: "999.00",
    todayOutter: "999.00",
    contain: "-999.00",
    accountList: []
  },
  //事件处理函数
  jumpTorecord: function () {
    wx.navigateTo({
      url: '../../pages/record/record'
    })
  },
  jumpTodetails: function (event) {
    wx.navigateTo({
      url: `../../pages/details/details?recordId=${event.target.id}`
    })
  },
  updateData: function (res) {
    this.setData({
      currentOutter: res.currentOutter,
      todayOutter: res.todayOutter,
      contain: res.contain,
      accountList: res.accountList
    });
  },

  onLoad: function () {},
  onShow: function () {
    let that = this;
    wx.request({
      url: `${utils.url}/index/`,
      data: {
        userId: "001"
      },
      header: {
        ...utils.getHeader
      },
      complete(res) {
        console.log(res.data)
        if (res.data.resultCode > 0) {
          that.updateData(res.data.data);
        }
      }
    });
  },
})