// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    sum: "",
    type: "",
    property: "",
    date: "",
    time: "",
    place: "",
    description: "",
    recordId: "",
  },
  //编辑
  jumpToeditDetail: function () {
    wx.navigateTo({
      url: '../../pages/editDetail/editDetail'
    })
  },
  // 删除
  alertMessage: function () {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除该条账单？',
      confirmColor: "#1593ff",
      cancelColor: "#999999",
      success: function (res) {
        if (res.confirm) { //这里是点击了确定以后
          wx.request({
            url: `${utils.url}/delRecord/`,
            data: {
              userId: "001",
              recordId: that.data.recordId
            },
            header: {
              ...utils.getHeader
            },
            success(res) {
              console.log(res)
              if (res.data.code > 0) {
                wx.navigateBack({
                  delta: 2 //默认值是1
                })
              }
            }
          });
          console.log('用户点击确定')
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
  updateData: function (res) {
    this.setData({
      title: res.title,
      count: res.count,
      type: res.type,
      account: res.account,
      date: res.year + "." + res.month + "." + res.date,
      time: res.time,
      position: res.position,
      details: res.details,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    this.setData({
      recordId: params.recordId
    });
    let that = this;
    wx.request({
      url: `${utils.url}/details/`,
      data: {
        recordId: that.data.recordId ? that.data.recordId : 1
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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