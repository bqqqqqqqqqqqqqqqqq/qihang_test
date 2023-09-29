// pages/setClass/index.ts
import userApi from "../../api/system/userAPI";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
import dayjs from '../../utils/day.min.js';
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
import { TimeData } from "../../miniprogram_npm/@vant/weapp/count-down/utils";
interface MyObject {
  id: number;
  name: string;
  grade: string;
  check_time: string
};


var app = getApp()
Page({
  data: {
    class:{
      className:<any>"",
      classID:<any>"",
      classTeacherID:<any>""
    },
    err:'',
    fieldDisabled:false,
    btn:"确认",
    show: false,
    added:<any>[],
    unadd:<any>[//存储未添加
    ],
    

  },
  //实现“已添加”与“未添加”的元素交换
  removeItemById(id: number, source: MyObject[], target: MyObject[]) {
    const index = source.findIndex(item => item.id === id);
    if (index !== -1) {
      const item = source.splice(index, 1)[0];
      target.push(item);
    }
  },
  
  //添加按钮
  addstu(){
    userApi.GetAllStudent({
      needToken:true,
      header:{
    Authorization: app.globalData.token
  }
}).then((res:any)=>{
  if(res.code==200){
    const AllStu = this.data.unadd
    if (res.data!=null){
      const Stu =res.data
      AllStu.push(...Stu) 
      this.setData({
        unadd:AllStu
      })
    }
    this.showPopup();
  }else{

  }
})

  },
  //弹出层
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  //签到
  checkIn(e:any){
    let sid = e.currentTarget.dataset.id;
    const index = e.currentTarget.dataset.idx;
    let myadded = this.data.added;
    const cid = this.data.class.classID;
    userApi.LastCheck({
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
              myadded[index].done = true
              myadded[index].complete = myadded[index].complete + 1
              myadded[index].check_time = "刚刚"
              this.setData({
                added:myadded
              })
            }
          })
        }else if(res.data.check==false){
         Dialog.confirm({
          message: '5分钟内只能签到一次！',
        })
          .then(() => {
            // on confirm
            myadded[index].done = true
              this.setData({
                added:myadded
              })
          })
          .catch(() => {
            // on cancel
          });

        }
      }
    })
  },
 
  //删除
  deleteStu(e:any){
    const name = e.currentTarget.dataset.name;
    const sid = parseInt(e.currentTarget.dataset.id);
    Dialog.confirm({
      message: '是否删除'+name+"!!!",
    })
      .then(() => {
        // on confirm
        let myAdd:MyObject[]= this.data.added;
        let myUnAdd:MyObject[]= this.data.unadd;
        userApi.DeleteClassStudent({
          needToken:true,
          header:{
        Authorization: app.globalData.token
      }
    },{"classID":this.data.class.classID as number,"teacherID":this.data.class.classTeacherID as number,"studentID":sid}).then((res:any)=>{
      if (res.code==-1){
        wx.showToast({
          icon:"error",
          title:"失败,请重试"
        })
        return
      }else if(res.code==200) {
          wx.showToast({
            title:"成功"
          })
          this.removeItemById(sid,myAdd,myUnAdd);
          this.setData({
            added : myAdd,
            unadd : myUnAdd
          });
          Toast('删除成功')
      }
    })
    
        this.setData({
          added : myAdd,
          unadd : myUnAdd
        });//删除并更新added
        Toast('删除成功！')
      })
      .catch(() => {
        // on cancel
      })
   
    
  },
  //添加
  addStu(e:any){
    e = parseInt(e.currentTarget.dataset.id);
    let myAdd:MyObject[]= this.data.added;
    let myUnAdd:MyObject[]= this.data.unadd;

    userApi.AddClassStudent({
      needToken:true,
      header:{
    Authorization: app.globalData.token
  }
},{"classID":this.data.class.classID as number,"teacherID":this.data.class.classTeacherID as number,"studentID":e as string}).then((res:any)=>{
  if (res.code==-1){
    wx.showToast({
      icon:"error",
      title:"失败,请重试"
    })
    return
  }else if(res.code==200) {
      wx.showToast({
        title:"成功"
      })
      this.removeItemById(e,myUnAdd,myAdd);
      this.setData({
        added : myAdd,
        unadd : myUnAdd
      });
      Toast('添加成功')
  }
})

  },
 //格式化时间
 formatTime(arr:MyObject[]){
 
  for (var i=0;i<arr.length;i++){
      arr[i].check_time = dayjs(arr[i].check_time).format('YYYY-MM-DD HH:mm')
    }
    console.log(arr);
    
  },
  onLoad(options) {
    let className = options.className;
    let classID =options.classID;
    let classTeacherID = options.classTeacherID
    this.setData({
      class:{
        className:className,
        classID:classID,
        classTeacherID:classTeacherID
      }
    })
    userApi.AllClassStudent({
      needToken:true,
      header:{
     Authorization: app.globalData.token
   }
 },String(classID)).then((res:any)=>{
   if(res.code==200&&res.data!=null){
     let list =res.data
     this.formatTime(list)
     const listAll = this.data.added
     listAll.push(...list)
     this.setData({
       added:listAll
     })
 }else if (res.data==null){
   wx.showToast({
     title:"已无更多数据",
     icon:"none"
   })
 }
})
  },

 
})