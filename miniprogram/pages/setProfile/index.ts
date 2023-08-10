import userApi from "../../api/system/userAPI";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";

var app =getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    columns: ['初一','初二','初三','高一','高二','高三'],
    show: false,
    gender:''
  },

  //保存按钮
  submit(){
    const name = this.data.name
    const gender = this.data.gender
    const id = app.globalData.UserInfo.id
    if(name==''){
      Dialog.alert({
        title: '提示',
        message: '姓名不能为空',
      }).then(() => {
        // on close
      });
    }else if (gender==""){
      Dialog.alert({
        title: '提示',
        message: '姓名不能为空',
      })
    }else{
      userApi.SetProfile({
        needToken:true,
        header:{
      Authorization: app.globalData.token
    }
  },id,name,gender).then((res:any)=>{
    if (res.code==200){
      wx.showToast({
        title:"保存成功请重新登录",
        icon:'none'
      })
      wx.removeStorageSync('UserInfo')
      wx.removeStorageSync('token')
      setTimeout(() => {
        wx.redirectTo({
          url:'../user/index'
        })
      }, 2000);
    }else{
      wx.showToast({
        title:"系统错误",
        icon:"error"
      })
    }
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