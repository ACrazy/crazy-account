// pages/property/property.js
let utils = require("../../utils/common")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  updateData: function (res) {
    this.setData({
      netAssets: "87.00",
      totalAssets: "78.00",
      assetsList: {
        ...res,
        xjAccount: parseFloat(res.cash) + parseFloat(res.bankCard),
        xnAccount: parseFloat(res.wechat) + parseFloat(res.zhi),
        fzAccount: parseFloat(res.aunt) + parseFloat(res.jingDong) + parseFloat(res.creditCard),
        tzAccount: parseFloat(res.shares) + parseFloat(res.fund)
      }
    });
  },
  jumpToeditProperty: function () {
    wx.navigateTo({
      url: '../../pages/editProperty/editProperty'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    wx.request({
      url: `${utils.url}/property/`,
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})