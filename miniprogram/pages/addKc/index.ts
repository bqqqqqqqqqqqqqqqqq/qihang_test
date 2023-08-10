import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";

// pages/addKc/index.ts
Page({
  data: {
    name: '',
    teacher: '',
    price:'',
    show: false,
    columns:[]
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

  wx.showToast({
    title:"添加成功",
    icon:"success"
  })
  
}
})