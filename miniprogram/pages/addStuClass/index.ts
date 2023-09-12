import userApi from "../../api/system/userAPI";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
interface kcInfo {
  cover_img:string
  teacherName:string
  className:string
  complete:string
  completeTotal:string
}
interface subData{
  teacherID:number
  studentID:number
  classID:number
  completeTotal:number
}
var submitData:subData = {
  teacherID:0,
  studentID:0,
  classID:0,
  completeTotal:0
}
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idx: 0,    
    className:"",
    count:<any>"",
    show: false,
    columns:<any>[],
    prevList:<any>[],
    studentID:0
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
      className: value,
      idx: index
    })
    this.onClose()
  },
  //提交
  submit():any{
    const index = this.data.idx;
    let className = this.data.className;
    let count = this.data.count;
    //不为空
    if(className === ''){
      Dialog.alert({
        message: '请选择课程',
      })
      return false
    };
    if(count === ''){
      Dialog.alert({
        message: '请输入数量',
      })
    return false;
  }
  //submit数据
  submitData.classID = this.data.prevList[index].id;
  submitData.teacherID = parseInt(this.data.prevList[index].teacher_id);
  submitData.completeTotal = parseInt(count);
  console.log(submitData);
  
  userApi.AddBuyClassStu({needToken:true,
    header:{
   Authorization: app.globalData.token
 }},submitData).then((res:any)=>{
  if (res.code!=200){
    wx.showToast({
      icon:"error",
      title:"发生错误请重试"
    })
  }else{
    wx.showToast({
      title:"成功"
    })
    setTimeout(() => {
      wx.navigateBack()
    }, 1500);
  }
 })
},

onLoad(option){
  // 获取上一页数据
const pages = getCurrentPages();
const prevPage = pages[pages.length - 2];
const prevList:kcInfo[] = prevPage.data.list;
const cNames = prevList.map(item => item.className);

const sid =parseInt(option.studentID as string )
this.setData({
  columns: cNames,
  studentID: sid,
  prevList: prevList
})

submitData.studentID = sid;

}
})