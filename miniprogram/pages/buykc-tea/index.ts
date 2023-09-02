
import userApi from "../../api/system/userAPI";
interface kcInfo {
  id:string
  className:string
  teacherName:string
  total:string
  price:string
  maxPersion:number
  buy:number
  nowPersion:number
  teacher_id:number
  content:string
  type:string
}

var app = getApp()
var kcInfo:any[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:<any>[],
    classType:""
  },

  gotobuy(e:any){
    const id = e.currentTarget.dataset.id
    const teacherid = e.currentTarget.dataset.teacherid
    wx.navigateTo({
      url:"../order/index?id="+id+"&teacherID="+teacherid
    })
  },

  AllKC(id:any){
    var that = this
    // const id = that.options.id||""
    // if (id ==""){
    //   wx.showToast({
    //     title:"请重试"
    //   })
    //   setTimeout(() => {
    //     wx.navigateBack()
    //   }, 500);
    //   return
    // }
     userApi.SelectClassByTeacher({
           needToken:true,
           header:{
          Authorization: app.globalData.token
        }
      },id).then((res:any)=>{
        if(res.code==200&&res.data!=null){
          const mytype = this.data.classType;
          const list :kcInfo[]=res.data.filter((obj: { type: string; }) => obj.type === mytype)
          const listAll = this.data.list
          listAll.push(...list)
          that.setData({
            list:listAll
          })
      }else if (res.data==null){
        wx.showToast({
          title:"已无更多数据",
          icon:"none"
        })
      }else{
        wx.showToast({
          title:"已无更多数据",
          icon:"none"
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1000)
        return
      }
    })},
onLoad(option){
  const tid = option.tid
  const type = option.type
  this.setData({
    classType:type
  })
  
  this.AllKC(tid)
  
}

})