Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    fontLeftColor: "#1593ff",
    borderLeftColor: "#1593ff",
    weightLeft: "2px",
    weightRight: "1px",
    fontRightColor: "black",
    borderRightColor: "#ececec",
    dateStart: '2016-09-01',
    dateEnd: '2016-10-01',
    isShowMenu: [true, true],
  },
  isShowDetail: function(e) {
    let temp = e.currentTarget.id.split('u');
    let index = parseInt(temp[1]);
    let changeArr = this.data.isShowMenu;
    changeArr[index] = !changeArr[index];
    this.setData({
      isShowMenu: changeArr
    });
  },
  countLeft: function() {
    this.setData({ 
      isShow: false,
      fontLeftColor: "#1593ff",
      borderLeftColor: "#1593ff",
      weightLeft: "2px",
      weightRight: "1px",
      fontRightColor: "black",
      borderRightColor: "#ececec",
    });
  },
  countRight: function() {
    this.setData({
      isShow: true,
      fontLeftColor: "black",
      borderLeftColor: "#ececec",
      weightLeft: "1px",
      weightRight: "2px",
      fontRightColor: "#1593ff",
      borderRightColor: "#1593ff",
    });
  },
  startDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    if (this.dateToSecond(e.detail.value, this.data.dateEnd)) {
      this.setData({
        dateStart: e.detail.value
      })
    }else{
      this.setData({
        dateStart: this.data.dateEnd,
        dateEnd: e.detail.value
      })
    }
  },
  endDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    if (this.dateToSecond(this.data.dateStart, e.detail.value)) {
      this.setData({
        dateEnd: e.detail.value
      })
    } else {
      this.setData({
        dateEnd: this.data.dateStart,
        dateStart: e.detail.value
      })
    }
  },
  dateToSecond: function(dateS, dateE) {
    console.log(dateS, dateE);
    let temp1 = dateS.split('-');
    let temp2 = dateE.split('-');
    if (temp2[0] > temp1[0]) {
      return true;
      if (temp2[0] === temp1[0] && temp2[1] > temp1[1]) {
        return true;
        if (temp2[2] >= temp1[2] && temp2[1] === temp1[1]) {
          return true;
        } else{return false;}
      } else{return false;}
    } else{return false;}
  
  },
})