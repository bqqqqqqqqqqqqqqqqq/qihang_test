// pages/allstu/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    total:999,
    indexList: ["初一", "初二", 3, 4, 5, 6, 7, 8, 9, 10],
    sList: [
      {
        id: 1,
        grade: "初一",
        snames: [
          {
            sid:1,
            name:"李四"
          },
          {
            sid:2,
            name:"张丽"
          }
        ]
      },
      {
        id: 2,
        grade: "初二",
        snames: [
          {
            sid:6,
            name:"饿货"
          },
          {
            sid:7,
            name:"二货"
          },
          {
            sid:5,
            name:"二ha"
          },
          {
            sid:5,
            name:"二b"
          }
        ]
      }
    ],
    
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