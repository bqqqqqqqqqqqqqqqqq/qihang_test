import { httpRequest } from '../../utils/request'
const baseUrl = require('../../api/base').allBaseUrl.GDEnvs.host
import  userApi  from '../../api/system/userAPI'


var app = getApp ()
Page({
  data:{
    src:'../../static/images/default.jpg',
    uid:app.globalData.UserInfo.uid,
    name:app.globalData.UserInfo.name
  },
 
  ping(data:any) {
      console.log(baseUrl+'/ping')
      httpRequest.post<null>(
        baseUrl + '/ping',
        data
      )
    },
  // getUserinfo(){
  //   userApi.getUserInfo({phone:"1234",password:"12345"},{needToken:true}).then((res)=>{
  //     if(res.code===200){
        
  //     }
  //   })
  // },
  getPhoneNumber (e: { detail: any }) {
    console.log(e.detail.code);
  },
  goLogin(){
    wx.navigateTo({
      url:"../login/login"
    })
  }












  
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
