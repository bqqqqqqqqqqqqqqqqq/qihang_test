// pages/setClass/index.ts
import userApi from "../../api/system/userAPI";
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
interface MyObject {
  id: number;
  name: string;
  grade: string;
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
    ]
    

  },
  //实现“已添加”与“未添加”的元素交换
  removeItemById(id: number, source: MyObject[], target: MyObject[]) {
    const index = source.findIndex(item => item.id === id);
    if (index !== -1) {
      const item = source.splice(index, 1)[0];
      target.push(item);
    }
  },
  //输入框
  confirm(){
    let fboo = this.data.fieldDisabled;
    if(fboo==false){
      this.setData({
        fieldDisabled:true,
        btn:"编辑",
        err:''
      });
    }else{
      this.setData({
        fieldDisabled:false,
        btn:"确认"
      });
      
    }
  },
  fieldChange(event:any){
    this.setData({
      err:'请确认' 
    })
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
  //删除
  deleteStu(e:any){
    e = parseInt(e.currentTarget.dataset.id);
    let myAdd:MyObject[]= this.data.added;
    let myUnAdd:MyObject[]= this.data.unadd;
    userApi.DeleteClassStudent({
      needToken:true,
      header:{
    Authorization: app.globalData.token
  }
},{"classID":this.data.class.classID as number,"teacherID":this.data.class.classTeacherID as number,"studentID":e as string}).then((res:any)=>{
  if (res.code==-1){
    wx.showToast({
      "icon":"error",
      "msg":"失败,请重试"
    })
    return
  }else if(res.code==200) {
      wx.showToast({
        "msg":"成功"
      })
      this.removeItemById(e,myAdd,myUnAdd);
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
      "icon":"error",
      "msg":"失败,请重试"
    })
    return
  }else if(res.code==200) {
      wx.showToast({
        "msg":"成功"
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
     const list =res.data
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