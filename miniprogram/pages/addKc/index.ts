import userApi from "../../api/system/userAPI";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";

var app = getApp()
// pages/addKc/index.ts
Page({
  data: {
    name: '',
    teacher:<any>"",
    price:"",
    maxPersion:"",
    content:"",
    show: false,
    columns:<any>[],
    radio: '1',
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
  //单选
  onChange(event:any) {
    this.setData({
      radio: event.detail,
    });
  },

  onClick(event:any) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
    console.log(this.data.teacher);
    
  },
  submit():any{
    let name = this.data.name;
    let teacher = this.data.teacher;
    let price = this.data.price;
    const radio  = this.data.radio;
    const type = radio === "1" ? "basic" : "shared";
    let maxPersion = this.data.maxPersion;

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
    if(maxPersion===""){
      Dialog.alert({
        message: '请输入最多人数',
      })
      return false;
    }
    if(price === ''){
      Dialog.alert({
        message: '请输入价格',
      })
    return false;
  }
  //类型转换
  const maxP =parseInt(this.data.maxPersion);

  userApi.AddClass({needToken:true,
    header:{
   Authorization: app.globalData.token
 }},{"name":this.data.name as string,"teacher_id":this.data.teacher.id as number,"maxPersion":maxP as number ,"content":this.data.content as string,"price":price as string,"type":type as string}).then((res)=>{
    if (res.code!=200){
      wx.showToast({
        icon:"error",
        title:"发生错误请重试"
      })
    }else{
      wx.showToast({
        title:"创建成功"
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