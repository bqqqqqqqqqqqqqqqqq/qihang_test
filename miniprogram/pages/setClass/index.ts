// pages/setClass/index.ts

import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
interface MyObject {
  sid: number;
  sname: string;
};
interface Detail {
  index?: number;
  id?: number;
};
Page({
  data: {
    fieldDisabled:false,
    btn:"确认",
    show: false,
    mainActiveIndex: 0,
    activeId: [],
    max: Infinity,
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
    ]
    

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
  onClickNav({ detail = {} }: { detail: Detail }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },
  onClickItem({ detail = {} }: { detail: Detail }) {
    const { activeId }: { activeId: number[] } = this.data;
    const index = activeId.indexOf(detail.id!);
    if (index > -1) {
      activeId.splice(index, 1);
    } else {
      activeId.push(detail.id!);
    }

    this.setData({ activeId });
    console.log(activeId)
  },
  finish(){
    this.onClose();
    let myArr:MyObject[]= this.data.added;

    Toast('完成添加！')
  },
  resetSelector(){

  },
  deleteStu(e:any){
    e = parseInt(e.currentTarget.dataset.sid);
    console.log(e);
    let myArr:MyObject[]= this.data.added;
    let indexToDelete = myArr.findIndex((element) => element.sid === e);
    if (indexToDelete !== -1) {
      myArr.splice(indexToDelete, 1);
    };
    this.setData({
      added : myArr
    });//删除并更新added
    Toast('删除成功！')
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.bname);//输出传参
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})