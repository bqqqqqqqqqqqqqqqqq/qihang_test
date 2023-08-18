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
    name: '',
    columns: ['初一','初二','初三','高一','高二','高三'],
    show: false,
    grade:''
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
    const name = this.data.name
    const grade = this.data.grade
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
     }},phone,name,grade,parentsID).then((res:any)=>{
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
     wx.switchTab({
      url: 'pages/user/index'
    })
    }
  
  },
  showPopup(){      //点击选择性别，打开弹出层（选择器）
    this.setData({show:true})
  },
onClose() {     //点击空白处开闭弹出层（选择器）及选择器左上角的取消
  this.setData({ show: false });
},
onConfirm(e:any){    //选择器右上角的确定，点击确定获取值
 this.setData({
   gender:e.detail.value,
   show:false
 })
},
})