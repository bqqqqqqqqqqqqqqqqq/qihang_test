import userApi from "../../api/system/userAPI";
// interface kcInfo {
//   cover_img:string
//   teacherName:string
//   className:string
//   complete:string
//   completeTotal:string
//   buy: number
// }
interface kcInfo{
  buy:number
  content:string
  id:number
  maxPersion:number
  nowPersion:number
  price:number
  teacherName:string
  teacher_id:number

}

var app = getApp()
var kcInfo:any[]
Page({
  thumb:"",
  /**
   * 页面的初始数据
   */
  data: {
    list:<any>[],
  },
  manage(e:any){
    const id = e.currentTarget.dataset.id
    const isbuy = e.currentTarget.dataset.isbuy
    const index = e.currentTarget.dataset.index
    if(isbuy==1){
      userApi.DownClass({
        needToken:true,
        header:{
       Authorization: app.globalData.token
     }
   },id).then((res:any)=>{
    if(res.code!=200){
        wx.showToast({
          "icon":"error",
          "title":"下架失败"
        })

    }else{
      var list:any = this.data.list
      list[index].buy=0
      this.setData({
        list:this.data.list
      })
      wx.showToast({
        "title":"下架成功"
      })
    }
  })
  }
    
    if(isbuy==0){
      userApi.PutClass({
        needToken:true,
        header:{
       Authorization: app.globalData.token
     }
   },id).then((res:any)=>{
    if(res.code!=200){
        wx.showToast({
          "icon":"error",
          "title":"上架失败"
        })
    
    }else{
      var list:any = this.data.list
      list[index].buy=1
      this.setData({
        list:this.data.list
      })
      wx.showToast({
        "title":"上架成功"
      })
    }
  })
    }
  },
  AllKC(){
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
     userApi.AllClass({
           needToken:true,
           header:{
          Authorization: app.globalData.token
        }
      }).then((res:any)=>{
        if(res.code==200&&res.data!=null){
    
          const list:kcInfo[]=res.data
          const listAll:kcInfo[] = this.data.list
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
onLoad(){
  this.AllKC()
}
})