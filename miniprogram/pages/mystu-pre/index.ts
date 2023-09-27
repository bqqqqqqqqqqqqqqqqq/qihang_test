import userApi from "../../api/system/userAPI";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
interface kcInfo {
  bid:number
  bname:string
}
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'w',
    unadd:'',
    notice:'',
    bList:<any>[],
  },
  //跳转
  go(url:string,params?:string){
    let gourl = '';
    if (params) {
      gourl = '/pages/'+url+'/index?p=' + params ;
    }else{
      gourl = '/pages/'+url+'/index';
    }
    wx.navigateTo({
      url:gourl
  });
},

  gomystu(e:any){
    const p =  e.currentTarget.dataset.tid;
    this.go('mystu',p)
  },
  handleArr(array:any,property:string){
    const map = new Map();
    const result = [];
    for (const item of array) {
      if (!map.has(item[property])) {
        map.set(item[property], true);
        result.push(item);
      }
    }
    return result;
  },
  AllKC(){
    var that = this
      userApi.AllClass({
            needToken:true,
            header:{
            Authorization: app.globalData.token
          }
        }).then((res:any)=>{
        if(res.code==200&&res.data!=null){
          const list :kcInfo[]=res.data
          let listAll = this.data.bList
          listAll.push(...list)
          listAll = this.handleArr(listAll,"teacher_id")
          that.setData({
            bList:listAll,
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.AllKC()
    //接受type=admin
    let t = options.type;
    this.setData({
      type: t
    })
  },
})