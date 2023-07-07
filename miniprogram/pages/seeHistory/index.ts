import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";

// pages/seeHistory/index.ts
Page({

  /**
   * 页面的初始数据
   * 1.disabled是滑动禁用，分两种情况：已完成和未到时间
   */
  data: {
    cList: [
      {
        no: '1',
        date: '2020.1.1',
        done:true,
        disabled:true 
      },
      {
        no: '2',
        date: '2020.1.2',
        done:false,
        disabled:false
      },
      
    ],
  },
  //导航栏
  onClickLeft() {
    wx.showToast({ title: '点击返回', icon: 'none' });
  },
  onClickRight() {
    // this.selectComponent(".vsc").open({position: "right"});
  },
  //补签
  buq(e:any){
    let myIndex = e.currentTarget.dataset.bu;
    const arr = this.data.cList;
    const item = arr.find(item => item.no === myIndex);
    if (item) {
    item.done = true;
    item.disabled = true;
    this.setData({
      cList : arr
    });//删除并更新
    Toast('补签成功！')
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})