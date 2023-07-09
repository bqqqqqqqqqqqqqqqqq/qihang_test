import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";

interface user{
  id: string,
  name: string
}
var userList: user[] = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList
  },
  click(e:any){
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    Dialog.confirm({
      message: '是否添加'+name+'为老师？',
    })
      .then(() => {
        // on confirm
        let oldList = this.data.userList;
        let newList = oldList.filter(item => item.id !== id);
        this.setData({
          userList:newList
        })
        
      })
      .catch(() => {
        // on cancel
      });
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