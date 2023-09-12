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
    const parentsID = app.globalData.UserInfo.id
    if(phone==''){
      Dialog.alert({
        title: '提示',
        message: '手机号不能为空',
      }).then(() => {
        // on close
      });
    }
    userApi.BindMyKID({needToken:true,
      header:{
     Authorization: app.globalData.token
   }},phone,parentsID).then((res:any)=>{
     if (res.msg=="该手机号未注册用户"){
       wx.showToast({
         title:"号码错误请重新输入",
         icon:"none"
       })
       return
     }
     if (res.code == 200){
    wx.showToast({
      title:"绑定成功,请重新登录",
    })
    wx.removeStorageSync('token')
    wx.removeStorageSync('UserInfo')
    setTimeout(()=>{
      wx.switchTab({
        url:"../user/index"
    })
    },2000)
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
  })
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