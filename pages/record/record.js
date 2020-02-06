// pages/record/record.js
let utils = require("../../utils/common")
Page({
  data: {
    time: '12:01',
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 400,
    multiArray: [
      ['日常消费', '固定消费', '其他消费'],
      ['伙食餐饮', '行车交通'],
      ['早餐', '午餐', '晚餐', '下午茶', '宵夜', '做饭食材', '商场购物', '水果', '饮料', '烟酒', '聚会消费']
    ],
    multiIndex: [0, 0, 0],
    multiArray1: [
      ['常用', '现金账户', '虚拟账户', '负债账户', '投资账户'],
      ['支付宝', '微信']
    ],
    multiIndex1: [0, 0],
    multiArray2: [
      ['常用', '现金账户', '虚拟账户', '负债账户', '投资账户'],
      ['支付宝', '微信']
    ],
    multiIndex2: [0, 0],
    dateState: '2016-10-01',
    sum: "",
    position: "",
    description: ""
  },
  bindTimeChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  sumInput: function (e) {
    this.setData({
      sum: e.detail.value
    })
  },
  positionInput: function (e) {
    this.setData({
      position: e.detail.value
    })
  },
  descriptionInput: function (e) {
    this.setData({
      description: e.detail.value
    })
  },
  saveData: function () {
    let that = this;
    let thisDate = that.data.dateState.split("-");
    wx.showModal({
      title: '提示',
      content: '是否保存该条账单？',
      confirmColor: "#1593ff",
      cancelColor: "#999999",
      success: function (res) {
        if (res.confirm) { //这里是点击了确定以后
          wx.request({
            url: `${utils.url}/record/`, //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
              year: thisDate[0],
              month: thisDate[1],
              date: thisDate[2],
              time: that.data.time,
              account: that.data.multiArray1[1][that.data.multiIndex1[1]],
              count: that.data.sum,
              type: that.data.multiArray[0][that.data.multiIndex[0]] + "/" + that.data.multiArray[1][that.data.multiIndex[1]],
              position: that.data.position,
              details: that.data.description,
              status: "1",
              userId: "001",
              pattern: "1",
              title: that.data.multiArray[2][that.data.multiIndex[2]]
            },
            header: {
              ...utils.postHeader
            },
            complete(res) {
              console.log(res.data)
            }
          });

          wx.navigateBack({
            delta: 2 //默认值是1
          })
          console.log('用户点击确定')
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log(e);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['伙食餐饮', '行车交通'];
            data.multiArray[2] = ['早餐', '午餐', '晚餐', '下午茶', '宵夜', '做饭食材', '商场购物', '水果', '饮料', '烟酒', '聚会消费'];
            break;
          case 1:
            data.multiArray[1] = ['居家物业', '交流通讯'];
            data.multiArray[2] = ['水电', '房租', '物业', '公摊水电'];
            break;
          case 2:
            data.multiArray[1] = ['休闲娱乐', '美容护肤', '衣服饰品', '学习进修', '医疗保障'];
            data.multiArray[2] = ['运动健身', '电影', '电子产品', '游戏'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['早餐', '午餐', '晚餐', '下午茶', '宵夜', '做饭食材', '商场购物', '水果', '饮料', '烟酒', '聚会消费'];
                break;
              case 1:
                data.multiArray[2] = ['公交', '地铁', '动车', '高铁', '飞机', '打车', '租车'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['水电', '房租', '物业', '公摊水电'];
                break;
              case 1:
                data.multiArray[2] = ['手机月租', '宽带', '域名', '云服务器'];
                break;
            }
            break;
          case 2:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['运动健身', '电影', '电子产品', '游戏'];
                break;
              case 1:
                data.multiArray[2] = ['化妆品', '洗面奶', '护肤品', '其他'];
                break;
              case 2:
                data.multiArray[2] = ['衣服', '裤子', '鞋', '包包', '皮带', '内衣裤', '袜子', '领带', '帽子'];
                break;
              case 3:
                data.multiArray[2] = ['书籍费用', '培训学习'];
                break;
              case 4:
                data.multiArray[2] = ['药品', '就诊', '保险', '保健品'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        // console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  bindMultiPickerChange1: function (e) {
    this.setData({
      multiIndex1: e.detail.value
    })
  },
  bindMultiPickerColumnChange1: function (e) {
    console.log(e);
    var data = {
      multiArray1: this.data.multiArray1,
      multiIndex1: this.data.multiIndex1
    };
    data.multiIndex1[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex1[0]) {
          case 0:
            data.multiArray1[1] = ['支付宝', '微信'];
            break;
          case 1:
            data.multiArray1[1] = ['现金', '银行卡'];
            break;
          case 2:
            data.multiArray1[1] = ['支付宝', '微信', '饭卡'];
            break;
          case 3:
            data.multiArray1[1] = ['蚂蚁花呗', '信用卡', '借呗', '京东白条'];
            break;
          case 4:
            data.multiArray1[1] = ['基金账户', '股票账户', '余额宝'];
            break;
        }
        data.multiIndex1[1] = 0;
        break;
    }
    this.setData(data);
  },
  bindMultiPickerChange2: function (e) {
    this.setData({
      multiIndex2: e.detail.value
    })
  },
  bindMultiPickerColumnChange2: function (e) {
    console.log(e);
    var data = {
      multiArray2: this.data.multiArray2,
      multiIndex2: this.data.multiIndex2
    };
    data.multiIndex2[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex2[0]) {
          case 0:
            data.multiArray2[1] = ['支付宝', '微信'];
            break;
          case 1:
            data.multiArray2[1] = ['现金', '银行卡'];
            break;
          case 2:
            data.multiArray2[1] = ['支付宝', '微信', '饭卡'];
            break;
          case 3:
            data.multiArray2[1] = ['蚂蚁花呗', '信用卡', '借呗', '京东白条'];
            break;
          case 4:
            data.multiArray2[1] = ['基金账户', '股票账户', '余额宝'];
            break;
        }
        data.multiIndex2[1] = 0;
        break;
    }
    this.setData(data);
  },
  dateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dateState: e.detail.value
    })
  },
  //页面加载完成后运行
  onLoad: function () {
    var myDate = new Date(); //获取系统当前时间
    let year = myDate.getFullYear().toString().length != 1 ? myDate.getFullYear().toString() : "0" + myDate.getFullYear().toString();
    let month = myDate.getMonth().toString().length != 1 ? myDate.getMonth().toString() : "0" + myDate.getMonth().toString();
    let date = myDate.getDate().toString().length != 1 ? myDate.getDate().toString() : "0" + myDate.getDate().toString();
    let hour = myDate.getHours().toString().length != 1 ? myDate.getHours().toString() : "0" + myDate.getHours().toString();
    let minute = myDate.getMinutes().toString().length != 1 ? myDate.getMinutes().toString() : "0" + myDate.getMinutes().toString();

    this.setData({
      dateState: year + "-" + month + "-" + date,
      time: hour + ":" + minute
    })
  },
})