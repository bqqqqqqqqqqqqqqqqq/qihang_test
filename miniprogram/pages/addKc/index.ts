import userApi from "../../api/system/userAPI";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";

var app = getApp()
// pages/addKc/index.ts
Page({
  data: {
    name: '',
    teacher:<any>"",
    price:<any>"",
    maxPersion:<any>"",
    content:"",
    show: false,
    columns:<any>[]
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
      teacher: value
    })
    this.onClose()
  },
  submit():any{
    let name = this.data.name;
    let teacher = this.data.teacher;
    let price = this.data.price;

    if(name===''){
      Dialog.alert({
        message: '请输入课程名称',
      })
      return false;
    };
    if(teacher === ''){
      Dialog.alert({
        message: '请选择老师',
      })
      return false
    };
    if(price === ''){
      Dialog.alert({
        message: '请输入价格',
      })
    return false;
  }
  userApi.AddClass({needToken:true,
    header:{
   Authorization: app.globalData.token
 }},{"name":this.data.name,"teacher_id":this.data.teacher.id,"maxPersion":this.data.maxPersion,"content":this.data.content,"price":price}).then((res)=>{
    if (res.code!=200){
      wx.showToast({
        "icon":"error",
        "title":"发生错误请重试"
      })
    }else{
      wx.showToast({
        "title":"创建成功"
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500);
    }
 })

  wx.showToast({
    title:"添加成功",
    icon:"success"
  })
},

onLoad(){
  userApi.GetAllTeacher({
    needToken:true,
    header:{
  Authorization: app.globalData.token
}
}).then((res:any)=>{
  if(res.code===200){
    let nameList = this.data.columns;
    if(res.data!=null){
      nameList.push(...res.data)
      this.setData({
        columns: nameList,
      })
  }else{
    wx.showToast({
      title:"出现错误，请重试"
    })
  }
}
})
}
})