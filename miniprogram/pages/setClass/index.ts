// pages/setClass/index.ts

import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
interface MyObject {
  sid: number;
  sname: string;
};

Page({
  data: {
    value:'',
    err:'',
    fieldDisabled:false,
    btn:"确认",
    show: false,
    mainActiveIndex: 0,
    activeId: [],
    max: 100,
    items:[
      {
        // 导航名称
        text: '初一',
        // 禁用选项
        disabled: false,
        children: [
          {
            // 名称
            text: '温州',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true,
          },
          {
            text: '杭州',
            id: 2,
          },
        ],
      },
      {
        text: '初三',
        disabled: false,
        children: [
          {
            // 名称
            text: 'tt',
            // id，作为匹配选中状态的标识
            id: 55,
            // 禁用选项
            disabled: false,
          },
          {
            text: 'uu',
            id: 77,
          },
        ],
      }
    ],
    added:[
      {
        sid:7890,
        sname:"丽丽"
      },
      {
        sid:790,
        sname:"李丽"
      }
    ],
    unadd:[//存储未添加
      {
        sid: 77,
        sname: 'uu',
      },
      {
        sid: 55,
        sname: 'tt',
      },
      {
        sid: 1,
        sname: '温州',
      },
      {
        sid: 2,
        sname: '杭州',
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
        btn:"编辑"
      });
    }else{
      this.setData({
        fieldDisabled:false,
        btn:"确认"
      });
      
    }
  },
  fieldChange(event:any){
    console.log(event.detail);
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
  //selector
  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },
  onClickItem({ detail = {} }) {
    const { activeId }: { activeId: number[] } = this.data;
    const index = activeId.indexOf(detail.id);
    if (index > -1) {
      activeId.splice(index, 1);
    } else {
      activeId.push(detail.id);
    }
    this.setData({ activeId  });
    console.log(activeId)
  },
  finish(){
    this.onClose();
    let myArr:MyObject[]= this.data.added;
    let myIndex:number[] = this.data.activeId;
    let arrToFilter = this.data.unadd;
    let result = arrToFilter.filter(item =>myIndex.includes(item.sid));
    const newarray = myArr.concat(result);
    const newUnadd = arrToFilter.filter(item => !myIndex.includes(item.sid));
    console.log(newarray)
    console.log(newUnadd)
    this.setData({
      added : newarray,
      unadd : newUnadd
    });
    Toast('完成添加！')
  },
  resetSelector(){
    
    this.setData({
      activeId:[]
    });
  },
  deleteStu(e:any){
    e = parseInt(e.currentTarget.dataset.sid);
    console.log(e);
    let myAdd:MyObject[]= this.data.added;
    let myUnAdd:MyObject[]= this.data.unadd;
    
    // let indexToDelete = myArr.findIndex((element) => element.sid === e);
    // if (indexToDelete !== -1) {
    //   myArr.splice(indexToDelete, 1);
    // };
    this.removeItemById(e,myAdd,myUnAdd);
    // console.log(myAdd,11)
    // console.log(myUnAdd,22)

    this.setData({
      added : myAdd,
      unadd : myUnAdd
    });//删除并更新added
    Toast('删除成功！')
    
  },
 
  onLoad(options) {
    // console.log(options.bname);//输出传参
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