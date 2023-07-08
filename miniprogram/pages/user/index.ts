import { httpRequest } from '../../utils/request'
const baseUrl = require('../../api/base').allBaseUrl.GDEnvs.host

import  userApi  from '../../api/system/userAPI'


interface UserInfo{
  id:number,
  name:string,
  isAdmin:string
}

var app = getApp()
Page({
  data:{
    
    // src:'../../static/images/default.jpg',
    // uid:app.globalData.UserInfo.uid,
    // name:app.globalData.UserInfo.name,
    // type: app.globalData.UserInfo.isAdmin,  //1为默认用户，2为家长，3为老师，4为管理员
    UserInfo:app.globalData.UserInfo,
    token:app.globalData.token,
    id:app.globalData.UserInfo.id
  },

  onShow:function(){
    this.setData({
      UserInfo:app.globalData.UserInfo,
      token:app.globalData.token
    })
  },



  onLoad:()=>{
  },
 
  // getUserinfo(){
  //   userApi.getUserInfo({phone:"1234",password:"12345"},{needToken:true}).then((res)=>{
  //     if(res.code===200){
        
  //     }
  //   })
  // },
  getPhoneNumber (e: { detail: any }) {
    this.WXLogin(e.detail.code)
  },

  WXLogin(code:string,){
    userApi.UserwxPhoneLogin({code},{needToken:true}).then((res)=>{
      if(res.code===200){
        wx.showToast({
          title:"登录成功",
          icon:"none"
        })
        app.globalData.token = res.data.token
        app.globalData.UserInfo.code = "1"
        app.globalData.UserInfo = res.data.userInfo
        wx.setStorageSync('UserInfo',res.data.userInfo)
        wx.setStorageSync('token',res.data.token)
        this.onShow()
      }else if (res.code===-1){
        //路由去注册页面
        wx.showToast({
          title:"未注册请先注册",
          icon:"none"
        })
        setTimeout(() => {
          wx.navigateTo({
            url:'../signup/index'
          })
        }, 1000);
      }
    })
  },
  
  goLogin(){
    wx.navigateTo({
      url:"../login/login"
    })
  },
  
  loginOut(){
    wx.removeStorageSync('token')
    wx.removeStorageSync('UserInfo')
    this.setData({
      token: '',
      UserInfo:{
        name:"请先登录",
        isAdmin:"0"
      },
    })
},

navigateToKC(){
  wx.navigateTo({
      url:'../kc/index/?id'+this.data.UserInfo.isAdmin
  })
},








  
//   getPhoneNumber (e:any) {
//     let detail = e.detail;
//     console.log(detail);
//     if (detail.errMsg === "getPhoneNumber:ok") {
//         console.log('用户同意授权');
//         let code = detail.code; // 动态令牌
//         console.log(code);
//         wx.request({
//             url: '你的接口，比如登录',
//             data: {
//                 code
//             },
//             success(res) {
//                 console.log(res.data); // 后端返回解析出的手机号，或者直接返回登录成功的信息
//             }
//         })
//     } else {
//         console.log('用户拒绝授权');
//     }
// }


})
