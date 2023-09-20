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
      gourl = '/pages/'+url+'/index?' + params ;
    }else{
      gourl = '/pages/'+url+'/index';
    }
    wx.navigateTo({
      url:gourl
  });
},
  gotoallstu(){
    this.go('allstu')
  },
  gotoSetClass(e:any){
    let className = e.currentTarget.dataset.bname;
    let classID = e.currentTarget.dataset.bid;
    let classTeacherID = e.currentTarget.dataset.btid
    wx.navigateTo({
      url:"../setClass/index?className="+className+"&classID="+classID+"&classTeacherID="+classTeacherID
  });
  },
  onClose(event:any) {

    let classID = event.currentTarget.dataset.bclassid
    let index = event.currentTarget.dataset.bindex

    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          this.deleteClass(classID,index)
          instance.close();
        });
        break;
    }
  },
  // 右上角
  manage() {
    this.selectComponent(".vsc").open({position: "right"});
  },
  //判断unadd
  ifUnadd(){
    let u = parseInt(this.data.unadd);
    if(u > 0){
      this.setData({
        notice: "你还有"+u+"位学生待分配到班级。"
      })
    }else{
      this.setData({
        notice: "暂无待分配的学生。"
      })
    }
   
    // this.setData({
    //   hidden: false
    // })
  },
  //点击按钮
  click(){
    this.go('setClass')
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
          const listAll = this.data.bList
          listAll.push(...list)
          that.setData({
            bList:listAll
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

    deleteClass(id:string,index:any){
      userApi.DeleteClass({ needToken:true,
        header:{
        Authorization: app.globalData.token
      }},id).then((res:any)=>{
        if (res.code==200){
          wx.showToast({
            "title":"删除成功"
          })
          var bList = this.data.bList
          bList.splice(index,1)
          this.setData({
            bList:bList
          })
        }else{
          wx.showToast({
            "title":"删除失败",
            "icon":"error",
          })
        }
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.AllKC()
    //通知
    this.ifUnadd()
    //接受type=admin
    let t = options.type;
    this.setData({
      type: t
    })
  },
})