// pages/kc/index.ts

import userApi from "../../api/system/userAPI";

interface kcInfo {
  cover_img:string
  teacherName:string
  className:string
  complete:string
  completeTotal:string
}
 
var app = getApp()
var kcInfo:any[]


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:<any>[
      { teacherName: '张三', className: '语文' ,completeTotal:16},
      { teacherName: '李四', className: '数学'  ,completeTotal:16},
      { teacherName: '王五', className: '英语'  ,completeTotal:16},
    ],
    activeNames: [0,1,2],
  },
  onChange(event:any) {
    this.setData({
      activeNames: event.detail,
    });
  },
  //跳转
  go(url:string,params?:string){
    let gourl = '';
    if (params) {
      gourl = '/pages/'+url+'/index?' + params;
    }else{
      gourl = '/pages/'+url+'/index';
    }
    wx.navigateTo({
      url:gourl
  });
},
gokcChild(e:any){
  let p = e.currentTarget.dataset.kid;
  this.go('kcChild','kid='+p);
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    
    this.detailKC()
  },
  detailKC(){
    var that = this
    const id =app.globalData.UserInfo.id
    const isAdmin = app.globalData.UserInfo.isAdmin
    let identify =""
    if (isAdmin ==1){
       identify="stu"
    }else if (isAdmin ==2){
       identify="par"
    }
    if (id ==""){
      wx.showToast({
        title:"请重试"
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 500);
      return
    }
    if(identify=="stu"){
        userApi.StuDetailClass({
          needToken:true,
          header:{
        Authorization: app.globalData.token
      }
    },id).then((res:any)=>{
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
    }else if (identify=="par"){
      userApi.ParStuDetailClass({
        needToken:true,
        header:{
      Authorization: app.globalData.token
    }
  },id).then((res:any)=>{
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
    }

  },
   //下拉刷新
   onPullDownRefresh: function () {
    
  },






})