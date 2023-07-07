// pages/setClass/index.ts

import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
interface MyObject {
  sid: number;
  sname: string;
  grade: string;
};

Page({
  data: {
    value:'',
    err:'',
    fieldDisabled:false,
    btn:"确认",
    show: false,
    added:[
      {
        sid:7890,
        sname:"丽丽",
        grade: "一"
      },
      {
        sid:790,
        sname:"李丽",
        grade: "一"
      }
    ],
    unadd:[//存储未添加
      {
        sid: 77,
        sname: 'uu',
        grade:"二"
      },
      {
        sid: 55,
        sname: 'tt',
        grade:"二"
      },
      {
        sid: 1,
        sname: '温州',
        grade:"二"
      },
      {
        sid: 2,
        sname: '杭州',
        grade:"二"
      },
    ]
    

  },
  //实现“已添加”与“未添加”的元素交换
  removeItemById(sid: number, source: MyObject[], target: MyObject[]) {
    const index = source.findIndex(item => item.sid === sid);
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
    this.showPopup();
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
    e = parseInt(e.currentTarget.dataset.sid);
    let myAdd:MyObject[]= this.data.added;
    let myUnAdd:MyObject[]= this.data.unadd;
    this.removeItemById(e,myAdd,myUnAdd);
    this.setData({
      added : myAdd,
      unadd : myUnAdd
    });//删除并更新added
    Toast('删除成功！')
    
  },
  //添加
  addStu(e:any){
    e = parseInt(e.currentTarget.dataset.sid);
    let myAdd:MyObject[]= this.data.added;
    let myUnAdd:MyObject[]= this.data.unadd;
    this.removeItemById(e,myUnAdd,myAdd);
    this.setData({
      added : myAdd,
      unadd : myUnAdd
    });
    Toast('添加成功！')
  },
 
  onLoad(options) {
    let v = options.bname;
    if(v===undefined){
      v='';
      this.setData({
        err:'输入并确认' 
      })
    }
    this.setData({value:v})
  },

 
})