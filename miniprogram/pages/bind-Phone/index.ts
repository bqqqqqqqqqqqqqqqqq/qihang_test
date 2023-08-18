// pages/bind-Phone/index.ts
import userApi from '../../api/system/userAPI';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
var app = getApp()
Page({
  data: {
    phone: '',
  },
  submit():any{
    let phone = this.data.phone;
    if(phone==''){
      Dialog.alert({
        title: '提示',
        message: '手机号不能为空',
      }).then(() => {
        // on close
      });
    }
  

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    Dialog.confirm({
      message: '孩子是否已经在本小程序注册',
      confirmButtonText: '是',
      cancelButtonText: '否'
    })
      .then(() => {
        // on confirm
      })
      .catch(() => {
        // on cancel
        wx.navigateTo({
          url:'../bind/index'
        })
      });
  },

})