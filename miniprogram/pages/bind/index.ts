import userApi from "../../api/system/userAPI";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
var app = getApp()
// pages/bind/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
  },
  goSignAndBind(){
    wx.navigateTo({
      url:'../signAndBind/index'
    })
    
  },
  //保存按钮
  submit(){
    let phone = this.data.phone;
    const parentsID = app.globalData.UserInfo.id
    
    if(phone==''){
      Dialog.alert({
        title: '提示',
        message: '手机号不能为空',
      }).then(() => {
        // on close
      });
    }else{
      userApi.BindMyKID({needToken:true,
        header:{
       Authorization: app.globalData.token
     }},phone,parentsID).then((res:any)=>{
       if (res.code == 200){
      wx.showToast({
        title:"绑定成功,请重新登录",
      })
      wx.removeStorageSync('token')
      wx.removeStorageSync('UserInfo')
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
    }
  
  }
})