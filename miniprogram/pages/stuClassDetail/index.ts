// pages/stuClassDetail/index.ts

import userApi from "../../api/system/userAPI";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";

interface kcInfo {
  cover_img:string
  teacherName:string
  className:string
  complete:string
  completeTotal:string
}
interface updateData{
  teacherID:number
  studentID:number
  classID:number
  number:number
}
 
var app = getApp()
var kcInfo:any[]
var myCount:number
var upData:updateData = {
  teacherID: 0,
  studentID: 0,
  classID: 0,
  number: 0,
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '1',
    sid:"",
    count: 1,
    show: false,
    list:<any>[
    ],
    value:""
  },
  //签到
  checkIn(e:any){
    const cid = e.currentTarget.dataset.id;
    const sid = this.data.sid;
    const index = e.currentTarget.dataset.idx;
    let myList = this.data.list;
    userApi.LastCheck({
      needToken:true,
      header:{
        Authorization: app.globalData.token
      }
    },sid,cid).then((res:any)=>{
      if (res.code==-1){
        wx.showToast({
          "icon":"error",
          "msg":"失败,请重试"
        })
        return
      }else if((res.code==200)){
        if(res.data.check==true){
          userApi.Checkin({
            needToken:true,
            header:{
              Authorization: app.globalData.token
            }
          },sid,cid).then((res:any)=>{
            if (res.code==-1){
              wx.showToast({
                icon:"error",
                title:"失败,请重试"
              })
              return
            }else if((res.code==200)){
              wx.showToast({
                title:"签到成功"
              })
              myList[index].done = true;
              myList[index].complete = myList[index].complete + 1;
              this.setData({
                list: myList
              })
            }
          })
        }else if(res.data.check==false){
         Dialog.confirm({
          message: '5分钟内只能签到一次！',
        })
          .then(() => {
            // on confirm
            myList[index].done = true;
            this.setData({
                list: myList
            })
          })
          .catch(() => {
            // on cancel
          });

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    const sid = option.id as string;
    this.setData({
      sid:sid
    })
    this.stuClass(sid)//获取页面数据
  },
  onShow() {
    this.stuClass(this.data.sid)//获取页面数据
  },
  stuClass(sid:string){
    var that = this
    userApi.SelcetStudentClass({
      needToken:true,
      header:{
    Authorization: app.globalData.token
  }},sid).then((res:any)=>{
    if(res.code==200){
      const list :kcInfo[]=res.data
        const listAll = this.data.list
        if (list!=null){
          listAll.push(...list)
        }
        that.setData({
          list:listAll
        })
    }
    
  })
  },
  //修改
  edit(e:any){
    const c =  e.currentTarget.dataset.id as number;
    const tid =parseInt(e.currentTarget.dataset.tid as string);
    upData.teacherID = tid;
    upData.classID = c;
    // this.setData({ count: c});//
    this.setData({ show: true });
    
  },
  numChange(event:any) {
    myCount = event.detail
    if(myCount){
      this.setData({
        count: myCount
      })
    }
  
    
  },
  //单选
  radioChange(event:any){
    this.setData({
      radio: event.detail,
    });
  },
  onClick(event:any) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },
  //确定按钮，提交数据
  confirm(){
    upData.studentID = parseInt(this.data.sid)
    let isadd = this.data.radio;
    if(isadd=='1'){
      upData.number = this.data.count
    }else if(isadd=='2'){
      upData.number = -this.data.count
    };
    //updata的api
    userApi.UpdateClassNumber({
      needToken:true,
      header:{
        Authorization: app.globalData.token
      }
    },upData).then((res:any)=>{
      if (res.code==-1){
        wx.showToast({
          icon:"error",
          title:"失败,请重试"
        })
        return
      }else if((res.code==200)){
        wx.showToast({
          title:"修改成功"
        })
      }
    
    })
    this.setData({count: 1})
  },
  onClose() {
    this.setData({ show: false });
  },
  goaddClass(){
    const sid = this.data.sid
    wx.navigateTo({
      url:'../addStuClass/index?studentID='+sid
  })
  }

})