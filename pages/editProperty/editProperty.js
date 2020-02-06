// pages/editProperty/editProperty.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isVisiable: false,
    isShowMenu: [true, true],
  },
  isShowDetail: function (e) {
    let temp = e.currentTarget.id.split('u');
    let index = parseInt(temp[1]);
    let changeArr = this.data.isShowMenu;
    changeArr[index] = !changeArr[index];
    this.setData({
      isShowMenu: changeArr
    });
  },
  jumpRecord: function () {
    wx.navigateTo({
      url: '../../pages/record/record'
    })
  },
  jumpTodetails: function () {
    wx.navigateTo({
      url: '../../pages/details/details'
    })
  },
})