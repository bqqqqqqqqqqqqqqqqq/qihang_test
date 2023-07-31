// pages/signAndBind/index.ts
import userApi from '../../api/system/userAPI';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
var app = getApp()
Page({
  data: {
    name: '',
    grade: '',
    show: false,
    columns:[1,2,4]
  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  onConfirm(event:any) {
    const { picker, value, index } = event.detail;
    this.setData({
      grade: value
    })
    this.onClose()
  },
  submit():any{
    let name = this.data.name;
    let grade = this.data.grade;
    const parentsID = app.globalData.UserInfo.id
    if(name===''){
      Dialog.alert({
        message: '请输入姓名',
      })
      return false;
    };
    if(grade === ''){
      Dialog.alert({
        message: '选择年级',
      })
      return false;
    };

    userApi.AddNewChild({needToken:true,
      header:{
     Authorization: app.globalData.token
   }},name,grade,parentsID).then((res:any)=>{
     if (res.code == 200){
    wx.showToast({
      title:"注册绑定成功,请重新登录",
    })
    
   }else if(res.msg=="已绑定过该用户"){
    wx.showToast({
      title:"已绑定过该用户",
      icon:"none"
    })
   }else{
     wx.showToast({
       title:"绑定失败,请重试",
       icon:"none"
     })
   } 
  }

   )
    wx.navigateBack()
    
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